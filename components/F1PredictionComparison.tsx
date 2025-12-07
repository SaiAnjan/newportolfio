'use client';

import { useEffect, useState } from 'react';

interface UserPrediction {
  finishOrder: Array<{ position: number; driver: string }>;
  dnfs: string[];
  fastestLap: string | null;
  finalLeader: string;
  finalLeaderPoints: number;
  isTie: boolean;
}

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

interface ComparisonResult {
  finalLeaderMatch: number;
  fastestLapMatch: number;
  positionMatches: Record<number, number>;
  dnfMatches: Record<string, number>;
  overallMatch: number;
}

export default function F1PredictionComparison({ userPrediction }: { userPrediction: UserPrediction | null }) {
  const [data, setData] = useState<PredictionAggregates | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    if (!userPrediction) {
      setLoading(false);
      return;
    }

    fetch('/api/f1-predictions')
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          setError(result.error);
        } else {
          setData(result);
          // Calculate comparison
          const comp = calculateComparison(userPrediction, result);
          setComparison(comp);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load comparison data');
        setLoading(false);
        console.error(err);
      });
  }, [userPrediction]);

  const calculateComparison = (
    user: UserPrediction,
    community: PredictionAggregates
  ): ComparisonResult => {
    const result: ComparisonResult = {
      finalLeaderMatch: 0,
      fastestLapMatch: 0,
      positionMatches: {},
      dnfMatches: {},
      overallMatch: 0,
    };

    if (community.total === 0) {
      return result;
    }

    // Final Leader Match
    if (user.finalLeader && community.aggregates.finalLeader[user.finalLeader]) {
      result.finalLeaderMatch = community.aggregates.finalLeader[user.finalLeader];
    }

    // Fastest Lap Match
    if (user.fastestLap && community.aggregates.fastestLap[user.fastestLap]) {
      result.fastestLapMatch = community.aggregates.fastestLap[user.fastestLap];
    }

    // Position Matches
    user.finishOrder.forEach(({ position, driver }) => {
      if (community.aggregates.positionAverages[position]?.[driver]) {
        result.positionMatches[position] = community.aggregates.positionAverages[position][driver];
      } else {
        result.positionMatches[position] = 0;
      }
    });

    // DNF Matches
    user.dnfs.forEach((driver) => {
      if (community.aggregates.dnfs[driver]) {
        result.dnfMatches[driver] = community.aggregates.dnfs[driver];
      } else {
        result.dnfMatches[driver] = 0;
      }
    });

    // Calculate overall match (weighted average)
    const weights = {
      finalLeader: 0.3,
      fastestLap: 0.1,
      positions: 0.5,
      dnfs: 0.1,
    };

    // Average position match (for top 10 only)
    const top10Positions = user.finishOrder
      .filter(({ position }) => position <= 10)
      .map(({ position }) => result.positionMatches[position] || 0);
    const avgPositionMatch = top10Positions.length > 0
      ? top10Positions.reduce((a, b) => a + b, 0) / top10Positions.length
      : 0;

    // Average DNF match
    const dnfMatches = Object.values(result.dnfMatches);
    const avgDnfMatch = dnfMatches.length > 0
      ? dnfMatches.reduce((a, b) => a + b, 0) / dnfMatches.length
      : 0;

    result.overallMatch =
      result.finalLeaderMatch * weights.finalLeader +
      result.fastestLapMatch * weights.fastestLap +
      avgPositionMatch * weights.positions +
      avgDnfMatch * weights.dnfs;

    return result;
  };

  if (loading) {
    return (
      <div className="prediction-comparison">
        <style jsx>{`
          .prediction-comparison {
            background: var(--panel, #12182b);
            border: 1px solid var(--border, #1f2742);
            border-radius: 12px;
            padding: 16px;
            margin-top: 18px;
          }
          .loading {
            color: var(--muted, #97a6c1);
            font-size: 13px;
            text-align: center;
            padding: 20px;
          }
        `}</style>
        <div className="loading">Calculating your match with the community...</div>
      </div>
    );
  }

  if (error || !data || !comparison) {
    return (
      <div className="prediction-comparison">
        <style jsx>{`
          .prediction-comparison {
            background: var(--panel, #12182b);
            border: 1px solid var(--border, #1f2742);
            border-radius: 12px;
            padding: 16px;
            margin-top: 18px;
          }
          .error {
            color: var(--muted, #97a6c1);
            font-size: 13px;
            text-align: center;
            padding: 20px;
          }
        `}</style>
        <div className="error">
          {error || 'Unable to load comparison data'}
        </div>
      </div>
    );
  }

  if (data.total === 0) {
    return (
      <div className="prediction-comparison">
        <style jsx>{`
          .prediction-comparison {
            background: var(--panel, #12182b);
            border: 1px solid var(--border, #1f2742);
            border-radius: 12px;
            padding: 16px;
            margin-top: 18px;
          }
          .empty {
            color: var(--muted, #97a6c1);
            font-size: 13px;
            text-align: center;
            padding: 20px;
          }
        `}</style>
        <div className="empty">
          No community predictions yet. Be the first to make a prediction!
        </div>
      </div>
    );
  }

  // Get top 10 position matches
  const top10Matches = userPrediction!.finishOrder
    .filter(({ position }) => position <= 10)
    .map(({ position, driver }) => ({
      position,
      driver,
      match: comparison.positionMatches[position] || 0,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <div className="prediction-comparison">
      <style jsx>{`
        .prediction-comparison {
          background: var(--panel, #12182b);
          border: 1px solid var(--border, #1f2742);
          border-radius: 12px;
          padding: 16px;
          margin-top: 18px;
        }
        .prediction-comparison h3 {
          margin: 0 0 16px;
          font-size: 16px;
          color: var(--text, #e6eefc);
          border-bottom: 1px solid var(--border, #1f2742);
          padding-bottom: 8px;
        }
        .overall-score {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, #0f1424 0%, #1a1f35 100%);
          border-radius: 12px;
          margin-bottom: 20px;
          border: 2px solid var(--border, #1f2742);
        }
        .overall-score .score-label {
          color: var(--muted, #97a6c1);
          font-size: 12px;
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .overall-score .score-value {
          font-size: 48px;
          font-weight: 700;
          color: var(--accent, #ff6a00);
          line-height: 1;
          margin-bottom: 4px;
        }
        .overall-score .score-description {
          color: var(--text, #e6eefc);
          font-size: 13px;
        }
        .comparison-section {
          margin-bottom: 20px;
        }
        .comparison-section:last-child {
          margin-bottom: 0;
        }
        .comparison-section h4 {
          margin: 0 0 12px;
          font-size: 14px;
          color: var(--text, #e6eefc);
          font-weight: 600;
        }
        .match-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          background: #0f1424;
          border-radius: 8px;
          border: 1px solid var(--border, #1f2742);
          margin-bottom: 8px;
        }
        .match-item:last-child {
          margin-bottom: 0;
        }
        .match-item .label {
          color: var(--text, #e6eefc);
          font-size: 13px;
          flex: 1;
        }
        .match-item .value {
          color: var(--accent, #ff6a00);
          font-weight: 600;
          font-size: 14px;
          margin-left: 12px;
        }
        .match-item .bar {
          flex: 1;
          height: 6px;
          background: #0f1424;
          border-radius: 3px;
          margin: 0 12px;
          overflow: hidden;
        }
        .match-item .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent, #ff6a00) 0%, #ff8a33 100%);
          transition: width 0.3s ease;
        }
        .positions-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
        }
        .position-match {
          background: #0f1424;
          border: 1px solid var(--border, #1f2742);
          border-radius: 8px;
          padding: 10px;
          text-align: center;
        }
        .position-match .pos-label {
          color: var(--muted, #97a6c1);
          font-size: 10px;
          margin-bottom: 6px;
        }
        .position-match .driver-name {
          color: var(--text, #e6eefc);
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .position-match .match-percentage {
          color: var(--accent, #ff6a00);
          font-size: 12px;
          font-weight: 600;
        }
        .stats-summary {
          color: var(--muted, #97a6c1);
          font-size: 12px;
          margin-bottom: 16px;
          text-align: center;
        }
      `}</style>

      <h3>Your Prediction vs Community</h3>
      <div className="stats-summary">
        Compared with {data.total} prediction{data.total !== 1 ? 's' : ''}
      </div>

      {/* Overall Match Score */}
      <div className="overall-score">
        <div className="score-label">Overall Match</div>
        <div className="score-value">{comparison.overallMatch.toFixed(1)}%</div>
        <div className="score-description">
          {comparison.overallMatch >= 50
            ? 'You align well with the community!'
            : comparison.overallMatch >= 30
            ? 'You have a unique perspective'
            : 'You\'re going against the grain!'}
        </div>
      </div>

      {/* Final Leader Match */}
      <div className="comparison-section">
        <h4>Champion Prediction</h4>
        <div className="match-item">
          <span className="label">{userPrediction!.finalLeader}</span>
          <div className="bar">
            <div
              className="bar-fill"
              style={{ width: `${comparison.finalLeaderMatch}%` }}
            />
          </div>
          <span className="value">{comparison.finalLeaderMatch.toFixed(1)}%</span>
        </div>
        <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
          {data.rawCounts.finalLeader[userPrediction!.finalLeader] || 0} out of {data.total} people predicted this
        </div>
      </div>

      {/* Fastest Lap Match */}
      {userPrediction!.fastestLap && (
        <div className="comparison-section">
          <h4>Fastest Lap Prediction</h4>
          <div className="match-item">
            <span className="label">{userPrediction!.fastestLap}</span>
            <div className="bar">
              <div
                className="bar-fill"
                style={{ width: `${comparison.fastestLapMatch}%` }}
              />
            </div>
            <span className="value">{comparison.fastestLapMatch.toFixed(1)}%</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>
            {data.rawCounts.fastestLap[userPrediction!.fastestLap] || 0} out of {data.total} people predicted this
          </div>
        </div>
      )}

      {/* Top 10 Position Matches */}
      {top10Matches.length > 0 && (
        <div className="comparison-section">
          <h4>Your Top 10 Predictions</h4>
          <div className="positions-grid">
            {top10Matches.map(({ position, driver, match }) => (
              <div key={position} className="position-match">
                <div className="pos-label">P{position}</div>
                <div className="driver-name" title={driver}>
                  {driver.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="match-percentage">{match.toFixed(0)}%</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DNF Matches */}
      {userPrediction!.dnfs.length > 0 && (
        <div className="comparison-section">
          <h4>Your DNF Predictions</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {userPrediction!.dnfs.map((driver) => (
              <div key={driver} className="match-item">
                <span className="label">{driver}</span>
                <div className="bar">
                  <div
                    className="bar-fill"
                    style={{ width: `${comparison.dnfMatches[driver] || 0}%` }}
                  />
                </div>
                <span className="value">{(comparison.dnfMatches[driver] || 0).toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

