export default function handler(req, res) {
  return res.status(200).json({
    hasSupabaseUrl: !!process.env.SUPABASE_URL,
    hasSupabaseKey: !!process.env.SUPABASE_ANON_KEY,
    urlLength: process.env.SUPABASE_URL?.length || 0,
    keyLength: process.env.SUPABASE_ANON_KEY?.length || 0
  });
}