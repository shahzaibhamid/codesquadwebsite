'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { submitInquiryAction } from '../app/inquiry/actions';

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
    document.querySelectorAll('.nav-drop').forEach((d) => {
      if (d.querySelector('.nav-menu a.active')) d.querySelector('.nav-drop-toggle').classList.add('active');
    });
    if (path === '/industry') {
      const t = document.querySelector('.nav-drop-toggle[href="/industry"]'); if (t) t.classList.add('active');
    }

    /* footer back-to-top (the #header anchor doesn't scroll when the header is fixed/sticky) */
    on(document, 'click', (e) => {
      const a = e.target.closest && e.target.closest('.cs-footer__top');
      if (!a) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });

    /* header shrink */
    const header = document.getElementById('header');
    const onScrollHeader = () => header && header.classList.toggle('scrolled', window.scrollY > 20);
    on(window, 'scroll', onScrollHeader); onScrollHeader();
    // white nav text over dark heros (case-study detail, service pages, ...) until scrolled
    const darkPaths = ['/industry', '/blog', '/case-studies', '/inquiry'];
    const darkHero = darkPaths.indexOf(path) > -1 || path.startsWith('/case-studies/') || path.startsWith('/services/');
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
    document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = (el.hasAttribute('data-i') ? parseInt(el.getAttribute('data-i'), 10) * 80 : i % 4 * 70) + 'ms'; io.observe(el); });
    cleanups.push(() => io.disconnect());

    /* [data-lit]: light up once (workflow nodes), staggered by CSS via --i; shown lit straight away for reduced motion */
    const litEls = document.querySelectorAll('[data-lit]');
    if (litEls.length) {
      if (reduce) litEls.forEach((el) => el.classList.add('lit'));
      else {
        const lo = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('lit'); lo.unobserve(e.target); } }), { threshold: 0.35 });
        litEls.forEach((el) => lo.observe(el));
        cleanups.push(() => lo.disconnect());
      }
    }

    /* vertical scroll timeline: beam follows scroll, cards activate as it passes */
    document.querySelectorAll('.jtimeline').forEach((tl) => {
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
          const lit = reduce || nodeY <= p + 6;
          row.classList.toggle('in', lit);
        });
      };
      const onTl = () => { if (!tlTick) { tlTick = true; requestAnimationFrame(updTl); } };
      on(window, 'scroll', onTl, { passive: true });
      on(window, 'resize', onTl, { passive: true });
      updTl();
    });

    /* faq */
    document.querySelectorAll('.faq button').forEach((btn, n) => {
      const ans = btn.parentElement.querySelector('.ans');
      btn.id = btn.id || 'faq-q' + n; ans.id = ans.id || 'faq-a' + n;
      btn.setAttribute('aria-expanded', 'false'); btn.setAttribute('aria-controls', ans.id);
      ans.setAttribute('role', 'region'); ans.setAttribute('aria-labelledby', btn.id);
    });
    document.querySelectorAll('.faq button').forEach((btn) => on(btn, 'click', () => {
      const item = btn.parentElement, ans = item.querySelector('.ans'), open = item.classList.contains('open');
      document.querySelectorAll('.faq.open').forEach((f) => { f.classList.remove('open'); f.querySelector('.ans').style.maxHeight = null; f.querySelector('button').setAttribute('aria-expanded', 'false'); });
      if (!open) { item.classList.add('open'); ans.style.maxHeight = ans.scrollHeight + 'px'; btn.setAttribute('aria-expanded', 'true'); }
    }));

    /* lead form */
    const form = document.getElementById('leadForm');
    // Saved through the same server action as /inquiry, so these leads show up in the dashboard.
    if (form) on(form, 'submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]'), err = document.getElementById('formErr');
      const label = btn.textContent;
      const showError = (msg) => { err.textContent = msg; err.hidden = false; };
      btn.disabled = true; btn.textContent = 'Sending…'; err.hidden = true;
      const data = new FormData(form);
      data.set('page', path);
      try {
        const res = await submitInquiryAction({}, data);
        if (res?.ok) { document.getElementById('formFields').style.display = 'none'; document.getElementById('formOk').style.display = 'block'; }
        else showError(res?.error || 'Sorry, your request could not be sent right now. Please email info@codesquad.ai.');
      } catch (_) { showError('Sorry, your request could not be sent right now. Please email info@codesquad.ai or call +1 (307) 396-4945.'); }
      btn.disabled = false; btn.textContent = label;
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

    // blog category filter
    const blogCatsEl = document.getElementById('blogCats');
    const blogGridEl = document.getElementById('blogGrid');
    if (blogCatsEl && blogGridEl) {
      const posts = Array.from(blogGridEl.querySelectorAll('.bpost'));
      const empty = document.getElementById('blogEmpty');
      const btns = Array.from(blogCatsEl.querySelectorAll('button[data-cat]'));
      btns.forEach((btn) => on(btn, 'click', () => {
        const cat = btn.getAttribute('data-cat');
        btns.forEach((b) => { const isOn = b === btn; b.classList.toggle('cs-cat--active', isOn); b.setAttribute('aria-pressed', String(isOn)); });
        let shown = 0;
        posts.forEach((post) => { const match = cat === 'All' || post.getAttribute('data-cat') === cat; post.style.display = match ? '' : 'none'; if (match) shown++; });
        if (empty) empty.hidden = shown > 0;
      }));
    }

    // case-studies category filter
    const caseCats = document.getElementById('caseCats');
    const caseGrid = document.getElementById('caseGrid');
    if (caseCats && caseGrid) {
      const cards = Array.from(caseGrid.querySelectorAll('.cs-scard'));
      const activeBtn = caseCats.querySelector('.cs-cat--active') || caseCats.querySelector('.cs-cat');
      const applyFilter = (cat) => {
        cards.forEach((card) => {
          const cardCat = card.getAttribute('data-cat');
          const match = cat === 'All' ||
            cardCat === cat ||
            ((cat === 'Healthcare' || cat === 'Healthcare & Wellness' || cat === 'Healthcare & Clinics') && (cardCat === 'Healthcare' || cardCat === 'Healthcare & Wellness' || cardCat === 'Healthcare & Clinics'));
          card.style.display = match ? '' : 'none';
          if (match) card.classList.add('in');
        });
      };
      if (activeBtn) {
        applyFilter(activeBtn.getAttribute('data-cat'));
      }
      caseCats.querySelectorAll('.cs-cat').forEach((btn) => {
        on(btn, 'click', () => {
          const cat = btn.getAttribute('data-cat');
          caseCats.querySelectorAll('.cs-cat').forEach((b) => {
            const isOn = b === btn;
            b.classList.toggle('cs-cat--active', isOn);
            b.setAttribute('aria-pressed', String(isOn));
          });
          applyFilter(cat);
        });
      });
    }

    // generic clinic-type toggle (campaign samples, sample messaging, contact-form default —
    // all keyed off the same data-toggle-group value so one toggle drives every panel on the page)
    document.querySelectorAll('[data-toggle-group]').forEach((group) => {
      const groupName = group.getAttribute('data-toggle-group');
      group.querySelectorAll('[data-toggle]').forEach((btn) => on(btn, 'click', () => {
        const val = btn.getAttribute('data-toggle');
        document.querySelectorAll(`[data-toggle-group="${groupName}"] [data-toggle]`).forEach((b) => b.classList.toggle('on', b.getAttribute('data-toggle') === val));
        document.querySelectorAll('[data-toggle-panel]').forEach((p) => { p.style.display = p.getAttribute('data-toggle-panel') === val ? '' : 'none'; });
        const clinicOpt = btn.getAttribute('data-clinic-option');
        const sel = document.getElementById('clinic');
        if (clinicOpt && sel) sel.value = clinicOpt;
      }));
    });

    // industry tabs (data-tabs): WAI-ARIA tabs with arrow/Home/End keys; the URL hash (#clinics,
    // #ecommerce) selects a tab on load and on hashchange, and clicking a tab updates the hash
    document.querySelectorAll('[data-tabs]').forEach((list) => {
      const tabs = Array.from(list.querySelectorAll('[role="tab"]'));
      const panelFor = (t) => document.getElementById(t.getAttribute('aria-controls'));
      const select = (tab, focus) => {
        tabs.forEach((t) => {
          const isOn = t === tab;
          t.classList.toggle('on', isOn);
          t.setAttribute('aria-selected', String(isOn));
          t.tabIndex = isOn ? 0 : -1;
          const panel = panelFor(t);
          if (panel) { panel.classList.toggle('is-active', isOn); panel.hidden = !isOn; }
        });
        if (focus) tab.focus();
      };
      // a hash can name a tab panel (#ecommerce) or any section inside one (#crm, #campaigns):
      // open the owning tab, then jump to the tab list or to that section
      const fromHash = (scroll) => {
        const id = decodeURIComponent(location.hash.slice(1));
        if (!id) return;
        let tab = tabs.find((t) => t.getAttribute('aria-controls') === id);
        let target = list;
        if (!tab) {
          const el = document.getElementById(id);
          const panel = el && el.closest('[role="tabpanel"]');
          tab = panel && tabs.find((t) => t.getAttribute('aria-controls') === panel.id);
          if (!tab) return;
          target = el;
        }
        select(tab);
        if (scroll) setTimeout(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }), 0);
      };
      tabs.forEach((t, i) => {
        on(t, 'click', () => { select(t); history.replaceState(null, '', '#' + t.getAttribute('aria-controls')); });
        on(t, 'keydown', (e) => {
          let j = null;
          if (e.key === 'ArrowRight') j = (i + 1) % tabs.length;
          else if (e.key === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
          else if (e.key === 'Home') j = 0;
          else if (e.key === 'End') j = tabs.length - 1;
          if (j === null) return;
          e.preventDefault();
          select(tabs[j], true);
          history.replaceState(null, '', '#' + tabs[j].getAttribute('aria-controls'));
        });
      });
      select(tabs.find((t) => t.classList.contains('on')) || tabs[0]);
      fromHash(true);
      on(window, 'hashchange', () => fromHash(true));
    });

    // process flow map: hovering (mouse), focusing (keyboard) or tapping a stage opens its detail panel
    document.querySelectorAll('[data-pflow]').forEach((flow) => {
      const nodes = Array.from(flow.querySelectorAll('[data-pf]'));
      const panel = flow.querySelector('.pf-panel');
      const hoverable = window.matchMedia && matchMedia('(hover:hover) and (pointer:fine)').matches;
      let timer;
      const show = (key, scroll) => {
        nodes.forEach((n) => { const isOn = n.getAttribute('data-pf') === key; n.classList.toggle('on', isOn); n.setAttribute('aria-expanded', String(isOn)); });
        flow.querySelectorAll('[data-pf-detail]').forEach((d) => { d.hidden = d.getAttribute('data-pf-detail') !== key; });
        flow.classList.add('pf-open');
        if (scroll && panel) setTimeout(() => { if (panel.getBoundingClientRect().bottom > window.innerHeight) panel.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest' }); }, 380);
      };
      nodes.forEach((n) => {
        const key = n.getAttribute('data-pf');
        if (hoverable) {
          // short delay so sweeping the mouse across the map doesn't flicker through every stage
          on(n, 'mouseenter', () => { clearTimeout(timer); timer = setTimeout(() => show(key), 140); });
          on(n, 'mouseleave', () => clearTimeout(timer));
        }
        on(n, 'focus', () => show(key));
        on(n, 'click', () => show(key, !hoverable));
      });
      cleanups.push(() => clearTimeout(timer));
    });

    // "What We Do" growth engine: the five services on a 3D ring that rolls round on its own (4s autoplay),
    // or by drag / arrows / dots / keys. Pauses on keyboard focus, off-screen or a hidden tab. With reduced
    // motion the CSS shows a swipeable row instead and the ring engine stays idle.
    const eng = document.getElementById('capabilities');
    const engRing = eng && eng.querySelector('[data-eng-ring]');
    if (engRing) {
      const INTERVAL = 4000;
      const stage = engRing.querySelector('.cr-stage'), ring = engRing.querySelector('.cr-ring');
      const cards = Array.from(engRing.querySelectorAll('.cr-card')), dots = Array.from(engRing.querySelectorAll('.cr-dot'));
      const status = engRing.querySelector('.cr-status'), groupEl = engRing.querySelector('.cr-group');
      const ctas = cards.map((c) => c.querySelector('.eng-cta'));
      const N = cards.length, STEP = 360 / N;
      const names = cards.map((c) => c.querySelector('h3').textContent);
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const mod = (a, b) => ((a % b) + b) % b;
      let angle = -STEP * 2, target = 0, last = 0, raf = 0, timer = 0, active = -1;
      let focused = false, inView = false, drag = null, moved = false;

      // timed illustration sequences (.is-playing) run only on the front card while the section is in view;
      // they freeze (.is-held) whenever the autoplay is paused.
      const seo = Array.from(eng.querySelectorAll('.g2, .mi, .cv'));
      const seoSync = () => {
        const held = paused();
        seo.forEach((g) => {
          const card = g.closest('.cr-card');
          const on = !!card && (mq.matches || (card.classList.contains('is-front') && inView));
          g.classList.toggle('is-playing', on && !mq.matches);
          g.classList.toggle('is-held', on && !mq.matches && held);
        });
      };

      const paint = () => {
        ring.style.setProperty('--rot', (-angle).toFixed(2) + 'deg');
        cards.forEach((c, i) => {
          const d = Math.abs(mod(i * STEP - angle + 180, 360) - 180);
          c.style.setProperty('--d', d.toFixed(1));
          c.classList.toggle('is-back', d > 110);
        });
      };
      const setActive = (announce) => {
        const a = mod(Math.round(target / STEP), N);
        if (a === active) return;
        active = a;
        cards.forEach((c, i) => {
          const front = i === a, open = front || mq.matches;
          c.classList.toggle('is-front', front);
          if (open) c.removeAttribute('aria-hidden'); else c.setAttribute('aria-hidden', 'true');
          if (ctas[i]) ctas[i].tabIndex = open ? 0 : -1;
        });
        dots.forEach((d, i) => d.classList.toggle('on', i === a));
        if (groupEl) groupEl.textContent = cards[a].getAttribute('data-grp');
        if (announce && status) status.textContent = (a + 1) + ' of ' + N + ': ' + names[a];
        seoSync();
      };
      const frame = (t) => {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.05, (t - last) / 1000 || 0.016); last = t;
        if (!drag) {
          const diff = target - angle;
          angle = Math.abs(diff) < 0.02 ? target : angle + diff * (1 - Math.exp(-dt * 5));
        }
        paint();
      };
      function paused() { return focused || !inView || document.hidden || !!drag || mq.matches; }
      const schedule = () => {
        clearTimeout(timer);
        eng.classList.toggle('is-paused', paused());
        if (!paused()) timer = setTimeout(() => { target = (Math.round(target / STEP) + 1) * STEP; setActive(false); schedule(); }, INTERVAL);
        seoSync();
      };
      const sync = () => {
        const want = !mq.matches && inView;
        if (want && !raf) { last = performance.now(); raf = requestAnimationFrame(frame); }
        if (!want && raf) { cancelAnimationFrame(raf); raf = 0; }
        schedule();
      };
      const goTo = (i) => {
        const cur = mod(Math.round(target / STEP), N);
        target += (mod(i - cur + Math.floor(N / 2), N) - Math.floor(N / 2)) * STEP;
        setActive(true); schedule();
      };
      const step = (dir) => { target = (Math.round(target / STEP) + dir) * STEP; setActive(true); schedule(); };

      // scale each illustration down (never up) so it fits the fixed-height top half of its card
      const fit = () => cards.forEach((c) => {
        const v = c.querySelector('.eng-svis'), g = v && v.querySelector(':scope > .g');
        if (!g) return;
        const cs = getComputedStyle(v);
        const availH = v.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        const availW = v.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const k = Math.min(1, availH / g.scrollHeight, availW / g.scrollWidth);
        g.style.setProperty('--fit', k > 0 ? k.toFixed(3) : '1');
      });
      const fitRo = window.ResizeObserver ? new ResizeObserver(() => fit()) : null;
      if (fitRo) cards.forEach((c) => fitRo.observe(c.querySelector('.eng-svis')));
      fit();
      cleanups.push(() => { if (fitRo) fitRo.disconnect(); });

      paint(); setActive(false);
      on(document.getElementById('engPrev'), 'click', () => step(-1));
      on(document.getElementById('engNext'), 'click', () => step(1));
      dots.forEach((d, i) => on(d, 'click', () => goTo(i)));
      on(stage, 'keydown', (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      });
      // clicking a side card rolls it to the front; only the front card's CTA follows its link
      cards.forEach((c, i) => on(c, 'click', (e) => { if (moved) return; if (!mq.matches && i !== active) { e.preventDefault(); goTo(i); } }));
      on(stage, 'click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); } }, true);

      // drag: a horizontal gesture rolls the ring; a mostly vertical one is left to the page (touch-action:pan-y)
      on(stage, 'pointerdown', (e) => {
        if (mq.matches || (e.pointerType === 'mouse' && e.button !== 0)) return;
        drag = { x: e.clientX, y: e.clientY, a: angle, v: 0, px: e.clientX, pt: performance.now(), axis: e.pointerType === 'mouse' ? 'x' : null };
        moved = false; clearTimeout(timer);
      });
      on(window, 'pointermove', (e) => {
        if (!drag) return;
        const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (!drag.axis) {
          if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
          drag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
        }
        if (drag.axis === 'y') return;
        if (Math.abs(dx) > 6) { moved = true; stage.classList.add('is-drag'); }
        const now = performance.now();
        drag.v = ((drag.px - e.clientX) * 0.3) / Math.max(1, now - drag.pt) * 1000 * 0.5 + drag.v * 0.5;
        drag.px = e.clientX; drag.pt = now;
        angle = drag.a - dx * 0.3; target = angle;
      });
      const release = () => {
        if (!drag) return;
        const v = drag.axis === 'x' ? drag.v : 0; drag = null; stage.classList.remove('is-drag');
        if (moved) { target = Math.round((angle + v * 0.15) / STEP) * STEP; setActive(true); setTimeout(() => { moved = false; }, 60); }
        schedule();
      };
      on(window, 'pointerup', release); on(window, 'pointercancel', release);
      // only keyboard focus pauses; a mouse click keeps the 4s timer running
      on(engRing, 'focusin', (e) => { focused = !!(e.target.matches && e.target.matches(':focus-visible')); schedule(); });
      on(engRing, 'focusout', (e) => { if (!engRing.contains(e.relatedTarget)) { focused = false; schedule(); } });
      on(document, 'visibilitychange', sync);
      const onMq = () => { active = -1; setActive(false); sync(); };
      if (mq.addEventListener) { mq.addEventListener('change', onMq); cleanups.push(() => mq.removeEventListener('change', onMq)); }
      const engIo = new IntersectionObserver((es) => {
        inView = es[0].isIntersecting;
        eng.classList.toggle('is-visible', inView);
        sync();
      }, { threshold: 0.3 });
      engIo.observe(engRing);
      cleanups.push(() => { cancelAnimationFrame(raf); clearTimeout(timer); engIo.disconnect(); });
    }

    // "Ready to build?" inline Calendly (tablet/desktop only; phones use the Book a Free Call button and load nothing).
    // The card has a fixed height (the section never grows); longer Calendly views scroll inside with the scrollbar clipped.
    // Chrome pauses cross-origin iframes while they are off-screen, so a calendar loaded below the fold only starts
    // rendering once scrolled to (~2s of Calendly's own loader). To avoid that, once the page is idle the calendar is
    // pre-rendered in an invisible holder pinned inside the viewport (outside the section, whose transform/overflow
    // would hide it), then moved into its card with moveBefore(), which keeps the loaded iframe instead of reloading.
    // Browsers without moveBefore() load it in place as the section is approached.
    // If it can't load, the placeholder keeps a link to the booking page.
    const cal = document.querySelector('[data-calendly]');
    if (cal && !cal.querySelector('iframe')) {
      const slot = cal.parentElement;
      const url = cal.getAttribute('data-calendly') + '?hide_gdpr_banner=1&hide_event_type_details=1&hide_landing_page_details=1&primary_color=0fae9b';
      const phoneMq = window.matchMedia('(max-width: 640px)');
      const canMove = typeof cal.moveBefore === 'function';
      let failTimer = 0, revealTimer = 0, started = false, near = false, frame = null, holder = null, rendered = false;
      const fail = () => { if (!rendered) cal.classList.add('is-failed'); };
      const ready = () => {
        clearTimeout(failTimer); clearTimeout(revealTimer); rendered = true;
        if (!holder) cal.classList.add('is-ready');
      };
      // Calendly posts calendly.page_height once its page has rendered; ignore the tiny interim heights while it boots
      on(window, 'message', (e) => {
        if (!frame || e.source !== frame.contentWindow || !/^https:\/\/([\w-]+\.)?calendly\.com$/.test(e.origin)) return;
        if (!e.data || e.data.event !== 'calendly.page_height') return;
        const h = parseInt(e.data.payload && e.data.payload.height, 10);
        if (h < 300) return;
        cal.classList.toggle('is-tall', h > 612);
        ready();
      });
      // move the pre-rendered iframe from the holder into the card (state-preserving), or fall back to a fresh load
      const settle = () => {
        if (!holder) return;
        const h = holder; holder = null;
        if (frame && frame.parentNode === h) {
          try { cal.moveBefore(frame, cal.firstChild); } catch (err) { frame = null; started = false; }
        }
        h.remove();
        if (frame) { if (rendered) cal.classList.add('is-ready'); } else load(cal);
      };
      const mount = (target) => {
        if (!window.Calendly || frame) return;
        window.Calendly.initInlineWidget({ url, parentElement: target });
        frame = target.querySelector('iframe');
        if (frame) {
          frame.setAttribute('title', 'Book a free 30-minute call with CodeSquad');
          on(frame, 'load', () => { revealTimer = setTimeout(ready, 4000); });
        }
        failTimer = setTimeout(() => { if (!rendered) fail(); }, 15000);
        if (target === holder && near) settle();
      };
      const load = (target) => {
        if (started || phoneMq.matches) return;
        started = true;
        if (window.Calendly) { mount(target); return; }
        let s = document.querySelector('script[data-calendly-widget]');
        if (!s) {
          s = document.createElement('script');
          s.src = 'https://assets.calendly.com/assets/external/widget.js';
          s.async = true;
          s.setAttribute('data-calendly-widget', '');
          document.head.appendChild(s);
        }
        on(s, 'load', () => mount(target));
        on(s, 'error', fail);
      };
      // open the connections early so the script and iframe start faster
      if (!phoneMq.matches) ['https://assets.calendly.com', 'https://calendly.com'].forEach((href) => {
        if (document.querySelector('link[rel="preconnect"][href="' + href + '"]')) return;
        const l = document.createElement('link'); l.rel = 'preconnect'; l.href = href; l.crossOrigin = ''; document.head.appendChild(l);
      });
      const idle = window.requestIdleCallback || ((fn) => setTimeout(fn, 1500));
      const cancelIdle = window.cancelIdleCallback || clearTimeout;
      let idleId = 0;
      const warm = () => { idleId = idle(() => {
        if (started || phoneMq.matches || near || !canMove) return;
        holder = document.createElement('div');
        holder.className = 'rd-cal-warm';
        holder.setAttribute('aria-hidden', 'true');
        holder.setAttribute('inert', '');
        holder.style.width = (slot.clientWidth || 540) + 'px';
        document.body.appendChild(holder);
        load(holder);
      }, { timeout: 4000 }); };
      if (document.readyState === 'complete') warm(); else on(window, 'load', warm);
      // as the section is approached: drop the pre-rendered calendar into place, or load it now
      const calIo = new IntersectionObserver((es) => {
        near = es[0].isIntersecting;
        if (!near || phoneMq.matches) return;
        calIo.disconnect();
        if (holder) { if (frame) settle(); } else load(cal);
      }, { rootMargin: '900px 0px' });
      calIo.observe(slot);
      cleanups.push(() => { calIo.disconnect(); clearTimeout(failTimer); clearTimeout(revealTimer); cancelIdle(idleId); if (holder) holder.remove(); });
    }

    // hero typing headline: types each word, pauses, deletes, loops; syncs the audience chips
    document.querySelectorAll('[data-typer]').forEach((typer) => {
      const textEl = typer.querySelector('.typer-text');
      let words = [];
      try { words = JSON.parse(typer.getAttribute('data-typer')); } catch (e) { /* ignore */ }
      if (!textEl || words.length < 2) return;
      const chips = Array.from(document.querySelectorAll('[data-typer-chip]'));
      const setChip = (wi) => chips.forEach((c) => c.classList.toggle('on', c.getAttribute('data-typer-chip') === String(wi)));
      let wi = 0, ci = words[0].length, deleting = false, timer = null;
      const tick = () => {
        const w = words[wi];
        if (!deleting) {
          ci++;
          textEl.textContent = w.slice(0, ci);
          if (ci >= w.length) { deleting = true; timer = setTimeout(tick, 1900); return; }
          timer = setTimeout(tick, 85);
        } else {
          ci--;
          textEl.textContent = w.slice(0, ci);
          if (ci <= 0) { deleting = false; wi = (wi + 1) % words.length; setChip(wi); timer = setTimeout(tick, 280); return; }
          timer = setTimeout(tick, 42);
        }
      };
      if (reduce) {
        // no typing — just swap the word every few seconds
        const iv = setInterval(() => { wi = (wi + 1) % words.length; textEl.textContent = words[wi]; setChip(wi); }, 2600);
        cleanups.push(() => clearInterval(iv));
      } else {
        deleting = true;
        timer = setTimeout(tick, 2200);
        cleanups.push(() => clearTimeout(timer));
      }
    });

    // client stories (homepage): review cards expand on desktop hover or keyboard focus. Swipe /
    // trackpad scroll it natively; the header arrows step one card and disable at either end.
    // Video testimonials open in a modal player; the iframe exists only while it is open.
    const cst = document.querySelector('[data-cst]');
    if (cst) {
      const rail = cst.querySelector('.cst-rail');
      const [prev, next] = cst.querySelectorAll('.cst-arrow');
      const stepSize = () => {
        // Use an unexpanded card so hovering doesn't change the carousel step.
        const cards = Array.from(rail.querySelectorAll('.cst-card'));
        const c = cards.find((x) => !x.matches(':hover') && !x.contains(document.activeElement)) || cards[0];
        return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).columnGap) || 0) : rail.clientWidth;
      };
      const bar = cst.querySelector('.cst-progress span');
      const cur = cst.querySelector('[data-cst-cur]');
      const total = rail.querySelectorAll('.cst-card').length;
      const sync = () => {
        const max = rail.scrollWidth - rail.clientWidth - 2;
        if (prev) prev.disabled = rail.scrollLeft <= 2;
        if (next) next.disabled = rail.scrollLeft >= max;
        // progress track + "03 / 09" counter
        const p = max > 0 ? Math.min(1, Math.max(0, rail.scrollLeft / max)) : 1;
        if (bar) bar.style.transform = `scaleX(${Math.max(p, 1 / Math.max(total, 1))})`;
        if (cur && total) cur.textContent = String(Math.min(total, Math.round(p * (total - 1)) + 1)).padStart(2, '0');
      };
      [prev, next].forEach((b) => b && on(b, 'click', () => rail.scrollBy({ left: Number(b.dataset.dir) * stepSize(), behavior: reduce ? 'auto' : 'smooth' })));
      on(rail, 'scroll', sync, { passive: true });
      on(window, 'resize', sync);
      sync();

      // mouse: click-and-drag scrolls the rail. A plain click still follows links / plays videos;
      // once the pointer has moved past a small threshold it becomes a drag and the click is cancelled.
      let drag = null;
      on(rail, 'pointerdown', (e) => {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        drag = { id: e.pointerId, x: e.clientX, left: rail.scrollLeft, moved: false, v: 0, lx: e.clientX, lt: e.timeStamp };
      });
      on(rail, 'pointermove', (e) => {
        if (!drag || e.pointerId !== drag.id) return;
        const dx = e.clientX - drag.x;
        if (!drag.moved) {
          if (Math.abs(dx) < 6) return;
          drag.moved = true;
          rail.setPointerCapture(e.pointerId); // only now, so plain clicks still reach their target
          rail.classList.add('is-drag');
        }
        rail.scrollLeft = drag.left - dx;
        const dt = e.timeStamp - drag.lt;
        if (dt > 0) { drag.v = (drag.lx - e.clientX) / dt; drag.lx = e.clientX; drag.lt = e.timeStamp; }
      });
      const endDrag = (e) => {
        if (!drag || (e && e.pointerId !== drag.id)) return;
        const { moved, v } = drag;
        drag = null;
        if (!moved) return;
        rail.classList.remove('is-drag'); // snapping comes back on and settles on the nearest card
        // a quick flick carries on a little further, then snaps
        if (!reduce && Math.abs(v) > 0.4) rail.scrollBy({ left: Math.max(-1, Math.min(1, v)) * 420, behavior: 'smooth' });
        const swallow = (ev) => { ev.preventDefault(); ev.stopPropagation(); };
        rail.addEventListener('click', swallow, { capture: true, once: true });
        setTimeout(() => rail.removeEventListener('click', swallow, { capture: true }), 0);
      };
      on(rail, 'pointerup', endDrag);
      on(rail, 'pointercancel', endDrag);
      on(rail, 'lostpointercapture', endDrag);
      on(rail, 'dragstart', (e) => e.preventDefault()); // stop the browser dragging images / links instead

      // poster that fails to load (e.g. a non-Shorts video has no vertical thumbnail) falls back once
      cst.querySelectorAll('img[data-fallback-src]').forEach((img) => on(img, 'error', () => { if (img.src !== img.dataset.fallbackSrc) { img.classList.remove('is-short'); img.src = img.dataset.fallbackSrc; } }));

      const modal = cst.querySelector('.cst-modal');
      const holder = modal && modal.querySelector('.cst-modal-frame');
      let opener = null;
      if (modal && holder && typeof modal.showModal === 'function') {
        const close = () => { if (modal.open) modal.close(); };
        on(modal, 'close', () => { holder.replaceChildren(); if (opener) opener.focus(); opener = null; });
        on(modal.querySelector('.cst-modal-x'), 'click', close);
        on(modal, 'click', (e) => { if (e.target === modal) close(); }); // backdrop
        cst.querySelectorAll('[data-video]').forEach((btn) => on(btn, 'click', () => {
          const id = btn.dataset.video;
          if (!/^[\w-]{11}$/.test(id || '')) return;
          const frame = document.createElement('iframe');
          frame.title = btn.getAttribute('aria-label').replace(/^Watch /, '');
          frame.src = `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1&rel=0`;
          frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen';
          frame.allowFullscreen = true;
          frame.referrerPolicy = 'strict-origin-when-cross-origin';
          holder.replaceChildren(frame);
          modal.classList.toggle('is-wide', btn.hasAttribute('data-wide'));
          opener = btn;
          modal.showModal();
        }));
        cleanups.push(close);
      } else {
        // no <dialog> support: open the video on YouTube instead
        cst.querySelectorAll('[data-video]').forEach((btn) => on(btn, 'click', () => window.open(btn.hasAttribute('data-wide') ? `https://www.youtube.com/watch?v=${btn.dataset.video}` : `https://www.youtube.com/shorts/${btn.dataset.video}`, '_blank', 'noopener')));
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
