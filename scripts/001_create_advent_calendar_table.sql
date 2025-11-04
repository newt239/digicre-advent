-- Create advent_calendar_entries table
CREATE TABLE IF NOT EXISTS advent_calendar_entries (
  id SERIAL PRIMARY KEY,
  day INTEGER NOT NULL UNIQUE CHECK (day >= 1 AND day <= 25),
  name VARCHAR(255) NOT NULL,
  title VARCHAR(500) NOT NULL,
  url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on day for faster lookups
CREATE INDEX IF NOT EXISTS idx_advent_calendar_day ON advent_calendar_entries(day);
