// ============================================================
// BACKEND CONFIG — fill these in after following BACKEND-SETUP.md
// Leave blank and everything gracefully runs in demo mode.
// The Supabase ANON key is safe to expose; RLS protects the data.
// NEVER put your Anthropic API key here — it lives only in the
// Cloudflare Worker's secrets.
// ============================================================
export const LM_CONFIG = {
  CONCIERGE_URL: "",     // e.g. https://butcher.yourname.workers.dev
  SUPABASE_URL: "",      // e.g. https://abcdefg.supabase.co
  SUPABASE_ANON_KEY: ""
}
