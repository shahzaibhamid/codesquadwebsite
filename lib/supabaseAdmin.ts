import 'server-only';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Server-only Supabase client using the SERVICE ROLE key (full read/write,
 * bypasses RLS). Never import this into a client component. Returns null when
 * env vars are missing, so the app builds/runs without Supabase configured.
 */
let admin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  if (!admin) admin = createClient(url, key, { auth: { persistSession: false } });
  return admin;
}

export const isDashboardDbReady =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;
