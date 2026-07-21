'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SEL = [
  '.cs-heading',
  '.cs-hero__inner > *',
  '.cs-audit-hero > *',
  '.cs-card',
  '.cs-tool',
  '.cs-trustbar__item',
  '.cs-logos span',
  '.cs-logos a',
  '.cs-cta',
  '.cs-hero__stat',
  '.cs-single__header',
  '.cs-article > *',
].join(', ');

/**
 * Scroll-reveal — ported from assets/js/motion.js.
 * Re-runs on every route change (App Router client navigation) so newly
 * mounted pages animate in too.
 */
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains('cs-motion') || !('IntersectionObserver' in window)) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>(SEL));
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('cs-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    targets.forEach((el) => {
      try {
        const sibs = Array.from(el.parentElement?.children ?? []).filter((c) => c.matches(SEL));
        const i = sibs.indexOf(el);
        if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
      } catch {
        /* ignore */
      }
      io.observe(el);
    });

    // Failsafe: reveal anything already in view shortly after mount.
    const t = window.setTimeout(() => {
      targets.forEach((el) => {
        if (el.classList.contains('cs-in')) return;
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('cs-in');
      });
    }, 150);

    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
