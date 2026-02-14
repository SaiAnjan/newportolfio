-- Resolutions 2026: shared list visible to anyone with the link
CREATE TABLE IF NOT EXISTS resolutions_2026 (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  notes TEXT NOT NULL DEFAULT '',
  emoji TEXT NOT NULL DEFAULT '✨',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resolutions_2026_created_at ON resolutions_2026(created_at ASC);

ALTER TABLE resolutions_2026 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read resolutions_2026"
  ON resolutions_2026 FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow public insert resolutions_2026"
  ON resolutions_2026 FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow public update resolutions_2026"
  ON resolutions_2026 FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Allow public delete resolutions_2026"
  ON resolutions_2026 FOR DELETE TO anon, authenticated USING (true);
