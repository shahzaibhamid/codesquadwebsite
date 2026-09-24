'use client';
import { useEffect, useState } from 'react';

const KEY = 'cs_industry_modal_seen';

const industries = [
  {
    href: '/aesthetics',
    title: 'Aesthetics / Medical Clinics',
    desc: 'Med spas, clinics & wellness — patient growth systems.',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&q=70&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l1.9 4.3L18 9.2l-4.1 1.9L12 15l-1.9-3.9L6 9.2l4.1-1.9L12 3z" /><path d="M19 14l.8 1.8L21.5 17l-1.7.8L19 19.5 18.2 17.8 16.5 17l1.7-.8L19 14z" /><path d="M5 15l.6 1.4L7 17l-1.4.6L5 19l-.6-1.4L3 17l1.4-.6L5 15z" /></svg>
    ),
  },
  {
    href: '/it-engineering',
    title: 'IT & Engineering',
    desc: 'Web, CRM, AI, automation, IoT & SEO/AEO/GEO.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=70&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
    ),
  },
  {
    href: '/ecommerce',
    title: 'E-commerce',
    desc: 'Online stores & DTC brands — carts, ROAS & LTV.',
    img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&q=70&auto=format&fit=crop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" /></svg>
    ),
  },
];

export default function IndustryModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === '1'; } catch (e) { /* ignore */ }
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    try { sessionStorage.setItem(KEY, '1'); } catch (e) { /* ignore */ }
  };
  const close = () => { dismiss(); setOpen(false); };
  const pick = () => { dismiss(); }; // link navigates on its own

  if (!open) return null;

  return (
    <div className="ind-modal" role="dialog" aria-modal="true" aria-labelledby="indModalTitle">
      <div className="ind-modal__backdrop" onClick={close} />
      <div className="ind-modal__card" role="document">
        <button className="ind-modal__x" onClick={close} aria-label="Close and explore the whole site">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <span className="ind-modal__eyebrow">Welcome to CodeSquad</span>
        <h2 id="indModalTitle">Find the growth system built for your industry.</h2>
        <p className="ind-modal__sub">One connected engine — ads, follow-up, automation and software — tuned to how your customers actually buy. Pick your field to see it, or explore the whole site.</p>
        <div className="ind-modal__grid">
          {industries.map((it) => (
            <a className="ind-modal__opt" href={it.href} key={it.href} onClick={pick}>
              <span className="ind-modal__thumb">
                <img src={it.img} alt={it.title} loading="lazy" />
              </span>
              <span className="ind-modal__txt">
                <span className="ind-modal__ot">{it.title}</span>
                <span className="ind-modal__od">{it.desc}</span>
                <span className="ind-modal__go">Explore →</span>
              </span>
            </a>
          ))}
        </div>
        <button className="ind-modal__skip" onClick={close}>No thanks, explore the whole site →</button>
      </div>
    </div>
  );
}
