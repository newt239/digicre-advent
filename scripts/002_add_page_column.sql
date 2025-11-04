-- Add page column to allow multiple entries per day and enforce uniqueness per (day, page)
ALTER TABLE advent_calendar_entries
ADD COLUMN IF NOT EXISTS page INTEGER NOT NULL DEFAULT 1 CHECK (page IN (1, 2, 3));

-- Backfill existing rows to page = 1 (DEFAULT takes care of new rows)
UPDATE advent_calendar_entries SET page = 1 WHERE page IS NULL;

-- Drop existing unique constraint on day, if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'advent_calendar_entries'
      AND c.conname = 'advent_calendar_entries_day_key'
  ) THEN
    ALTER TABLE advent_calendar_entries DROP CONSTRAINT advent_calendar_entries_day_key;
  END IF;
END $$;

-- Create unique constraint on (day, page)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint c
    JOIN pg_class t ON c.conrelid = t.oid
    WHERE t.relname = 'advent_calendar_entries'
      AND c.conname = 'advent_calendar_entries_day_page_key'
  ) THEN
    ALTER TABLE advent_calendar_entries
    ADD CONSTRAINT advent_calendar_entries_day_page_key UNIQUE (day, page);
  END IF;
END $$;

-- Helpful index for filtering by page
CREATE INDEX IF NOT EXISTS idx_advent_calendar_day_page ON advent_calendar_entries(day, page);

