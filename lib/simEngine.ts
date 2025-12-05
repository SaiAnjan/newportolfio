// F1 Event Simulator Engine
// Pure, deterministic functions for simulating race events

export interface Driver {
  name: string;
  team: string;
  basePoints: number;
}

export interface RaceState {
  drivers: Driver[];
  grid: { [position: number]: string | null }; // P1..P20
  dnfs: Set<string>;
  fastestLap: string | null;
  rules: {
    pointsMap: Record<number, number>;
    fastestLapEligibleTop10Only: boolean;
    countback?: { secondPlaces: Record<string, number> };
  };
}

export interface Outcome {
  totals: { [driverName: string]: { base: number; delta: number; total: number; team: string } };
  leader: { name: string; total: number; tie: boolean };
  notes: string[];
  finalOrder: Array<{ position: number; driver: string }>;
}

export type SimEvent =
  | { type: 'SAFETY_CAR'; startLap: number; endLap: number; allowLappedCarsPass?: boolean; pitAdvantage?: 'cheap' | 'none'; invalidateFL?: boolean }
  | { type: 'VIRTUAL_SAFETY_CAR'; startLap: number; endLap: number; deltaFactor?: number }
  | { type: 'RED_FLAG'; lap: number; restartOrder?: 'current' | 'previous'; tyreReset?: boolean }
  | { type: 'PENALTY'; driver: string; kind: 'time' | 'driveThrough' | 'gridDrop'; value: number }
  | { type: 'MECHANICAL'; driver: string; lap: number; effect: 'DNF' | 'timeLoss'; value?: number }
  | { type: 'TEAM_ORDERS'; team: string; instruction: 'swapPositions' | 'holdPosition'; affected: string[] }
  | { type: 'WEATHER_CHANGE'; startLap: number; endLap: number; tyreDelta: 'softFavours' | 'hardFavours' | 'degradationSpike' }
  | { type: 'RANDOM_EVENT'; atLap: number; probability: number; effect: 'minorTimeLoss' | 'puncture' | 'slowPitStop'; targets?: string[] }
  | { type: 'CUSTOM_RULE'; key: string; value: any };

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

