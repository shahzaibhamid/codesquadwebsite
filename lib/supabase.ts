/**
 * Supabase placeholder — NOT connected yet.
 *
 * The whole site currently runs on static data in /data. When your CEO is
 * ready to connect Supabase:
 *   1. Fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 *   2. Call `getSupabaseClient()` from a server component / route handler
 *   3. Replace the static imports in /data (e.g. blogPosts) with a query.
 *
 * `getSupabaseClient()` returns null when env vars are missing, so importing
 * this file never crashes the build.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Not configured yet — the app uses static /data instead.
    return null;
  }
  // Not memoized: a client cached at module scope can pin its internal fetch
  // to a stale Next.js Data Cache entry on warm serverless instances. See
  // lib/supabaseAdmin.ts for the fuller explanation.
  return createClient(url, anonKey, { global: { fetch: (...args) => fetch(...args) } });
}

/** Convenience flag for UI that should adapt when the DB is live. */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
