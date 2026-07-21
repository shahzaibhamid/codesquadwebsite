import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { Lead } from '@/types';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

/**
 * Leads store — captures AI Basecamp / Growth Club / AI Audit / Contact form
 * submissions. Uses Supabase (public.leads) when configured — the source of
 * truth in production, since Vercel's filesystem is read-only. Falls back to
 * a local JSON file (content/leads.json) when Supabase isn't configured.
 */

function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    name: row.name as string,
    email: row.email as string,
    company: (row.company as string) || undefined,
    message: (row.message as string) || undefined,
    role: (row.role as string) || undefined,
    tools: (row.tools as string) || undefined,
    source: row.source as Lead['source'],
    createdAt: row.created_at as string,
  };
}

const FILE = path.join(process.cwd(), 'content', 'leads.json');

async function fileLoad(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as Lead[];
  } catch {
    return [];
  }
}

async function fileSave(leads: Lead[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2), 'utf8');
}

export async function readAllLeads(): Promise<Lead[]> {
  const db = getSupabaseAdmin();
  if (!db) {
    const leads = await fileLoad();
    return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  const { data, error } = await db.from('leads').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToLead);
}

export async function createLeadStore(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const db = getSupabaseAdmin();
  if (!db) {
    const leads = await fileLoad();
    const record: Lead = { ...lead, id: randomUUID(), createdAt: new Date().toISOString() };
    leads.push(record);
    await fileSave(leads);
    return record;
  }

  const { data, error } = await db
    .from('leads')
    .insert({
      name: lead.name,
      email: lead.email,
      company: lead.company || null,
      message: lead.message || null,
      role: lead.role || null,
      tools: lead.tools || null,
      source: lead.source,
    })
    .select('*')
    .single();
  if (error) throw error;
  return rowToLead(data);
}
