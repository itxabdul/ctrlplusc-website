// Vercel Serverless Function for Waitlist API
// Handles email signups with Supabase integration

import { createClient } from '@supabase/supabase-js';

// Rate limiting store (in-memory for simplicity)
const rateLimitStore = new Map();

// Clean up old entries every hour
setInterval(() => {
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  for (const [key, value] of rateLimitStore.entries()) {
    if (value.timestamp < oneHourAgo) {
      rateLimitStore.delete(key);
    }
  }
}, 60 * 60 * 1000);

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

    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';

    // Rate limiting: 5 requests per hour per IP
    const now = Date.now();
    const rateLimit = rateLimitStore.get(clientIP) || { count: 0, timestamp: now };

    if (now - rateLimit.timestamp > 60 * 60 * 1000) {
      // Reset if more than 1 hour
      rateLimit.count = 0;
      rateLimit.timestamp = now;
    }

    if (rateLimit.count >= 5) {
      return res.status(429).json({
        error: 'Too many requests. Please try again later.'
      });
    }

    // Extract and validate email
    const { email } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Extract additional data
    const userData = {
      email: email.trim().toLowerCase(),
      ip_address: clientIP,
      user_agent: req.headers['user-agent'] || '',
      referrer: req.headers.referer || req.headers.referrer || '',
      created_at: new Date().toISOString()
    };

    // Extract UTM parameters if present
    const url = new URL(req.headers.referer || 'https://ctrlplusc.com');
    userData.utm_source = url.searchParams.get('utm_source');
    userData.utm_medium = url.searchParams.get('utm_medium');
    userData.utm_campaign = url.searchParams.get('utm_campaign');

    // Insert into Supabase
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert([userData])
      .select();

    if (error) {
      // Handle duplicate email (unique constraint violation)
      if (error.code === '23505') {
        return res.status(200).json({
          message: 'Email already registered for waitlist',
          duplicate: true
        });
      }

      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error occurred' });
    }

    // Update rate limiting
    rateLimit.count += 1;
    rateLimitStore.set(clientIP, rateLimit);

    // Success response
    return res.status(200).json({
      message: 'Successfully added to waitlist',
      id: data[0]?.id,
      email: userData.email
    });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}