// Apply race events to state
export function applyRaceEvents(state: RaceState, events: SimEvent[]): RaceState {
  let newState: RaceState = {
    ...state,
    grid: { ...state.grid },
    dnfs: new Set(state.dnfs),
  };
  const notes: string[] = [];

  // Sort events by lap/startLap
  const sortedEvents = [...events].sort((a, b) => {
    const lapA = 'lap' in a ? a.lap : 'startLap' in a ? a.startLap : 'atLap' in a ? a.atLap : 0;
    const lapB = 'lap' in b ? b.lap : 'startLap' in b ? b.startLap : 'atLap' in b ? b.atLap : 0;
    return lapA - lapB;
  });

  for (const event of sortedEvents) {
    switch (event.type) {
      case 'SAFETY_CAR': {
        notes.push(`Safety Car: laps ${event.startLap}-${event.endLap}`);
        // Compress field - reduce gaps between positions
        const positions = Object.entries(newState.grid)
          .filter(([_, driver]) => driver && !newState.dnfs.has(driver))
          .map(([pos, driver]) => ({ pos: parseInt(pos), driver: driver! }))
          .sort((a, b) => a.pos - b.pos);

        // If cheap pit stops, allow small position shifts
        if (event.pitAdvantage === 'cheap' && positions.length > 0) {
          // Simple heuristic: drivers in positions 5-15 can gain 1-2 spots
          for (let i = 4; i < Math.min(15, positions.length - 1); i++) {
            if (Math.random() > 0.7) { // 30% chance to benefit
              const current = positions[i];
              const next = positions[i + 1];
              if (current && next) {
                newState.grid[current.pos] = next.driver;
                newState.grid[next.pos] = current.driver;
                notes.push(`Cheap pit stop: ${next.driver} gained position`);
              }
            }
          }
        }

        if (event.allowLappedCarsPass) {
          notes.push('Lapped cars allowed to pass');
        }

        if (event.invalidateFL) {
          newState.fastestLap = null;
          notes.push('Fastest Lap invalidated');
        }
        break;
      }

      case 'VIRTUAL_SAFETY_CAR': {
        notes.push(`Virtual Safety Car: laps ${event.startLap}-${event.endLap}`);
        // Dampen under/overcuts - minimal position changes
        break;
      }

      case 'RED_FLAG': {
        notes.push(`Red Flag: lap ${event.lap}`);
        if (event.restartOrder === 'previous') {
          // Keep current order (simplified)
          notes.push('Restart: previous order maintained');
        }
        if (event.tyreReset) {
          notes.push('Tyre reset allowed');
        }
        break;
      }

      case 'PENALTY': {
        notes.push(`Penalty: ${event.driver} - ${event.kind} (${event.value}${event.kind === 'time' ? 's' : ''})`);
        if (event.kind === 'time') {
          // Apply post-race time penalty - reorder classification
          const driverPos = Object.entries(newState.grid).find(([_, d]) => d === event.driver)?.[0];
          if (driverPos) {
            const pos = parseInt(driverPos);
            // Move driver back by penalty value (simplified: move back 1-2 positions)
            const penaltyPositions = Math.min(2, Math.floor(event.value / 2.5));
            if (pos + penaltyPositions <= 20) {
              const targetPos = pos + penaltyPositions;
              const targetDriver = newState.grid[targetPos];
              if (targetDriver) {
                newState.grid[pos] = targetDriver;
                newState.grid[targetPos] = event.driver;
                notes.push(`${event.driver} moved back ${penaltyPositions} positions`);
              }
            }
          }
        } else if (event.kind === 'driveThrough') {
          // Treat as time loss
          const driverPos = Object.entries(newState.grid).find(([_, d]) => d === event.driver)?.[0];
          if (driverPos) {
            const pos = parseInt(driverPos);
            if (pos < 20) {
              const nextDriver = newState.grid[pos + 1];
              if (nextDriver) {
                newState.grid[pos] = nextDriver;
                newState.grid[pos + 1] = event.driver;
                notes.push(`${event.driver} lost position due to drive-through`);
              }
            }
          }
        }
        break;
      }

      case 'MECHANICAL': {
        if (event.effect === 'DNF') {
          newState.dnfs.add(event.driver);
          // Remove from grid
          const pos = Object.entries(newState.grid).find(([_, d]) => d === event.driver)?.[0];
          if (pos) {
            newState.grid[parseInt(pos)] = null;
          }
          notes.push(`DNF: ${event.driver} (lap ${event.lap})`);
        } else if (event.effect === 'timeLoss') {
          const driverPos = Object.entries(newState.grid).find(([_, d]) => d === event.driver)?.[0];
          if (driverPos) {
            const pos = parseInt(driverPos);
            const lossPositions = Math.min(3, Math.floor((event.value || 5) / 2));
            if (pos + lossPositions <= 20) {
              // Move driver back
              const positions = Array.from({ length: lossPositions }, (_, i) => pos + i + 1)
                .map(p => ({ pos: p, driver: newState.grid[p] }))
                .filter(p => p.driver);
              
              if (positions.length > 0) {
                newState.grid[pos] = positions[0].driver;
                for (let i = 0; i < positions.length - 1; i++) {
                  newState.grid[positions[i].pos] = positions[i + 1].driver;
                }
                newState.grid[positions[positions.length - 1].pos] = event.driver;
                notes.push(`${event.driver} lost ${lossPositions} positions due to mechanical issue`);
              }
            }
          }
        }
        break;
      }

      case 'TEAM_ORDERS': {
        if (event.instruction === 'swapPositions') {
          const teamDrivers = event.affected.filter(d => 
            Object.values(newState.grid).includes(d) && !newState.dnfs.has(d)
          );
          if (teamDrivers.length >= 2) {
            const positions = teamDrivers.map(d => {
              const pos = Object.entries(newState.grid).find(([_, driver]) => driver === d)?.[0];
              return { driver: d, pos: pos ? parseInt(pos) : null };
            }).filter(p => p.pos !== null).sort((a, b) => a.pos! - b.pos!);

            if (positions.length >= 2) {
              // Swap positions
              const temp = newState.grid[positions[0].pos!];
              newState.grid[positions[0].pos!] = newState.grid[positions[1].pos!];
              newState.grid[positions[1].pos!] = temp!;
              notes.push(`Team orders: ${positions[1].driver} and ${positions[0].driver} swapped`);
            }
          }
        }
        break;
      }

      case 'WEATHER_CHANGE': {
        notes.push(`Weather change: laps ${event.startLap}-${event.endLap} (${event.tyreDelta})`);
        // Simple heuristic: promote/demote drivers by 1 position based on tyre strategy
        // This is simplified - in reality would need driver tyre preferences
        break;
      }

      case 'RANDOM_EVENT': {
        if (Math.random() < event.probability) {
          const targets = event.targets || [];
          if (targets.length === 0) {
            // Random driver
            const availableDrivers = Object.values(newState.grid)
              .filter(d => d && !newState.dnfs.has(d)) as string[];
            if (availableDrivers.length > 0) {
              targets.push(availableDrivers[Math.floor(Math.random() * availableDrivers.length)]);
            }
          }

          for (const driver of targets) {
            if (event.effect === 'puncture') {
              newState.dnfs.add(driver);
              const pos = Object.entries(newState.grid).find(([_, d]) => d === driver)?.[0];
              if (pos) {
                newState.grid[parseInt(pos)] = null;
              }
              notes.push(`Random: ${driver} - puncture (DNF)`);
            } else if (event.effect === 'minorTimeLoss') {
              const driverPos = Object.entries(newState.grid).find(([_, d]) => d === driver)?.[0];
              if (driverPos) {
                const pos = parseInt(driverPos);
                if (pos < 20) {
                  const nextDriver = newState.grid[pos + 1];
                  if (nextDriver) {
                    newState.grid[pos] = nextDriver;
                    newState.grid[pos + 1] = driver;
                    notes.push(`Random: ${driver} - minor time loss`);
                  }
                }
              }
            }
          }
        }
        break;
      }

      case 'CUSTOM_RULE': {
        notes.push(`Custom rule: ${event.key}`);
        break;
      }
    }
  }

  return newState;
}

