import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY
    );

    // Test the connection
    const { data, error } = await supabase
      .from('waitlist_signups')
      .select('count', { count: 'exact' });

    return res.status(200).json({
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      connectionTest: error ? `Error: ${error.message}` : 'Success',
      count: data || 'Unknown'
    });
  } catch (err) {
    return res.status(200).json({
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
      connectionTest: `Catch Error: ${err.message}`,
      count: 'Failed'
    });
  }
}