'use client';

import { useState, type FormEvent } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { submitLead } from '@/app/actions/leads';

interface GrowthClubFormProps {
  submitLabel: string;
  note?: string;
  roleOptions: string[];
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Base Camp application form. Fields: Full Name, Email, Business Name, Role,
 * Biggest Business Challenge, Current Tools (optional). Submits via the
 * submitLead server action (source 'growth-club'), saved to content/leads.json
 * and visible in the dashboard Leads panel.
 */
export default function GrowthClubForm({ submitLabel, note, roleOptions }: GrowthClubFormProps) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: '',
    tools: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!values.name.trim()) e.name = 'Please enter your full name.';
    if (!values.email.trim()) e.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(values.email)) e.email = 'Please enter a valid email address.';
    if (!values.company.trim()) e.company = 'Please enter your business name.';
    if (!values.message.trim()) e.message = 'Please describe your biggest business challenge.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const result = await submitLead({ ...values, source: 'growth-club' });
      if (!result.ok) throw new Error(result.error);
      setStatus('success');
      setValues({ name: '', email: '', company: '', role: '', message: '', tools: '' });
    } catch {
      setStatus('error');
    }
  };

  const update = (k: keyof typeof values, v: string) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: '' }));
  };

  if (status === 'success') {
    return (
      <div className="cs-form__status cs-form__status--ok" role="status">
        Application received! Every application is reviewed manually — we&apos;ll be in touch within 24–48 hours
        with your invitation.
      </div>
    );
  }

  return (
    <form className="cs-form" onSubmit={onSubmit} noValidate data-source="growth-club">
      {status === 'error' && (
        <div className="cs-form__status cs-form__status--err" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}
      {note && <p style={{ color: 'var(--cs-muted)', margin: 0, fontSize: 14.5 }}>{note}</p>}

      <div className={cn('cs-field', errors.name && 'cs-field--error')}>
        <label htmlFor="gc-name">Full Name</label>
        <input id="gc-name" className="cs-input" value={values.name} onChange={(e) => update('name', e.target.value)} placeholder="Your full name" />
        {errors.name && <span className="cs-field__error">{errors.name}</span>}
      </div>

      <div className={cn('cs-field', errors.email && 'cs-field--error')}>
        <label htmlFor="gc-email">Email Address</label>
        <input id="gc-email" className="cs-input" type="email" value={values.email} onChange={(e) => update('email', e.target.value)} placeholder="you@business.com" />
        {errors.email && <span className="cs-field__error">{errors.email}</span>}
      </div>

      <div className={cn('cs-field', errors.company && 'cs-field--error')}>
        <label htmlFor="gc-company">Business Name</label>
        <input id="gc-company" className="cs-input" value={values.company} onChange={(e) => update('company', e.target.value)} placeholder="Your business name" />
        {errors.company && <span className="cs-field__error">{errors.company}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="gc-role">Your Role</label>
        <select id="gc-role" name="role" className="cs-input" value={values.role} onChange={(e) => update('role', e.target.value)}>
          <option value="">Select your role…</option>
          {roleOptions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className={cn('cs-field', errors.message && 'cs-field--error')}>
        <label htmlFor="gc-message">Biggest Business Challenge</label>
        <textarea id="gc-message" className="cs-textarea" value={values.message} onChange={(e) => update('message', e.target.value)} placeholder="What's the biggest challenge slowing your business down right now?" />
        {errors.message && <span className="cs-field__error">{errors.message}</span>}
      </div>

      <div className="cs-field">
        <label htmlFor="gc-tools">Current Tools (optional)</label>
        <input id="gc-tools" className="cs-input" value={values.tools} onChange={(e) => update('tools', e.target.value)} placeholder="e.g. HubSpot, Slack, Google Sheets…" />
      </div>

      <button className="cs-btn cs-btn--primary" type="submit" disabled={status === 'submitting'}>
        <Icon name="arrow" />
        {status === 'submitting' ? 'Submitting…' : submitLabel}
      </button>
    </form>
  );
}
