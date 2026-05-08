-- Church events: add event management to individual church pages
-- Run in Supabase SQL editor if your existing churches schema is already installed.

CREATE TABLE IF NOT EXISTS church_events (
  id          UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  church_id   UUID         NOT NULL REFERENCES churches(id) ON DELETE CASCADE,
  title       TEXT         NOT NULL,
  event_date  TIMESTAMPTZ  NOT NULL,
  description TEXT,
  location    TEXT,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS church_events_church_date_idx
  ON church_events (church_id, event_date);

ALTER TABLE church_events ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'church_events'
      AND policyname = 'Public read church_events'
  ) THEN
    CREATE POLICY "Public read church_events"
      ON church_events FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'church_events'
      AND policyname = 'Auth write church_events'
  ) THEN
    CREATE POLICY "Auth write church_events"
      ON church_events FOR ALL
      USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Sample events for previewing the church pages.
-- These insert against existing church names, so no UUIDs need to be copied.
INSERT INTO church_events (church_id, title, event_date, description, location)
SELECT c.id, seed.title, seed.event_date::timestamptz, seed.description, seed.location
FROM churches c
JOIN (
  VALUES
    (
      'john',
      'Spring Coffee Morning',
      '2026-05-23 10:30:00+01',
      'A relaxed morning with tea, coffee, homemade cakes, and time to catch up with neighbours.',
      'St Johns Church, Penmaen'
    ),
    (
      'john',
      'Evening Hymns and Reflection',
      '2026-06-07 18:00:00+01',
      'A gentle evening gathering with favourite hymns and a short reflection.',
      'St Johns Church, Penmaen'
    ),
    (
      'st-nicholas',
      'Churchyard Working Morning',
      '2026-05-30 09:30:00+01',
      'Volunteers are welcome to help tidy the churchyard. Please bring gloves if you have them.',
      'St Nicholas Church, Nicholaston'
    ),
    (
      'st-nicholas',
      'Summer Songs Service',
      '2026-06-21 16:00:00+01',
      'An informal seasonal service followed by light refreshments.',
      'St Nicholas Church, Nicholaston'
    )
) AS seed(church_key, title, event_date, description, location)
  ON lower(c.name) LIKE '%' || seed.church_key || '%'
WHERE NOT EXISTS (
  SELECT 1
  FROM church_events existing
  WHERE existing.church_id = c.id
    AND existing.title = seed.title
);

-- Preview what has been inserted.
SELECT
  c.name AS church,
  e.title,
  e.event_date,
  e.location
FROM church_events e
JOIN churches c ON c.id = e.church_id
ORDER BY c.name, e.event_date;
