import 'server-only';
import type { Lead } from '@/types';
import { readAllLeads } from './leadsStore';

/**
 * Leads data layer. Reads from the local file store (content/leads.json). To
 * move to Supabase later, swap this to query the DB (see supabase/schema.sql +
 * lib/supabaseAdmin.ts); nothing else changes.
 */

export async function getLeads(): Promise<Lead[]> {
  return readAllLeads();
}
