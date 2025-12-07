'use client';

import { useEffect, useRef } from 'react';

interface PositionPreset {
  name: string;
  positions: Array<{ position: number; driver: string }>;
  fastestLap?: string;
}

const POSITION_PRESETS: PositionPreset[] = [
  {
    name: '— Select a position preset —',
    positions: [],
  },
  {
    name: 'Max Wins (VER P1, PIA P2, NOR P4)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Oscar Piastri' },
      { position: 4, driver: 'Lando Norris' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Lando Wins (NOR P1, PIA P2, VER P3)',
    positions: [
      { position: 1, driver: 'Lando Norris' },
      { position: 2, driver: 'Oscar Piastri' },
      { position: 3, driver: 'Max Verstappen' },
    ],
    fastestLap: 'Lando Norris',
  },
  {
    name: 'Oscar Wins (PIA P1, VER P2, NOR P3)',
    positions: [
      { position: 1, driver: 'Oscar Piastri' },
      { position: 2, driver: 'Max Verstappen' },
      { position: 3, driver: 'Lando Norris' },
    ],
    fastestLap: 'Oscar Piastri',
  },
  {
    name: 'McLaren 1-2 (NOR P1, PIA P2)',
    positions: [
      { position: 1, driver: 'Lando Norris' },
      { position: 2, driver: 'Oscar Piastri' },
      { position: 3, driver: 'Max Verstappen' },
    ],
    fastestLap: 'Lando Norris',
  },
  {
    name: 'Max Dominates (VER P1, PIA P3, NOR P5)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 3, driver: 'Oscar Piastri' },
      { position: 5, driver: 'Lando Norris' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Tight Top 3 (VER P1, NOR P2, PIA P3)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Lando Norris' },
      { position: 3, driver: 'Oscar Piastri' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Russell Podium (RUS P3, VER P1, NOR P2)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Lando Norris' },
      { position: 3, driver: 'George Russell' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Leclerc Podium (LEC P3, VER P1, PIA P2)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Oscar Piastri' },
      { position: 3, driver: 'Charles Leclerc' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Hamilton Surprise (HAM P2, VER P1, NOR P4)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Lewis Hamilton' },
      { position: 4, driver: 'Lando Norris' },
    ],
    fastestLap: 'Max Verstappen',
  },
  {
    name: 'Clear Top 3 (VER P1, PIA P2, NOR P3, RUS P4)',
    positions: [
      { position: 1, driver: 'Max Verstappen' },
      { position: 2, driver: 'Oscar Piastri' },
      { position: 3, driver: 'Lando Norris' },
      { position: 4, driver: 'George Russell' },
    ],
    fastestLap: 'Max Verstappen',
  },
];

export default function PositionPresetDropdown() {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handlePresetChange = () => {
    const select = selectRef.current;
    if (!select || select.value === '0') return;

    const preset = POSITION_PRESETS[parseInt(select.value)];
    if (!preset || preset.positions.length === 0) return;

    // Access global functions exposed by the simulator
    const setSelectedDriver = (window as any).f1SimulatorSetSelectedDriver;
    const updateDropdownOptions = (window as any).f1SimulatorUpdateDropdownOptions;
    const updateAll = (window as any).f1SimulatorUpdateAll;
    const fastestLapSel = (window as any).f1SimulatorFastestLapSel;
    const fastestLapSelDesktop = (window as any).f1SimulatorFastestLapSelDesktop;
    const dnfChecks = (window as any).f1SimulatorDnfChecks;
    const dnfChecksDesktop = (window as any).f1SimulatorDnfChecksDesktop;
    const positionSelects = (window as any).f1SimulatorPositionSelects;

    if (!setSelectedDriver) {
      console.warn('F1 Simulator functions not available yet');
      return;
    }

    // Clear all positions
    if (positionSelects) {
      positionSelects.forEach((selector: any, pos: number) => {
        setSelectedDriver(pos, null);
      });
    }

    // Clear DNFs
    if (dnfChecks) {
      dnfChecks.forEach((cb: HTMLInputElement) => {
        if (cb) cb.checked = false;
      });
    }
    if (dnfChecksDesktop) {
      dnfChecksDesktop.forEach((cb: HTMLInputElement) => {
        if (cb) cb.checked = false;
      });
    }

    // Set positions from preset
    preset.positions.forEach(({ position, driver }) => {
      setSelectedDriver(position, driver);
    });

    // Set fastest lap if specified
    if (preset.fastestLap) {
      if (fastestLapSel) fastestLapSel.value = preset.fastestLap;
      if (fastestLapSelDesktop) fastestLapSelDesktop.value = preset.fastestLap;
    }

    // Update dropdown options and recalculate
    if (updateDropdownOptions) updateDropdownOptions();
    if (updateAll) updateAll();

    // Reset dropdown to first option
    setTimeout(() => {
      select.value = '0';
    }, 100);
  };

  return (
    <div className="position-preset-dropdown">
      <style jsx>{`
        .position-preset-dropdown {
          margin-top: 10px;
        }
        .position-preset-dropdown label {
          display: block;
          font-size: 13px;
          color: var(--muted, #97a6c1);
          margin-bottom: 6px;
        }
        .position-preset-dropdown select {
          width: 100%;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--border, #1f2742);
          background: #0f1424;
          color: var(--text, #e6eefc);
          font-size: 13px;
          cursor: pointer;
          accent-color: var(--accent, #ff6a00);
        }
        .position-preset-dropdown select:focus {
          outline: none;
          border-color: var(--accent, #ff6a00);
        }
        .position-preset-dropdown select option {
          background: #0f1424;
          color: var(--text, #e6eefc);
        }
      `}</style>
      <label htmlFor="positionPresetSelect">Quick Position Presets</label>
      <select
        ref={selectRef}
        id="positionPresetSelect"
        defaultValue="0"
        onChange={handlePresetChange}
      >
        {POSITION_PRESETS.map((preset, idx) => (
          <option key={idx} value={idx}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  );
}

