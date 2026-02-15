interface UserPrediction {
  finishOrder: Array<{ position: number; driver: string }>;
  dnfs: string[];
  fastestLap: string | null;
  finalLeader: string;
  finalLeaderPoints: number;
  isTie: boolean;
}

interface F1PredictionComparisonProps {
  userPrediction: UserPrediction;
}

export default function F1PredictionComparison({ userPrediction }: F1PredictionComparisonProps) {
  return (
    <section className="card">
      <h2>Prediction Comparison</h2>
      <div className="content">
        <p className="text-sm text-foreground/70">
          Predicted leader: <strong>{userPrediction.finalLeader || "N/A"}</strong>
        </p>
      </div>
    </section>
  );
}
