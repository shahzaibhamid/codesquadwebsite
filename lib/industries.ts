import 'server-only';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/** Used when Supabase isn't configured (local file-store fallback), and as a
 *  seed for the very first Supabase read before any admin adds more. */
const DEFAULT_INDUSTRIES = ['Healthcare & Clinics', 'E-commerce'];

/** All industries admins have created, in display order. Backs both the
 *  case-study "vertical" picker and the /case-studies filter tabs. */
export async function getIndustries(): Promise<string[]> {
  const db = getSupabaseAdmin();
  if (!db) return DEFAULT_INDUSTRIES;
  const { data, error } = await db
    .from('case_study_industries')
    .select('name')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });
  if (error || !data?.length) return DEFAULT_INDUSTRIES;
  return data.map((row) => row.name as string);
}

/** Adds a new industry if it doesn't already exist. Called whenever a case
 *  study is saved with a "vertical" value that isn't in the table yet. */
export async function ensureIndustry(name: string): Promise<void> {
  const db = getSupabaseAdmin();
  if (!db || !name.trim()) return;
  const { data } = await db.from('case_study_industries').select('id').eq('name', name).maybeSingle();
  if (!data) await db.from('case_study_industries').insert({ name });
}
