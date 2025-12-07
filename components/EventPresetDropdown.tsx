'use client';

import { useState } from 'react';
import { useSimStore } from '@/store/simStore';
import type { SimEvent } from '@/lib/simEngine';

const PRESETS: Array<{ name: string; events: SimEvent[] }> = [
  {
    name: '— Select a preset —',
    events: [],
  },
  {
    name: 'Early Safety Car (laps 10–13, allow unlapping, cheap pits)',
    events: [
      {
        type: 'SAFETY_CAR',
        startLap: 10,
        endLap: 13,
        allowLappedCarsPass: true,
        pitAdvantage: 'cheap',
        invalidateFL: false,
      },
    ],
  },
  {
    name: 'Late Safety Car (laps 50–54, no unlapping)',
    events: [
      {
        type: 'SAFETY_CAR',
        startLap: 50,
        endLap: 54,
        allowLappedCarsPass: false,
        pitAdvantage: 'none',
        invalidateFL: false,
      },
    ],
  },
  {
    name: 'Red Flag Mid-Race (lap 30, restart current order, tyre reset)',
    events: [
      {
        type: 'RED_FLAG',
        lap: 30,
        restartOrder: 'current',
        tyreReset: true,
      },
    ],
  },
  {
    name: 'VSC for Debris (3 laps)',
    events: [
      {
        type: 'VIRTUAL_SAFETY_CAR',
        startLap: 20,
        endLap: 23,
        deltaFactor: 0.5,
      },
    ],
  },
  {
    name: 'Multiple Safety Cars (Early + Late)',
    events: [
      {
        type: 'SAFETY_CAR',
        startLap: 15,
        endLap: 18,
        allowLappedCarsPass: true,
        pitAdvantage: 'cheap',
        invalidateFL: false,
      },
      {
        type: 'SAFETY_CAR',
        startLap: 45,
        endLap: 48,
        allowLappedCarsPass: false,
        pitAdvantage: 'none',
        invalidateFL: true,
      },
    ],
  },
  {
    name: 'Red Flag + Safety Car Combo',
    events: [
      {
        type: 'RED_FLAG',
        lap: 25,
        restartOrder: 'current',
        tyreReset: true,
      },
      {
        type: 'SAFETY_CAR',
        startLap: 40,
        endLap: 43,
        allowLappedCarsPass: true,
        pitAdvantage: 'cheap',
        invalidateFL: false,
      },
    ],
  },
  {
    name: 'Extended VSC Period',
    events: [
      {
        type: 'VIRTUAL_SAFETY_CAR',
        startLap: 10,
        endLap: 18,
        deltaFactor: 0.5,
      },
    ],
  },
  {
    name: 'Safety Car with FL Invalidation',
    events: [
      {
        type: 'SAFETY_CAR',
        startLap: 35,
        endLap: 40,
        allowLappedCarsPass: false,
        pitAdvantage: 'none',
        invalidateFL: true,
      },
    ],
  },
  {
    name: 'Early Red Flag (lap 15)',
    events: [
      {
        type: 'RED_FLAG',
        lap: 15,
        restartOrder: 'previous',
        tyreReset: false,
      },
    ],
  },
  {
    name: 'Late Race Drama (VSC + SC)',
    events: [
      {
        type: 'VIRTUAL_SAFETY_CAR',
        startLap: 45,
        endLap: 48,
        deltaFactor: 0.5,
      },
      {
        type: 'SAFETY_CAR',
        startLap: 50,
        endLap: 53,
        allowLappedCarsPass: true,
        pitAdvantage: 'cheap',
        invalidateFL: false,
      },
    ],
  },
];

export default function EventPresetDropdown() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { setEvents } = useSimStore();

  const handlePresetChange = (index: number) => {
    setSelectedIndex(index);
    if (index > 0 && PRESETS[index]) {
      setEvents(PRESETS[index].events);
    } else {
      setEvents([]);
    }
  };

  return (
    <div className="event-preset-dropdown">
      <style jsx>{`
        .event-preset-dropdown {
          margin-top: 14px;
        }
        .event-preset-dropdown label {
          display: block;
          font-size: 13px;
          color: var(--muted, #97a6c1);
          margin-bottom: 6px;
        }
        .event-preset-dropdown select {
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
        .event-preset-dropdown select:focus {
          outline: none;
          border-color: var(--accent, #ff6a00);
        }
        .event-preset-dropdown select option {
          background: #0f1424;
          color: var(--text, #e6eefc);
        }
      `}</style>
      <label htmlFor="eventPresetSelect">Race Event Presets</label>
      <select
        id="eventPresetSelect"
        value={selectedIndex}
        onChange={(e) => handlePresetChange(parseInt(e.target.value))}
      >
        {PRESETS.map((preset, idx) => (
          <option key={idx} value={idx}>
            {preset.name}
          </option>
        ))}
      </select>
    </div>
  );
}

