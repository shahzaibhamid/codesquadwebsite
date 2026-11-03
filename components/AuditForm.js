'use client';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitAuditAction } from '../app/inquiry/actions';
import { AUDIT_QUESTIONS } from '../lib/auditQuestions';
import { PHONE_PATTERN, PHONE_MAX_LENGTH, PHONE_HINT } from '../lib/phone';

const CALENDLY = 'https://calendly.com/code_squad/30min';
const ADVANCE_DELAY_MS = 200;
const HEADER_CLEARANCE_PX = 92; // matches scroll-padding-top in globals.css

// Steps: 1–7 are the questions, 8 is the contact details.
const TOTAL_QUESTIONS = AUDIT_QUESTIONS.length;
const CONTACT_STEP = TOTAL_QUESTIONS + 1;

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" className="btn btn-dark audit-submit" disabled={pending}>{pending ? 'Sending…' : 'Request My Free Audit →'}</button>;
}

function BackButton({ onClick }) {
  const { pending } = useFormStatus();
  return <button type="button" className="audit-back" onClick={onClick} disabled={pending}>← Back</button>;
}

export default function AuditForm() {
  const [state, formAction] = useFormState(submitAuditAction, {});
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [otherText, setOtherText] = useState('');
  const [contact, setContact] = useState({ name: '', businessName: '', email: '', phone: '', profile: '' });
  const headingRef = useRef(null);
  const advanceTimer = useRef(null);
  const hasMoved = useRef(false);
  const tracked = useRef(false);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  // Move focus to each new screen so keyboard and screen-reader users follow along.
  useEffect(() => {
    if (!hasMoved.current) return;
    const heading = headingRef.current;
    heading?.focus({ preventScroll: true });
    // A long screen can leave the page scrolled past the top of a shorter one.
    const card = heading?.closest('.audit-card');
    if (card && card.getBoundingClientRect().top < HEADER_CLEARANCE_PX) card.scrollIntoView({ block: 'start' });
  }, [step, state?.ok]);

  useEffect(() => {
    if (!state?.saved || tracked.current) return;
    tracked.current = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'audit_submitted', lead_quality: state.lowIntent ? 'low_intent' : 'qualified' });
  }, [state?.saved, state?.lowIntent]);

  const goTo = (next) => {
    clearTimeout(advanceTimer.current);
    hasMoved.current = true;
    setStep(next);
  };

  const choose = (id, option) => {
    setAnswers((prev) => ({ ...prev, [id]: option }));
    clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => goTo(step + 1), ADVANCE_DELAY_MS);
  };

  const typedAnswer = otherText.trim();
  const submitOther = () => {
    if (!typedAnswer) return;
    setAnswers((prev) => ({ ...prev, [AUDIT_QUESTIONS[step - 1].id]: typedAnswer }));
    goTo(step + 1);
  };

  const updateContact = (e) => setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  if (state?.ok) {
    return (
      <div className="audit-card audit-done is-underway">
        <div className="audit-done__icon" aria-hidden="true">✓</div>
        <h2 className="audit-title" ref={headingRef} tabIndex={-1}>Your Growth Audit Request Is In!</h2>
        <p className="audit-text">Thanks for sharing your business details. The CodeSquad team will review your answers and reach out to discuss where you may be missing leads, bookings, or growth opportunities.</p>
        <p className="audit-text">Want to discuss your results sooner? Schedule your free consultation.</p>
        <a className="btn btn-dark" href={CALENDLY} target="_blank" rel="noopener noreferrer">Book a Free Call</a>
      </div>
    );
  }

  const isContact = step === CONTACT_STEP;
  const current = AUDIT_QUESTIONS[step - 1];

  return (
    <div className={`audit-card${step > 1 ? ' is-underway' : ''}`}>
      <div className="audit-progress">
        <p className="audit-count" aria-live="polite">{isContact ? 'Last step: your details' : `Question ${step} of ${TOTAL_QUESTIONS}`}</p>
        <div className="audit-bar" aria-hidden="true"><span style={{ width: `${(step / CONTACT_STEP) * 100}%` }} /></div>
      </div>

      {isContact ? (
        <form className="audit-step" key="contact" action={formAction}>
          <h2 className="audit-title" ref={headingRef} tabIndex={-1}>Contact Information</h2>
          {AUDIT_QUESTIONS.map((q) => <input key={q.id} type="hidden" name={q.id} value={answers[q.id] || ''} />)}
          <div className="field"><label htmlFor="audit-name">Full Name</label><input type="text" id="audit-name" name="name" value={contact.name} onChange={updateContact} placeholder="Jane Smith" required maxLength={120} autoComplete="name" /></div>
          <div className="field"><label htmlFor="audit-business">Business Name</label><input type="text" id="audit-business" name="businessName" value={contact.businessName} onChange={updateContact} placeholder="Your business" required maxLength={160} autoComplete="organization" /></div>
          <div className="field"><label htmlFor="audit-email">Business Email</label><input type="email" id="audit-email" name="email" value={contact.email} onChange={updateContact} placeholder="jane@yourbusiness.com" required maxLength={200} autoComplete="email" /></div>
          <div className="field"><label htmlFor="audit-phone">Phone Number</label><input type="tel" id="audit-phone" name="phone" value={contact.phone} onChange={updateContact} placeholder="(941) 555-0100" required maxLength={PHONE_MAX_LENGTH} autoComplete="tel" inputMode="tel" pattern={PHONE_PATTERN} title={PHONE_HINT} /></div>
          <div className="field"><label htmlFor="audit-profile">Business Website or Instagram Profile (optional)</label><input type="text" id="audit-profile" name="profile" value={contact.profile} onChange={updateContact} placeholder="yourbusiness.com or @yourbusiness" maxLength={200} /></div>
          {/* Honeypot for bots — hidden from people and screen readers. The real website field is "profile". */}
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
            <label htmlFor="audit-website">Website</label><input type="text" id="audit-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <p className="audit-consent">By submitting, you agree that CodeSquad may contact you about your audit request by phone or email.</p>
          {state?.error ? <p className="inq-err" role="alert">{state.error}</p> : null}
          <SubmitButton />
          <BackButton onClick={() => goTo(step - 1)} />
        </form>
      ) : (
        <div className="audit-step" key={current.id}>
          <fieldset className="audit-fieldset">
            <legend><h2 className="audit-title" ref={headingRef} tabIndex={-1}>{current.question}</h2></legend>
            <div className="audit-options">
              {current.options.map((option) => {
                const selected = answers[current.id] === option;
                return (
                  <button type="button" key={option} className={`audit-opt${selected ? ' is-selected' : ''}`} aria-pressed={selected} onClick={() => choose(current.id, option)}>
                    {option}
                  </button>
                );
              })}
              {current.otherMaxLength ? (
                <div className="audit-other">
                  <input
                    type="text"
                    className={`audit-opt${typedAnswer && answers[current.id] === typedAnswer ? ' is-selected' : ''}`}
                    aria-label="Other business: type your business"
                    placeholder="Other business: type yours"
                    value={otherText}
                    maxLength={current.otherMaxLength}
                    onChange={(e) => setOtherText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') submitOther(); }}
                  />
                  {typedAnswer ? <button type="button" className="btn btn-dark audit-other__next" onClick={submitOther}>Continue</button> : null}
                </div>
              ) : null}
            </div>
          </fieldset>
          {step > 1 ? <BackButton onClick={() => goTo(step - 1)} /> : null}
        </div>
      )}
    </div>
  );
}