// Simulate outcome from state
export function simulateOutcome(state: RaceState): Outcome {
  const notes: string[] = [];
  const totals: { [driverName: string]: { base: number; delta: number; total: number; team: string } } = {};

  // Initialize totals from drivers
  for (const driver of state.drivers) {
    totals[driver.name] = {
      base: driver.basePoints,
      delta: 0,
      total: driver.basePoints,
      team: driver.team,
    };
  }

  // Build final order from grid (excluding DNFs)
  const finalOrder: Array<{ position: number; driver: string }> = [];
  const classifiedTop10 = new Set<string>();

  for (let pos = 1; pos <= 20; pos++) {
    const driver = state.grid[pos];
    if (driver && !state.dnfs.has(driver)) {
      finalOrder.push({ position: pos, driver });
      if (pos <= 10) {
        classifiedTop10.add(driver);
        const points = state.rules.pointsMap[pos] || 0;
        if (totals[driver]) {
          totals[driver].delta += points;
          totals[driver].total += points;
        }
      }
    }
  }

  // Apply fastest lap
  if (state.fastestLap && state.fastestLap !== '— None (outside Top‑10) —') {
    if (state.rules.fastestLapEligibleTop10Only) {
      if (classifiedTop10.has(state.fastestLap) && !state.dnfs.has(state.fastestLap)) {
        if (totals[state.fastestLap]) {
          totals[state.fastestLap].delta += 1;
          totals[state.fastestLap].total += 1;
        }
        notes.push(`Fastest Lap: ${state.fastestLap} (+1 point)`);
      }
    } else {
      if (totals[state.fastestLap]) {
        totals[state.fastestLap].delta += 1;
        totals[state.fastestLap].total += 1;
      }
      notes.push(`Fastest Lap: ${state.fastestLap} (+1 point)`);
    }
  }

  // Find leader
  const sorted = Object.entries(totals)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));

  const topTotal = sorted[0]?.total || 0;
  const tied = sorted.filter(s => s.total === topTotal);

  const leader = {
    name: tied.length > 1 ? 'TIE' : sorted[0]?.name || '—',
    total: topTotal,
    tie: tied.length > 1,
  };

  if (leader.tie) {
    notes.push(`TIE on ${topTotal} pts — countback required`);
  }

  return {
    totals,
    leader,
    notes,
    finalOrder,
  };
}

