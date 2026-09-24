'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Scripts() {
  const pathname = usePathname();
  useEffect(() => {
    const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches;
    const cleanups = [];
    const on = (t, ev, fn, opt) => { t.addEventListener(ev, fn, opt); cleanups.push(() => t.removeEventListener(ev, fn, opt)); };

    document.documentElement.classList.add('js');

    /* active nav (page-level) */
    const path = (location.pathname.replace(/\/+$/, '') || '/');
    document.querySelectorAll('.nav-links a').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (href.indexOf('#') > -1) return;
      const hp = href.replace(/\/+$/, '') || '/';
      if (hp === path) a.classList.add('active');
    });
    if (['/industry', '/aesthetics', '/ecommerce', '/it-engineering'].indexOf(path) > -1) {
      const t = document.querySelector('.nav-drop-toggle'); if (t) t.classList.add('active');
    }

    /* header shrink */
    const header = document.getElementById('header');
    const onScrollHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
    on(window, 'scroll', onScrollHeader); onScrollHeader();
    // white nav text over dark heros (home, aesthetics, case-study detail) until scrolled
    const darkPaths = ['/', '/aesthetics', '/ecommerce', '/it-engineering', '/industry', '/visibility-engine', '/blog', '/case-studies'];
    const darkHero = darkPaths.indexOf(path) > -1 || path.startsWith('/case-studies/');
    if (header) header.classList.toggle('header-on-dark', darkHero);

    /* mobile menu + dropdown */
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    if (menuBtn && navLinks) {
      on(menuBtn, 'click', () => navLinks.classList.toggle('open'));
      navLinks.querySelectorAll('a:not(.nav-drop-toggle)').forEach((a) => on(a, 'click', () => navLinks.classList.remove('open')));
    }
    document.querySelectorAll('.nav-drop-toggle').forEach((t) => on(t, 'click', (e) => { e.preventDefault(); t.parentElement.classList.toggle('open'); }));
    on(document, 'click', (e) => { if (!e.target.closest('.nav-drop')) document.querySelectorAll('.nav-drop.open').forEach((d) => d.classList.remove('open')); });

    /* reveal */
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4 * 70) + 'ms'; io.observe(el); });
    cleanups.push(() => io.disconnect());

    /* vertical scroll timeline: beam follows scroll, cards activate as it passes */
    const tl = document.querySelector('.jtimeline');
    if (tl) {
      const beam = tl.querySelector('.jbeam');
      const fill = tl.querySelector('.jfill');
      const rows = Array.from(tl.querySelectorAll('.jrow'));
      let tlTick = false;
      const updTl = () => {
        tlTick = false;
        const rect = tl.getBoundingClientRect();
        const p = Math.max(0, Math.min(rect.height, window.innerHeight * 0.5 - rect.top));
        if (beam) beam.style.top = p + 'px';
        if (fill) fill.style.height = p + 'px';
        rows.forEach((row) => {
          const n = row.querySelector('.jnode').getBoundingClientRect();
          const nodeY = (n.top + n.height / 2) - rect.top;
          row.classList.toggle('in', reduce || nodeY <= p + 6);
        });
      };
      const onTl = () => { if (!tlTick) { tlTick = true; requestAnimationFrame(updTl); } };
      on(window, 'scroll', onTl, { passive: true });
      on(window, 'resize', onTl, { passive: true });
      updTl();
    }

    /* faq */
    document.querySelectorAll('.faq button').forEach((btn) => on(btn, 'click', () => {
      const item = btn.parentElement, ans = item.querySelector('.ans'), open = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach((f) => { f.classList.remove('open'); f.querySelector('.ans').style.maxHeight = null; });
      if (!open) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; }
    }));

    /* lead form */
    const form = document.getElementById('leadForm');
    if (form) on(form, 'submit', async (e) => {
      if (form.action.includes('your-form-id')) { e.preventDefault(); document.getElementById('formFields').style.display = 'none'; document.getElementById('formOk').style.display = 'block'; return; }
      e.preventDefault();
      try { const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } }); if (r.ok) { document.getElementById('formFields').style.display = 'none'; document.getElementById('formOk').style.display = 'block'; } else form.submit(); }
      catch (err) { form.submit(); }
    });

    /* count-up numbers */
    function countUp(el) {
      let rawHTML = el.getAttribute('data-rawhtml');
      if (rawHTML === null) { rawHTML = el.innerHTML; el.setAttribute('data-rawhtml', rawHTML); }
      const text = el.textContent.trim();
      if (text.indexOf('/') > -1) { el.innerHTML = rawHTML; return; }
      const m = text.match(/^(\D*?)([\d][\d,]*(?:\.\d+)?)(.*)$/);
      if (!m) { el.innerHTML = rawHTML; return; }
      const pre = m[1], numStr = m[2], suf = m[3];
      const hasComma = numStr.indexOf(',') > -1;
      const decimals = (numStr.split('.')[1] || '').length;
      const target = parseFloat(numStr.replace(/,/g, ''));
      if (reduce || !isFinite(target)) { el.innerHTML = rawHTML; return; }
      const fmt = (v) => { let s = decimals ? v.toFixed(decimals) : Math.round(v).toString(); if (hasComma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }); return pre + s + suf; };
      let t0 = null; const dur = 1200; el.textContent = fmt(0);
      const step = (ts) => { if (!t0) t0 = ts; const p = Math.min((ts - t0) / dur, 1); el.textContent = fmt(target * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); else el.innerHTML = rawHTML; };
      requestAnimationFrame(step);
    }
    const stats = document.querySelectorAll('.m-val,.cs-item .v,.hero-meta b,.fc-stats .v,.cv-legend .v,.ve-mini .v');
    if (stats.length) {
      const so = new IntersectionObserver((en) => en.forEach((e) => { if (e.isIntersecting) { countUp(e.target); so.unobserve(e.target); } }), { threshold: 0.4 });
      stats.forEach((el) => so.observe(el));
      cleanups.push(() => so.disconnect());
    }

    /* growing bars */
    const bars = document.querySelectorAll('.cv-bars .b');
    if (bars.length && !reduce) {
      const bo = new IntersectionObserver((en) => en.forEach((e) => {
        if (!e.isIntersecting) return; const b = e.target, h = b.style.height || '0%';
        b.style.height = '0%'; b.style.transition = 'none';
        requestAnimationFrame(() => { b.style.transition = 'height 1.1s cubic-bezier(.16,1,.3,1)'; requestAnimationFrame(() => { b.style.height = h; }); });
        bo.unobserve(b);
      }), { threshold: 0.3 });
      bars.forEach((b) => bo.observe(b));
      cleanups.push(() => bo.disconnect());
    }

    /* click a chart bar to cycle its colour */
    const palette = [
      'linear-gradient(180deg,#2fd3c1,#0FAE9B)',
      'linear-gradient(180deg,#ffd66b,#F5B301)',
      'linear-gradient(180deg,#ff9a8b,#FF6B6B)',
      'linear-gradient(180deg,#c79bff,#9b5de5)',
      'linear-gradient(180deg,#7db9ff,#2F6BFF)',
      'linear-gradient(180deg,#8fe3a0,#2ecc71)'
    ];
    bars.forEach((b) => {
      b.style.cursor = 'pointer';
      on(b, 'click', () => {
        const i = ((parseInt(b.dataset.ci || '0', 10)) + 1) % palette.length;
        b.dataset.ci = i;
        b.style.background = palette[i];
      });
    });

    /* hero rank bars */
    const seo = document.querySelector('.c-seo');
    if (seo && !reduce) {
      seo.querySelectorAll('.rank .bar').forEach((b) => { b.setAttribute('data-w', b.style.width || getComputedStyle(b).width); b.style.width = '0'; b.style.transition = 'width 1s cubic-bezier(.16,1,.3,1)'; });
      const ro = new IntersectionObserver((en) => en.forEach((e) => { if (!e.isIntersecting) return; e.target.querySelectorAll('.rank .bar').forEach((b, i) => setTimeout(() => { b.style.width = b.getAttribute('data-w'); }, 130 * i)); ro.unobserve(e.target); }), { threshold: 0.25 });
      ro.observe(seo); cleanups.push(() => ro.disconnect());
    }

    /* scroll-spy (home anchors) */
    const ids = ['work', 'founder', 'process', 'contact', 'system', 'services', 'results', 'case'];
    const links = {};
    document.querySelectorAll('.nav-links a').forEach((a) => { const h = a.getAttribute('href') || ''; const hi = h.indexOf('#'); if (hi > -1) links[h.slice(hi + 1)] = a; });
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length) {
      let ticking = false;
      const update = () => { ticking = false; const line = window.innerHeight * 0.32; let current = null; sections.forEach((s) => { if (s.getBoundingClientRect().top <= line) current = s.id; }); ids.forEach((id) => { if (links[id]) links[id].classList.toggle('active', id === current); }); };
      const onScrollSpy = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      on(window, 'scroll', onScrollSpy, { passive: true }); on(window, 'resize', onScrollSpy, { passive: true }); update();
    }

    // case-studies category filter
    const caseCats = document.getElementById('caseCats');
    const caseGrid = document.getElementById('caseGrid');
    if (caseCats && caseGrid) {
      const cards = Array.from(caseGrid.querySelectorAll('.cs-scard'));
      caseCats.querySelectorAll('.cs-cat').forEach((btn) => {
        on(btn, 'click', () => {
          const cat = btn.getAttribute('data-cat');
          caseCats.querySelectorAll('.cs-cat').forEach((b) => b.classList.toggle('cs-cat--active', b === btn));
          cards.forEach((card) => { card.style.display = (cat === 'All' || card.getAttribute('data-cat') === cat) ? '' : 'none'; });
        });
      });
    }

    // scroll-driven stacked reviews (cards change as you scroll through the section)
    const stack = document.getElementById('reviewStack');
    const scrollEl = document.getElementById('rsScroll');
    if (stack && scrollEl) {
      const cards = Array.from(stack.querySelectorAll('.rs-card'));
      const n = cards.length;
      const dotsWrap = document.getElementById('rsDots');
      const dots = [];
      if (dotsWrap) {
        cards.forEach(() => { const d = document.createElement('span'); dotsWrap.appendChild(d); dots.push(d); });
      }
      let active = -1;
      const sizeStack = () => {
        let h = 0;
        cards.forEach((c) => { h = Math.max(h, c.offsetHeight); });
        if (h) stack.style.minHeight = (h + 40) + 'px';
      };
      const render = (idx) => {
        if (idx === active) return;
        active = idx;
        cards.forEach((c, i) => {
          const d = i - idx;
          let pos;
          if (d < 0) pos = 'out';
          else if (d === 0) pos = '0';
          else if (d <= 3) pos = String(d);
          else pos = 'hide';
          c.setAttribute('data-pos', pos);
        });
        dots.forEach((dd, i) => dd.classList.toggle('on', i === idx));
      };
      let ticking = false;
      const update = () => {
        ticking = false;
        const total = scrollEl.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-scrollEl.getBoundingClientRect().top, 0), Math.max(total, 1));
        const progress = total > 0 ? scrolled / total : 0;
        render(Math.min(n - 1, Math.max(0, Math.round(progress * (n - 1)))));
      };
      const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
      sizeStack();
      update();
      on(window, 'scroll', onScroll, { passive: true });
      on(window, 'resize', () => { sizeStack(); update(); });
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
