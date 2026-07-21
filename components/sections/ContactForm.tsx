'use client';

import { useState, type FormEvent } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { submitLead } from '@/app/actions/leads';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Contact form with frontend validation + success/error states. Submits via
 *  the submitLead server action, saved to content/leads.json (source: 'contact'). */
export default function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  const validate = (): boolean => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Please enter your name.';
    if (!values.email.trim()) next.email = 'Please enter your email.';
    else if (!EMAIL_RE.test(values.email)) next.email = 'Please enter a valid email address.';
    if (!values.message.trim()) next.message = 'Please enter a message.';
    else if (values.message.trim().length < 10) next.message = 'Message should be at least 10 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    try {
      const result = await submitLead({ ...values, source: 'contact' });
      if (!result.ok) throw new Error(result.error);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const update = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <form className="cs-form" onSubmit={handleSubmit} noValidate>
      {status === 'success' && (
        <div className="cs-form__status cs-form__status--ok" role="status">
          Thanks! Your message has been received. We&apos;ll get back to you shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="cs-form__status cs-form__status--err" role="alert">
          Something went wrong. Please try again or email us directly.
        </div>
      )}

      <div className={cn('cs-field', errors.name && 'cs-field--error')}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          className="cs-input"
          type="text"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Your name"
          aria-invalid={!!errors.name}
        />
        {errors.name && <span className="cs-field__error">{errors.name}</span>}
      </div>

      <div className={cn('cs-field', errors.email && 'cs-field--error')}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="cs-input"
          type="email"
          value={values.email}
          onChange={(e) => update('email', e.target.value)}
          placeholder="you@company.com"
          aria-invalid={!!errors.email}
        />
        {errors.email && <span className="cs-field__error">{errors.email}</span>}
      </div>

      <div className={cn('cs-field', errors.message && 'cs-field--error')}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          className="cs-textarea"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Tell us what you'd like to automate or build…"
          aria-invalid={!!errors.message}
        />
        {errors.message && <span className="cs-field__error">{errors.message}</span>}
      </div>

      <button className="cs-btn cs-btn--primary" type="submit" disabled={status === 'submitting'}>
        <Icon name="mail" />
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
