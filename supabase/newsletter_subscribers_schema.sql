CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  group_name TEXT NOT NULL CHECK (group_name IN ('hall', 'churches')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(email, group_name)
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can sign up from the website
CREATE POLICY "Allow public inserts" ON newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- Authenticated admins can read, update, and delete
CREATE POLICY "Allow admin read" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow admin update" ON newsletter_subscribers
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Allow admin delete" ON newsletter_subscribers
  FOR DELETE TO authenticated USING (true);
