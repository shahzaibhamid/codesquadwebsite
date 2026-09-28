'use server';

import { addLead } from '../../lib/store';

const clip = (v, n) => String(v || '').trim().slice(0, n);

// Public form: no login, so validate everything and keep it small.
// Returns { ok: true } or { error }.
export async function submitInquiryAction(_prev, formData) {
  // Honeypot: real visitors never see or fill the "website" field.
  if (clip(formData.get('website'), 200)) return { ok: true };

  const name = clip(formData.get('name'), 120);
  const email = clip(formData.get('email'), 200);
  const phone = clip(formData.get('phone'), 40);
  const business = clip(formData.get('business'), 80);
  const message = clip(formData.get('message'), 4000);

  if (!name) return { error: 'Please enter your name.' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Please enter a valid email address.' };

  try {
    await addLead({ name, email, source: 'Inquiry page', payload: { phone, business, message } });
  } catch (e) {
    console.error('[inquiry] saving lead failed:', e);
    return { error: 'Sorry, your inquiry could not be sent right now. Please email info@codesquad.ai or call +1 (307) 396-4945.' };
  }
  return { ok: true };
}
