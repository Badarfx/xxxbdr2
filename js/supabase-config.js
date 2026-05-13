// ===== KONFIGURASI SUPABASE =====
// Ganti dengan URL dan Anon Key dari project Supabase Anda
// Cara dapatkan: Settings → API → Project URL + anon/public key
const SUPABASE_URL = "https://ejobvygnuvpfhxmfzoqz.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqb2J2eWdudXZwZmh4bWZ6b3F6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2MDY2NTUsImV4cCI6MjA5NDE4MjY1NX0.oiS5ORhHmSfg8zme1Dql93eti1D4QEA42wviQOs27ds";

// Initialize Supabase
const supabase = supabaseJs.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
