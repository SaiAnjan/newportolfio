'use client';

import { useEffect, useState } from 'react';

interface PredictionAggregates {
  total: number;
  aggregates: {
    finalLeader: Record<string, number>;
    fastestLap: Record<string, number>;
    positionAverages: Record<number, Record<string, number>>;
    dnfs: Record<string, number>;
  };
  rawCounts: {
    finalLeader: Record<string, number>;
    fastestLap: Record<string, number>;
    positions: Record<number, Record<string, number>>;
    dnfs: Record<string, number>;
  };
}

export default function F1PredictionStats() {
  const [data, setData] = useState<PredictionAggregates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/f1-predictions')
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load prediction statistics');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return (
      <div className="prediction-stats">
        <style jsx>{`
          .prediction-stats {
            background: var(--panel, #12182b);
            border: 1px solid var(--border, #1f2742);
            border-radius: 12px;
            padding: 16px;
            margin-top: 18px;
          }
          .prediction-stats h3 {
            margin: 0 0 12px;
            font-size: 16px;
            color: var(--text, #e6eefc);
          }
          .loading {
            color: var(--muted, #97a6c1);
            font-size: 13px;
          }
        `}</style>
        <h3>Community Predictions</h3>
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error || !data || data.total === 0) {
    return (
      <div className="prediction-stats">
        <style jsx>{`
          .prediction-stats {
            background: var(--panel, #12182b);
            border: 1px solid var(--border, #1f2742);
            border-radius: 12px;
            padding: 16px;
            margin-top: 18px;
          }
          .prediction-stats h3 {
            margin: 0 0 12px;
            font-size: 16px;
            color: var(--text, #e6eefc);
          }
          .empty {
            color: var(--muted, #97a6c1);
            font-size: 13px;
          }
        `}</style>
        <h3>Community Predictions</h3>
        <div className="empty">
          {error || 'No predictions yet. Be the first to make a prediction!'}
        </div>
      </div>
    );
  }

  // Get top predictions
  const getTopDriver = (drivers: Record<string, number>, count: number = 3) => {
    return Object.entries(drivers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count);
  };

  const topLeaders = getTopDriver(data.aggregates.finalLeader, 3);
  const topFastestLap = getTopDriver(data.aggregates.fastestLap, 3);
  const topDNFs = getTopDriver(data.aggregates.dnfs, 5);

  // Get most common position predictions for top 10
  const top10Positions: Array<{ position: number; topDriver: [string, number] | null }> = [];
  for (let pos = 1; pos <= 10; pos++) {
    const drivers = data.aggregates.positionAverages[pos] || {};
    const top = Object.entries(drivers).sort((a, b) => b[1] - a[1])[0] || null;
    top10Positions.push({ position: pos, topDriver: top });
  }

  return (
    <div className="prediction-stats">
      <style jsx>{`
        .prediction-stats {
          background: var(--panel, #12182b);
          border: 1px solid var(--border, #1f2742);
          border-radius: 12px;
          padding: 16px;
          margin-top: 18px;
        }
        .prediction-stats h3 {
          margin: 0 0 16px;
          font-size: 16px;
          color: var(--text, #e6eefc);
          border-bottom: 1px solid var(--border, #1f2742);
          padding-bottom: 8px;
        }
        .stats-summary {
          color: var(--muted, #97a6c1);
          font-size: 12px;
          margin-bottom: 16px;
        }
        .stat-section {
          margin-bottom: 20px;
        }
        .stat-section:last-child {
          margin-bottom: 0;
        }
        .stat-section h4 {
          margin: 0 0 8px;
          font-size: 14px;
          color: var(--text, #e6eefc);
          font-weight: 600;
        }
        .stat-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          padding: 6px 8px;
          background: #0f1424;
          border-radius: 6px;
          border: 1px solid var(--border, #1f2742);
        }
        .stat-item .driver {
          color: var(--text, #e6eefc);
          flex: 1;
        }
        .stat-item .percentage {
          color: var(--accent, #ff6a00);
          font-weight: 600;
          margin-left: 8px;
        }
        .stat-item .count {
          color: var(--muted, #97a6c1);
          font-size: 11px;
          margin-left: 8px;
        }
        .positions-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        .position-item {
          background: #0f1424;
          border: 1px solid var(--border, #1f2742);
          border-radius: 6px;
          padding: 8px;
          text-align: center;
          font-size: 11px;
        }
        .position-item .pos-label {
          color: var(--muted, #97a6c1);
          font-size: 10px;
          margin-bottom: 4px;
        }
        .position-item .driver-name {
          color: var(--text, #e6eefc);
          font-weight: 600;
          margin-bottom: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .position-item .percentage {
          color: var(--accent, #ff6a00);
          font-size: 10px;
        }
        .empty-stat {
          color: var(--muted, #97a6c1);
          font-size: 12px;
          font-style: italic;
        }
      `}</style>
      
      <h3>Community Predictions</h3>
      <div className="stats-summary">
        Based on {data.total} prediction{data.total !== 1 ? 's' : ''}
      </div>

      {/* Final Leader */}
      <div className="stat-section">
        <h4>Most Predicted Champion</h4>
        {topLeaders.length > 0 ? (
          <div className="stat-list">
            {topLeaders.map(([driver, percentage]) => (
              <div key={driver} className="stat-item">
                <span className="driver">{driver}</span>
                <span className="percentage">{percentage.toFixed(1)}%</span>
                <span className="count">({data.rawCounts.finalLeader[driver] || 0})</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-stat">No predictions yet</div>
        )}
      </div>

      {/* Fastest Lap */}
      <div className="stat-section">
        <h4>Most Predicted Fastest Lap</h4>
        {topFastestLap.length > 0 ? (
          <div className="stat-list">
            {topFastestLap.map(([driver, percentage]) => (
              <div key={driver} className="stat-item">
                <span className="driver">{driver}</span>
                <span className="percentage">{percentage.toFixed(1)}%</span>
                <span className="count">({data.rawCounts.fastestLap[driver] || 0})</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-stat">No predictions yet</div>
        )}
      </div>

      {/* Top 10 Positions */}
      <div className="stat-section">
        <h4>Most Common Top 10 Predictions</h4>
        <div className="positions-grid">
          {top10Positions.map(({ position, topDriver }) => (
            <div key={position} className="position-item">
              <div className="pos-label">P{position}</div>
              {topDriver ? (
                <>
                  <div className="driver-name" title={topDriver[0]}>
                    {topDriver[0].split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="percentage">{topDriver[1].toFixed(0)}%</div>
                </>
              ) : (
                <div className="empty-stat" style={{ fontSize: '10px' }}>—</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* DNFs */}
      {topDNFs.length > 0 && (
        <div className="stat-section">
          <h4>Most Predicted DNFs</h4>
          <div className="stat-list">
            {topDNFs.map(([driver, percentage]) => (
              <div key={driver} className="stat-item">
                <span className="driver">{driver}</span>
                <span className="percentage">{percentage.toFixed(1)}%</span>
                <span className="count">({data.rawCounts.dnfs[driver] || 0})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