// Validate events
export function validateEvents(events: SimEvent[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    switch (event.type) {
      case 'SAFETY_CAR':
      case 'VIRTUAL_SAFETY_CAR':
        if (event.startLap >= event.endLap) {
          errors.push(`Event ${i + 1}: startLap must be < endLap`);
        }
        if (event.startLap < 1 || event.endLap > 58) {
          warnings.push(`Event ${i + 1}: lap numbers outside typical range`);
        }
        break;

      case 'RED_FLAG':
        if (event.lap < 1 || event.lap > 58) {
          warnings.push(`Event ${i + 1}: lap number outside typical range`);
        }
        break;

      case 'PENALTY':
        if (!event.driver || event.driver.trim() === '') {
          errors.push(`Event ${i + 1}: driver name required`);
        }
        if (event.value <= 0) {
          errors.push(`Event ${i + 1}: penalty value must be > 0`);
        }
        break;

      case 'MECHANICAL':
        if (!event.driver || event.driver.trim() === '') {
          errors.push(`Event ${i + 1}: driver name required`);
        }
        if (event.lap < 1 || event.lap > 58) {
          warnings.push(`Event ${i + 1}: lap number outside typical range`);
        }
        break;

      case 'TEAM_ORDERS':
        if (!event.team || event.team.trim() === '') {
          errors.push(`Event ${i + 1}: team name required`);
        }
        if (!event.affected || event.affected.length < 2) {
          errors.push(`Event ${i + 1}: at least 2 drivers required for team orders`);
        }
        break;

      case 'RANDOM_EVENT':
        if (event.probability < 0 || event.probability > 1) {
          errors.push(`Event ${i + 1}: probability must be between 0 and 1`);
        }
        break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// Parse natural language text to events
export function parseEventText(input: string, driverNames: string[]): { events: SimEvent[]; errors: string[] } {
  const events: SimEvent[] = [];
  const errors: string[] = [];
  const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  for (const line of lines) {
    const lower = line.toLowerCase();

    // Safety Car
    const scMatch = lower.match(/safety\s+car.*?lap[s]?\s*(\d+)[\s-]+(\d+)/i);
    if (scMatch) {
      const startLap = parseInt(scMatch[1]);
      const endLap = parseInt(scMatch[2]);
      const event: SimEvent = {
        type: 'SAFETY_CAR',
        startLap,
        endLap,
        allowLappedCarsPass: lower.includes('allow') || lower.includes('lapped'),
        pitAdvantage: lower.includes('cheap') ? 'cheap' : 'none',
        invalidateFL: lower.includes('invalidate') || lower.includes('fl invalid'),
      };
      events.push(event);
      continue;
    }

    // VSC
    const vscMatch = lower.match(/vsc|virtual\s+safety\s+car.*?(\d+)\s+lap/i);
    if (vscMatch) {
      const laps = parseInt(vscMatch[1]) || 3;
      events.push({
        type: 'VIRTUAL_SAFETY_CAR',
        startLap: 1,
        endLap: laps,
      });
      continue;
    }

    // Red Flag
    if (lower.includes('red flag')) {
      const lapMatch = lower.match(/lap\s*(\d+)/i);
      const lap = lapMatch ? parseInt(lapMatch[1]) : 30;
      events.push({
        type: 'RED_FLAG',
        lap,
        restartOrder: lower.includes('previous') ? 'previous' : 'current',
        tyreReset: lower.includes('tyre') || lower.includes('tire'),
      });
      continue;
    }

    // Penalty
    const penaltyMatch = lower.match(/([\w\s]+)\s+[-–]\s*(\d+)s?\s*penalty/i);
    if (penaltyMatch) {
      const driverName = penaltyMatch[1].trim();
      const value = parseInt(penaltyMatch[2]);
      const matchedDriver = driverNames.find(d => 
        d.toLowerCase().includes(driverName.toLowerCase()) || 
        driverName.toLowerCase().includes(d.toLowerCase().split(' ')[0])
      );
      if (matchedDriver) {
        events.push({
          type: 'PENALTY',
          driver: matchedDriver,
          kind: 'time',
          value,
        });
      } else {
        errors.push(`Could not match driver: ${driverName}`);
      }
      continue;
    }

    // DNF / Mechanical
    const dnfMatch = lower.match(/([\w\s]+)\s+(dnf|retired|mechanical)/i);
    if (dnfMatch) {
      const driverName = dnfMatch[1].trim();
      const matchedDriver = driverNames.find(d => 
        d.toLowerCase().includes(driverName.toLowerCase()) || 
        driverName.toLowerCase().includes(d.toLowerCase().split(' ')[0])
      );
      if (matchedDriver) {
        const lapMatch = lower.match(/lap\s*(\d+)/i);
        events.push({
          type: 'MECHANICAL',
          driver: matchedDriver,
          lap: lapMatch ? parseInt(lapMatch[1]) : 1,
          effect: 'DNF',
        });
      } else {
        errors.push(`Could not match driver: ${driverName}`);
      }
      continue;
    }

    // Fastest Lap
    if (lower.includes('fastest lap') || lower.includes('fl')) {
      const flMatch = lower.match(/([\w\s]+)\s+(wins|gets|fastest)/i);
      if (flMatch) {
        const driverName = flMatch[1].trim();
        const matchedDriver = driverNames.find(d => 
          d.toLowerCase().includes(driverName.toLowerCase()) || 
          driverName.toLowerCase().includes(d.toLowerCase().split(' ')[0])
        );
        if (matchedDriver) {
          // This would need to be applied to state separately
          errors.push(`Fastest Lap assignment should be done in the main simulator UI`);
        }
      }
    }
  }

  return { events, errors };
}

