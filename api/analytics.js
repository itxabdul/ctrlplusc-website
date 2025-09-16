// Privacy-focused Analytics API
// Stores anonymized analytics data in Supabase

import { createClient } from '@supabase/supabase-js';

// Rate limiting store
const rateLimitStore = new Map();

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Get client IP for rate limiting (anonymized)
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
    const hashedIP = hashIP(clientIP); // Hash IP for privacy

    // Rate limiting: 50 events per hour per IP
    const now = Date.now();
    const rateLimit = rateLimitStore.get(hashedIP) || { count: 0, timestamp: now };

    if (now - rateLimit.timestamp > 60 * 60 * 1000) {
      // Reset if more than 1 hour
      rateLimit.count = 0;
      rateLimit.timestamp = now;
    }

    if (rateLimit.count >= 50) {
      return res.status(429).json({
        error: 'Rate limit exceeded'
      });
    }

    // Extract analytics data
    const { event, data, url, referrer, timestamp, userAgent } = req.body;

    if (!event || typeof event !== 'string') {
      return res.status(400).json({ error: 'Event name is required' });
    }

    // Clean and anonymize data
    const analyticsData = {
      event_name: event.substring(0, 100),
      event_data: data ? JSON.stringify(data).substring(0, 1000) : null,
      page_url: url ? new URL(url).pathname : null, // Remove query params for privacy
      referrer_domain: referrer ? getDomain(referrer) : null,
      user_agent_hash: userAgent ? hashString(userAgent) : null,
      ip_hash: hashedIP,
      timestamp: new Date(timestamp || Date.now()).toISOString(),
      created_at: new Date().toISOString()
    };

    // Insert into Supabase analytics table
    const { error } = await supabase
      .from('analytics_events')
      .insert([analyticsData]);

    if (error) {
      console.error('Analytics error:', error);
      return res.status(500).json({ error: 'Failed to record analytics' });
    }

    // Update rate limiting
    rateLimit.count += 1;
    rateLimitStore.set(hashedIP, rateLimit);

    // Success response
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Analytics API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Helper functions for privacy
function hashIP(ip) {
  // Simple hash function for IP anonymization
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16);
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

function getDomain(url) {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
}