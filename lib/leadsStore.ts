import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { Lead } from '@/types';

/**
 * File-based leads store — captures AI Basecamp / AI Audit / Contact form
 * submissions. Persists to `content/leads.json` (created on first write), so
 * lead capture works locally with zero setup.
 *
 * NOTE: A serverless host with a read-only filesystem (e.g. Vercel) won't
 * persist writes — that's when you switch this layer to Supabase (schema in
 * supabase/schema.sql, admin client in lib/supabaseAdmin.ts). Only lib/leads.ts
 * and this file change; the forms and dashboard stay the same.
 */

const FILE = path.join(process.cwd(), 'content', 'leads.json');

async function load(): Promise<Lead[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8')) as Lead[];
  } catch {
    return [];
  }
}

async function save(leads: Lead[]): Promise<void> {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2), 'utf8');
}

export async function readAllLeads(): Promise<Lead[]> {
  const leads = await load();
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createLeadStore(lead: Omit<Lead, 'id' | 'createdAt'>): Promise<Lead> {
  const leads = await load();
  const record: Lead = { ...lead, id: randomUUID(), createdAt: new Date().toISOString() };
  leads.push(record);
  await save(leads);
  return record;
}
