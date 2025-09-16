-- Supabase Database Setup for CTRL+C Website
-- Run these commands in your Supabase SQL Editor

-- 1. Create waitlist_signups table (if not exists)
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referrer TEXT,
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist_signups(email);

-- Create index on created_at for analytics
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist_signups(created_at);

-- 2. Create analytics_events table for privacy-focused analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id SERIAL PRIMARY KEY,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB,
  page_url VARCHAR(500),
  referrer_domain VARCHAR(255),
  user_agent_hash VARCHAR(64),
  ip_hash VARCHAR(64),
  timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_analytics_event_name ON analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_page_url ON analytics_events(page_url);

-- 3. Create a view for analytics dashboard
CREATE OR REPLACE VIEW analytics_summary AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  event_name,
  COUNT(*) as event_count,
  COUNT(DISTINCT ip_hash) as unique_users
FROM analytics_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE_TRUNC('day', created_at), event_name
ORDER BY date DESC, event_count DESC;

-- 4. Create a view for conversion funnel
CREATE OR REPLACE VIEW conversion_funnel AS
WITH daily_stats AS (
  SELECT
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) FILTER (WHERE event_name = 'pageview') as pageviews,
    COUNT(DISTINCT ip_hash) FILTER (WHERE event_name = 'pageview') as unique_visitors,
    COUNT(*) FILTER (WHERE event_name = 'email_signup') as signups,
    COUNT(DISTINCT ip_hash) FILTER (WHERE event_name = 'email_signup') as unique_signups
  FROM analytics_events
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE_TRUNC('day', created_at)
)
SELECT
  date,
  pageviews,
  unique_visitors,
  signups,
  unique_signups,
  CASE
    WHEN unique_visitors > 0 THEN ROUND((unique_signups::NUMERIC / unique_visitors) * 100, 2)
    ELSE 0
  END as conversion_rate_percent
FROM daily_stats
ORDER BY date DESC;

-- 5. Enable Row Level Security (RLS) for security
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for API access
-- Allow public inserts but no reads (for privacy)
CREATE POLICY "Allow public waitlist signups" ON waitlist_signups
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow public analytics events" ON analytics_events
  FOR INSERT TO anon WITH CHECK (true);

-- Only authenticated users can read data (for admin dashboard)
CREATE POLICY "Allow authenticated reads" ON waitlist_signups
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated analytics reads" ON analytics_events
  FOR SELECT TO authenticated USING (true);

-- Grant access to views for authenticated users
GRANT SELECT ON analytics_summary TO authenticated;
GRANT SELECT ON conversion_funnel TO authenticated;

-- 7. Sample queries for your analytics dashboard

-- Daily signups
-- SELECT DATE_TRUNC('day', created_at) as date, COUNT(*) as signups
-- FROM waitlist_signups
-- WHERE created_at >= NOW() - INTERVAL '30 days'
-- GROUP BY DATE_TRUNC('day', created_at)
-- ORDER BY date DESC;

-- Top referrers
-- SELECT referrer_domain, COUNT(*) as visits
-- FROM analytics_events
-- WHERE event_name = 'pageview' AND referrer_domain IS NOT NULL
-- GROUP BY referrer_domain
-- ORDER BY visits DESC
-- LIMIT 10;

-- Conversion rate over time
-- SELECT * FROM conversion_funnel LIMIT 30;

-- Most popular pages
-- SELECT page_url, COUNT(*) as views
-- FROM analytics_events
-- WHERE event_name = 'pageview'
-- GROUP BY page_url
-- ORDER BY views DESC;

COMMIT;