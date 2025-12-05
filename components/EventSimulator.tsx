'use client';

import { useState, useEffect } from 'react';
import { useSimStore } from '@/store/simStore';
import type { SimEvent } from '@/lib/simEngine';
import { validateEvents, parseEventText } from '@/lib/simEngine';

interface EventSimulatorProps {
  driverNames: string[];
}

type TabType = 'text' | 'json' | 'presets';

const PRESETS: Array<{ name: string; events: SimEvent[] }> = [
  {
    name: 'Early SC (laps 10–13, allow unlapping, cheap pits)',
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
    name: 'Late SC (laps 50–54, no unlapping)',
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
    name: 'Red flag mid-race (lap 30, restart current order, tyre reset)',
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
    name: 'VSC for debris (3 laps)',
    events: [
      {
        type: 'VIRTUAL_SAFETY_CAR',
        startLap: 20,
        endLap: 23,
        deltaFactor: 0.5,
      },
    ],
  },
];

export default function EventSimulator({ driverNames }: EventSimulatorProps) {
  const [activeTab, setActiveTab] = useState<TabType>('text');
  const [jsonInput, setJsonInput] = useState('');
  const { textInput, events, setTextInput, setEvents, parseAndSetEventsFromText, outcome } = useSimStore();
  const [validation, setValidation] = useState<{ valid: boolean; errors: string[]; warnings: string[] } | null>(null);

  useEffect(() => {
    if (events.length > 0) {
      const result = validateEvents(events);
      setValidation(result);
    } else {
      setValidation(null);
    }
  }, [events]);

  const handleTextApply = () => {
    parseAndSetEventsFromText(driverNames);
  };

  const handleJsonApply = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const eventArray = Array.isArray(parsed) ? parsed : [parsed];
      const result = validateEvents(eventArray as SimEvent[]);
      if (result.valid) {
        setEvents(eventArray as SimEvent[]);
      } else {
        setValidation(result);
      }
    } catch (error) {
      setValidation({
        valid: false,
        errors: [`Invalid JSON: ${error instanceof Error ? error.message : 'Unknown error'}`],
        warnings: [],
      });
    }
  };

  const handlePresetClick = (presetEvents: SimEvent[]) => {
    setEvents(presetEvents);
    // Also update text input with a description
    setTextInput(presetEvents.map(e => JSON.stringify(e, null, 2)).join('\n'));
  };

  return (
    <div className="event-simulator">
      <style jsx>{`
        .event-simulator {
          background: var(--panel, #0f1424);
          border: 1px solid var(--border, #1a1f35);
          border-radius: 12px;
          padding: 16px;
          margin-top: 18px;
        }
        .event-simulator h3 {
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
          font-size: 16px;
          margin: 0 0 12px;
        }
        .event-simulator .tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          border-bottom: 1px solid var(--border, #1a1f35);
        }
        .event-simulator .tab {
          padding: 8px 12px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: var(--muted, #888);
          cursor: pointer;
          font-size: 13px;
          font-family: 'Stack Sans Text', sans-serif;
          transition: all 0.2s;
        }
        .event-simulator .tab:hover {
          color: #fff;
        }
        .event-simulator .tab.active {
          color: var(--accent, #2563eb);
          border-bottom-color: var(--accent, #2563eb);
        }
        .event-simulator .tab-content {
          display: none;
        }
        .event-simulator .tab-content.active {
          display: block;
        }
        .event-simulator textarea {
          width: 100%;
          min-height: 120px;
          padding: 10px;
          background: #0a0e1a;
          border: 1px solid var(--border, #1a1f35);
          border-radius: 8px;
          color: #fff;
          font-family: 'Stack Sans Text', sans-serif;
          font-size: 13px;
          resize: vertical;
          margin-bottom: 12px;
        }
        .event-simulator textarea:focus {
          outline: none;
          border-color: var(--accent, #2563eb);
        }
        .event-simulator .placeholder {
          color: var(--muted, #666);
          font-size: 12px;
          margin-bottom: 8px;
        }
        .event-simulator .button-group {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
        }
        .event-simulator button {
          padding: 8px 16px;
          background: var(--accent, #2563eb);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Stack Sans Text', sans-serif;
          transition: background 0.2s;
        }
        .event-simulator button:hover {
          background: #1a4dff;
        }
        .event-simulator button.secondary {
          background: transparent;
          border: 1px solid var(--border, #1a1f35);
          color: #fff;
        }
        .event-simulator button.secondary:hover {
          background: #1a1f35;
        }
        .event-simulator .presets {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        .event-simulator .preset-button {
          padding: 10px;
          background: #0a0e1a;
          border: 1px solid var(--border, #1a1f35);
          border-radius: 8px;
          color: #fff;
          text-align: left;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Stack Sans Text', sans-serif;
          transition: all 0.2s;
        }
        .event-simulator .preset-button:hover {
          background: #1a1f35;
          border-color: var(--accent, #2563eb);
        }
        .event-simulator .validation {
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 12px;
          font-size: 12px;
        }
        .event-simulator .validation.error {
          background: rgba(255, 59, 48, 0.1);
          border: 1px solid #ff3b30;
          color: #ff6b60;
        }
        .event-simulator .validation.warning {
          background: rgba(255, 193, 7, 0.1);
          border: 1px solid #ffc107;
          color: #ffd54f;
        }
        .event-simulator .validation.success {
          background: rgba(76, 175, 80, 0.1);
          border: 1px solid #4caf50;
          color: #81c784;
        }
        .event-simulator .influence-log {
          margin-top: 12px;
          padding: 10px;
          background: #0a0e1a;
          border-radius: 8px;
          border: 1px solid var(--border, #1a1f35);
        }
        .event-simulator .influence-log h4 {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted, #888);
          margin: 0 0 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .event-simulator .influence-log ul {
          margin: 0;
          padding-left: 20px;
          font-size: 12px;
          color: #fff;
        }
        .event-simulator .influence-log li {
          margin-bottom: 4px;
        }
        @media (max-width: 768px) {
          .event-simulator {
            margin-top: 0;
          }
        }
      `}</style>

      <h3>Event Simulator</h3>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          Compose (Text)
        </button>
        <button
          className={`tab ${activeTab === 'json' ? 'active' : ''}`}
          onClick={() => setActiveTab('json')}
        >
          Compose (JSON)
        </button>
        <button
          className={`tab ${activeTab === 'presets' ? 'active' : ''}`}
          onClick={() => setActiveTab('presets')}
        >
          Presets
        </button>
      </div>

      {activeTab === 'text' && (
        <div className="tab-content active">
          <div className="placeholder">
            Examples:
            <br />• Safety Car laps 10–13; allow lapped cars to pass; cheap pit stops; FL invalidated
            <br />• Hamilton −5s penalty; Verstappen wins FL
            <br />• Debris on lap 40 ⇒ VSC 3 laps; soft tyres degrade; Norris loses 1 position
          </div>
          <textarea
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Enter events in natural language..."
          />
          <div className="button-group">
            <button onClick={handleTextApply}>Apply Events & Recompute</button>
            <button className="secondary" onClick={() => setTextInput('')}>
              Clear
            </button>
          </div>
        </div>
      )}

      {activeTab === 'json' && (
        <div className="tab-content active">
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='[{"type":"SAFETY_CAR","startLap":10,"endLap":13,"allowLappedCarsPass":true}]'
          />
          <div className="button-group">
            <button onClick={handleJsonApply}>Apply Events & Recompute</button>
            <button className="secondary" onClick={() => setJsonInput('')}>
              Clear
            </button>
          </div>
        </div>
      )}

      {activeTab === 'presets' && (
        <div className="tab-content active">
          <div className="presets">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                className="preset-button"
                onClick={() => handlePresetClick(preset.events)}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {validation && (
        <div className={`validation ${validation.valid ? 'success' : 'error'}`}>
          {validation.errors.length > 0 && (
            <div>
              <strong>Errors:</strong>
              <ul>
                {validation.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}
          {validation.warnings.length > 0 && (
            <div>
              <strong>Warnings:</strong>
              <ul>
                {validation.warnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}
          {validation.valid && validation.errors.length === 0 && (
            <div>✓ Events validated successfully</div>
          )}
        </div>
      )}

      {outcome && outcome.notes.length > 0 && (
        <div className="influence-log">
          <h4>Influence Log</h4>
          <ul>
            {outcome.notes.map((note, i) => (
              <li key={i}>{note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

