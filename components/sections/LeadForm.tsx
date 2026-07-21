'use client';

import { useState, type FormEvent } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { submitLead } from '@/app/actions/leads';
import type { Lead } from '@/types';

interface LeadFormProps {
  /** Where the lead came from, stored with the submission (e.g. 'ai-basecamp'). */
  source: Lead['source'];
  submitLabel: string;
  note?: string;
  withCompany?: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Reusable lead-capture form (AI Basecamp). Frontend validation + success/error
 *  states. Submits via the submitLead server action, saved to content/leads.json. */
export default function LeadForm({ source, submitLabel, note, withCompany = false }: LeadFormProps) {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = 'Please enter your name.';
    if (!values.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(values.email)) e.email = 'Please enter a valid email address.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const result = await submitLead({ ...values, source });
      if (!result.ok) throw new Error(result.error);
      setStatus('success');
      setValues({ name: '', email: '', company: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const update = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  return (
    <form className="cs-form" onSubmit={onSubmit} noValidate data-source={source}>
      {status === 'success' && (
        <div className="cs-form__status cs-form__status--ok" role="status">
          You&apos;re in! We&apos;ll be in touch shortly with next steps.
        </div>
      )}
      {status === 'error' && (
        <div className="cs-form__status cs-form__status--err" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}
      {note && <p style={{ color: 'var(--cs-muted)', margin: 0, fontSize: 14.5 }}>{note}</p>}

      <div className={cn('cs-field', errors.name && 'cs-field--error')}>
        <label htmlFor="lf-name">Name</label>
        <input id="lf-name" className="cs-input" value={values.name} onChange={(e) => update('name', e.target.value)} placeholder="Your name" />
        {errors.name && <span className="cs-field__error">{errors.name}</span>}
      </div>

      <div className={cn('cs-field', errors.email && 'cs-field--error')}>
        <label htmlFor="lf-email">Email</label>
        <input id="lf-email" className="cs-input" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} placeholder="you@company.com" />
        {errors.email && <span className="cs-field__error">{errors.email}</span>}
      </div>

      {withCompany && (
        <div className="cs-field">
          <label htmlFor="lf-company">Company</label>
          <input id="lf-company" className="cs-input" value={values.company} onChange={(e) => update('company', e.target.value)} placeholder="Company name" />
        </div>
      )}

      <div className="cs-field">
        <label htmlFor="lf-message">What would you like to automate? (optional)</label>
        <textarea id="lf-message" className="cs-textarea" value={values.message} onChange={(e) => update('message', e.target.value)} placeholder="Briefly describe the repetitive work…" />
      </div>

      <button className="cs-btn cs-btn--primary" type="submit" disabled={status === 'submitting'}>
        <Icon name="arrow" />
        {status === 'submitting' ? 'Sending…' : submitLabel}
      </button>
    </form>
  );
}
