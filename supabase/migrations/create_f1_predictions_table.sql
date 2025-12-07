-- Create F1 predictions table
CREATE TABLE IF NOT EXISTS f1_predictions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prediction data
  finish_order JSONB NOT NULL, -- Array of {position: number, driver: string}
  dnfs JSONB NOT NULL, -- Array of driver names who DNF'd
  fastest_lap TEXT, -- Driver name or null
  final_leader TEXT NOT NULL, -- Driver name who wins championship
  final_leader_points INTEGER NOT NULL, -- Total points of winner
  is_tie BOOLEAN DEFAULT FALSE, -- Whether there's a tie for the championship
  
  -- Optional metadata
  user_agent TEXT,
  ip_address TEXT
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_f1_predictions_created_at ON f1_predictions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_f1_predictions_final_leader ON f1_predictions(final_leader);

-- Enable Row Level Security (RLS)
ALTER TABLE f1_predictions ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert predictions (public predictions)
CREATE POLICY "Allow public insert on f1_predictions"
  ON f1_predictions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy: Allow anyone to read predictions (for aggregating)
CREATE POLICY "Allow public read on f1_predictions"
  ON f1_predictions
  FOR SELECT
  TO anon, authenticated
  USING (true);

