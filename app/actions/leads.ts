'use server';

import { revalidatePath } from 'next/cache';
import { createLeadStore } from '@/lib/leadsStore';
import type { Lead } from '@/types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface SubmitLeadInput {
  name: string;
  email: string;
  company?: string;
  message?: string;
  role?: string;
  tools?: string;
  source: Lead['source'];
}

export interface SubmitLeadResult {
  ok: boolean;
  error?: string;
}

/** Server Action — persists a lead form submission (AI Basecamp, AI Audit, Contact). */
export async function submitLead(input: SubmitLeadInput): Promise<SubmitLeadResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  if (!name || !email || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'Please provide a valid name and email.' };
  }

  try {
    await createLeadStore({
      name,
      email,
      company: input.company?.trim() || undefined,
      message: input.message?.trim() || undefined,
      role: input.role?.trim() || undefined,
      tools: input.tools?.trim() || undefined,
      source: input.source,
    });
  } catch (err) {
    console.error('submitLead: failed to persist lead', err);
    return { ok: false, error: 'Something went wrong submitting your info. Please try again or email us directly.' };
  }

  revalidatePath('/dashboard/leads');
  return { ok: true };
}
