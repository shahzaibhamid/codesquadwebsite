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

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Not configured yet — the app uses static /data instead.
    return null;
  }
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

/** Convenience flag for UI that should adapt when the DB is live. */
export const isSupabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
