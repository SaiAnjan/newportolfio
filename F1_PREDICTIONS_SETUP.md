# F1 Predictions Database Setup

This guide explains how to set up the database for collecting and aggregating F1 simulator predictions.

## Database Setup

### Step 1: Run the Migration in Supabase

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `supabase/migrations/create_f1_predictions_table.sql`
4. Click **Run** to execute the migration

This will create:
- `f1_predictions` table with proper schema
- Indexes for performance
- Row Level Security (RLS) policies allowing public read/write

### Step 2: Verify the Table

After running the migration, verify the table was created:
1. Go to **Table Editor** in Supabase
2. You should see `f1_predictions` table
3. Check that it has the following columns:
   - `id` (UUID, primary key)
   - `created_at` (timestamp)
   - `finish_order` (JSONB)
   - `dnfs` (JSONB)
   - `fastest_lap` (text)
   - `final_leader` (text)
   - `final_leader_points` (integer)
   - `is_tie` (boolean)
   - `user_agent` (text, nullable)
   - `ip_address` (text, nullable)

## How It Works

### Saving Predictions

When a user reaches the final outcome page (step 3 on mobile), the simulator automatically:
1. Extracts the current prediction data (finish order, DNFs, fastest lap, final leader)
2. Saves it to the database via `/api/f1-predictions` POST endpoint
3. Prevents duplicate saves in the same session using a ref

### Viewing Aggregated Predictions

The `F1PredictionStats` component:
1. Fetches all predictions from `/api/f1-predictions` GET endpoint
2. Aggregates the data to show:
   - Most predicted champion (with percentage)
   - Most predicted fastest lap (with percentage)
   - Most common position predictions for top 10
   - Most predicted DNFs
3. Displays the statistics on both mobile (step 3) and desktop views

## API Endpoints

### POST `/api/f1-predictions`
Saves a new prediction.

**Request Body:**
```json
{
  "finishOrder": [{"position": 1, "driver": "Max Verstappen"}, ...],
  "dnfs": ["Lewis Hamilton"],
  "fastestLap": "Max Verstappen",
  "finalLeader": "Max Verstappen",
  "finalLeaderPoints": 421,
  "isTie": false
}
```

**Response:**
```json
{
  "success": true,
  "id": "uuid-here"
}
```

### GET `/api/f1-predictions`
Fetches aggregated prediction statistics.

**Response:**
```json
{
  "total": 150,
  "aggregates": {
    "finalLeader": {
      "Max Verstappen": 45.3,
      "Lando Norris": 32.7,
      ...
    },
    "fastestLap": {...},
    "positionAverages": {
      "1": {"Max Verstappen": 52.0, ...},
      ...
    },
    "dnfs": {...}
  },
  "rawCounts": {...}
}
```

## Features

- ✅ Automatic prediction saving when users reach final outcome
- ✅ Aggregated statistics showing most common predictions
- ✅ Percentage calculations for each prediction category
- ✅ Works on both mobile and desktop
- ✅ Public read/write access (no authentication required)
- ✅ Prevents duplicate saves in the same session

## Notes

- Predictions are saved anonymously (no user authentication required)
- Each prediction includes a timestamp for potential time-based analysis
- The system tracks user agent and IP address (optional metadata)
- RLS policies ensure anyone can read/write predictions






