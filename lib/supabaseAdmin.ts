import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the SERVICE ROLE key (full read/write,
 * bypasses RLS). Never import this into a client component. Returns null when
 * env vars are missing, so the app builds/runs without Supabase configured.
 *
 * Deliberately NOT memoized at module scope: on Vercel's warm (Fluid Compute)
 * instances, a client created once at cold start can pin its internal fetch
 * to a stale Next.js Data Cache entry, silently freezing query results for
 * the lifetime of the instance. Creating a fresh client per call is cheap
 * (no connection is opened until a query runs) and avoids that entirely.
 */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false },
    global: { fetch: (...args) => fetch(...args) },
  });
}

export const isDashboardDbReady =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
