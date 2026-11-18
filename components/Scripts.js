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

    // "What We Do" growth engine: 4s autoplay showcase on desktop (pauses on keyboard focus / off-screen /
    // hidden tab); below 1024px or with reduced motion the stacked cards + sticky pill bar are used instead.
    const eng = document.getElementById('capabilities');
    if (eng && eng.classList.contains('eng')) {
      const INTERVAL = 4000;
      const q = (sel) => Array.from(eng.querySelectorAll(sel));
      const nodes = q('.eng-node'), tps = q('.eng-tpanel'), vps = q('.eng-vpanel');
      const N = nodes.length;
      const rail = eng.querySelector('.eng-rail'), desk = eng.querySelector('.eng-desk');
      const count = eng.querySelector('.eng-count'), status = eng.querySelector('.eng-status');
      const names = tps.map((p) => p.querySelector('h3').textContent);
      const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
      const stackMq = window.matchMedia('(max-width: 1023px), (prefers-reduced-motion: reduce)');
      let active = 0, timer = 0, focused = false, inView = false, wasPaused = true;

      // Step 02 + marketing-intelligence visuals: their timed sequence (.is-playing) runs only while its stage is the active one and in view;
      // leaving the stage resets it, and it freezes (.is-held) whenever the autoplay itself is paused.
      const seo = q('.g2, .mi, .cv');
      const seoSeen = new Set();
      const seoIo = new IntersectionObserver((es) => { es.forEach((e) => { if (e.isIntersecting) seoSeen.add(e.target); else seoSeen.delete(e.target); }); seoSync(); }, { threshold: 0.4 });
      seo.forEach((g) => seoIo.observe(g));
      function seoSync() {
        seo.forEach((g) => {
          const host = g.closest('.eng-vpanel, .eng-scard');
          const on = !!host && (host.classList.contains('is-active') || host.classList.contains('is-on')) && g.offsetParent !== null && (stackMq.matches ? seoSeen.has(g) : inView) && !reduceMq.matches;
          g.classList.toggle('is-playing', on);
          g.classList.toggle('is-held', on && !stackMq.matches && wasPaused);
        });
      }

      const paused = () => focused || !inView || document.hidden || stackMq.matches;
      const schedule = () => {
        clearTimeout(timer);
        wasPaused = paused();
        eng.classList.toggle('is-paused', wasPaused);
        if (!wasPaused) timer = setTimeout(() => goTo(active + 1, true), INTERVAL);
        seoSync();
      };
      const sync = () => { if (paused() !== wasPaused) schedule(); };

      function goTo(i, auto) {
        active = (i + N) % N;
        nodes.forEach((n, k) => {
          n.classList.toggle('is-active', k === active);
          n.classList.toggle('is-done', k < active);
          n.tabIndex = k === active ? 0 : -1;
          if (k === active) n.setAttribute('aria-current', 'true'); else n.removeAttribute('aria-current');
        });
        tps.forEach((p, k) => p.classList.toggle('is-active', k === active));
        vps.forEach((p, k) => p.classList.toggle('is-active', k === active));
        rail.style.setProperty('--p', String(active / (N - 1)));
        count.textContent = '0' + (active + 1) + ' / 0' + N;
        status.textContent = (active + 1) + ' of ' + N + ': ' + names[active];
        schedule();
      }

      nodes.forEach((n, k) => on(n, 'click', () => goTo(k)));
      on(document.getElementById('engPrev'), 'click', () => goTo(active - 1));
      on(document.getElementById('engNext'), 'click', () => goTo(active + 1));
      on(rail, 'keydown', (e) => {
        const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
        if (move) { e.preventDefault(); goTo(active + move); nodes[active].focus(); }
        else if (e.key === 'Home') { e.preventDefault(); goTo(0); nodes[0].focus(); }
        else if (e.key === 'End') { e.preventDefault(); goTo(N - 1); nodes[N - 1].focus(); }
      });
      // only keyboard focus pauses; a mouse click on a node keeps the 4s timer running (restarted by goTo)
      on(eng, 'focusin', (e) => { focused = !!(e.target.matches && e.target.matches(':focus-visible')); sync(); });
      on(eng, 'focusout', (e) => { if (!eng.contains(e.relatedTarget)) { focused = false; sync(); } });
      on(document, 'visibilitychange', sync);
      if (stackMq.addEventListener) { stackMq.addEventListener('change', sync); cleanups.push(() => stackMq.removeEventListener('change', sync)); }

      const vio = new IntersectionObserver((es) => {
        inView = es[0].isIntersecting;
        eng.classList.toggle('is-visible', inView);
        sync();
        seoSync();
      }, { threshold: 0.2 });
      vio.observe(eng);

      // stacked mode. Below 1024px the cards sit in a horizontal swipe carousel: pills are tabs, the card
      // snapped into view is active, and pills/arrows scroll the row only (the page never jumps).
      // At >=1024px with reduced motion the cards are a 2-col grid instead: pills scroll the page to a card.
      const pills = q('.eng-pill'), scards = q('.eng-scard'), pbar = eng.querySelector('.eng-pbar i');
      const srow = eng.querySelector('.eng-scards'), scount = eng.querySelector('.eng-scount');
      const carMq = window.matchMedia('(max-width: 1023px)');
      let sActive = 0, sRaf = 0;
      // carousel: the row takes the active card's height, so shorter cards don't sit above an empty gap
      const fitRow = () => { srow.style.height = carMq.matches ? scards[sActive].offsetHeight + 'px' : ''; };
      const ro = window.ResizeObserver ? new ResizeObserver(fitRow) : null;
      if (ro) scards.forEach((c) => ro.observe(c));
      if (carMq.addEventListener) { carMq.addEventListener('change', fitRow); cleanups.push(() => carMq.removeEventListener('change', fitRow)); }
      const setStack = (i) => {
        if (i < 0 || i >= scards.length) return;
        sActive = i;
        fitRow();
        pills.forEach((p, k) => {
          p.classList.toggle('is-active', k === i);
          p.setAttribute('aria-selected', k === i ? 'true' : 'false');
          p.tabIndex = k === i ? 0 : -1;
        });
        scards.forEach((c, k) => c.classList.toggle('is-on', k === i));
        seoSync();
        if (pbar) pbar.style.transform = 'scaleX(' + ((i + 1) / scards.length) + ')';
        if (scount) scount.textContent = '0' + (i + 1) + ' / 0' + scards.length;
        if (pills[i]) { const prow = pills[i].parentNode; prow.scrollTo({ left: pills[i].offsetLeft - 24, behavior: 'auto' }); }
      };
      const showCard = (i) => {
        const k = Math.max(0, Math.min(scards.length - 1, i));
        if (carMq.matches) {
          srow.scrollTo({ left: scards[k].offsetLeft - (srow.clientWidth - scards[k].offsetWidth) / 2, behavior: reduceMq.matches ? 'auto' : 'smooth' });
          setStack(k);
        } else {
          scards[k].scrollIntoView({ block: 'center', behavior: reduceMq.matches ? 'auto' : 'smooth' });
        }
      };
      pills.forEach((p, k) => on(p, 'click', () => showCard(k)));
      on(pills[0].parentNode, 'keydown', (e) => {
        const move = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        let k = -1;
        if (move) k = (sActive + move + pills.length) % pills.length;
        else if (e.key === 'Home') k = 0;
        else if (e.key === 'End') k = pills.length - 1;
        if (k < 0) return;
        e.preventDefault(); showCard(k); setStack(k); pills[k].focus();
      });
      const sPrev = document.getElementById('engSPrev'), sNext = document.getElementById('engSNext');
      if (sPrev) on(sPrev, 'click', () => showCard(sActive - 1));
      if (sNext) on(sNext, 'click', () => showCard(sActive + 1));
      // carousel: the card whose centre is closest to the row's centre is active (covers swipes and programmatic scrolls)
      on(srow, 'scroll', () => {
        if (!carMq.matches || sRaf) return;
        sRaf = requestAnimationFrame(() => {
          sRaf = 0;
          const mid = srow.scrollLeft + srow.clientWidth / 2;
          let best = 0, bestD = Infinity;
          scards.forEach((c, k) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bestD) { bestD = d; best = k; } });
          if (best !== sActive) setStack(best);
        });
      });
      // grid mode: the card in the middle of the viewport is active
      const sio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !carMq.matches) setStack(scards.indexOf(e.target)); }), { rootMargin: '-35% 0px -35% 0px' });
      scards.forEach((c) => sio.observe(c));
      fitRow();
      cleanups.push(() => { clearTimeout(timer); cancelAnimationFrame(sRaf); if (ro) ro.disconnect(); vio.disconnect(); sio.disconnect(); seoIo.disconnect(); });
      schedule();
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

    // client stories (homepage): rail of wide client cards (they widen on hover via CSS). Swipe /
    // trackpad scroll it natively; the header arrows step one card and disable at either end.
    // Video testimonials open in a modal player; the iframe exists only while it is open.
    const cst = document.querySelector('[data-cst]');
    if (cst) {
      const rail = cst.querySelector('.cst-rail');
      const [prev, next] = cst.querySelectorAll('.cst-arrow');
      const stepSize = () => {
        // measure a card at rest: a hovered / focused card is temporarily wider
        const cards = Array.from(rail.querySelectorAll('.cst-card'));
        const c = cards.find((x) => !x.matches(':hover') && !x.contains(document.activeElement)) || cards[0];
        return c ? c.getBoundingClientRect().width + (parseFloat(getComputedStyle(rail).columnGap) || 0) : rail.clientWidth;
      };
      const sync = () => {
        const max = rail.scrollWidth - rail.clientWidth - 2;
        if (prev) prev.disabled = rail.scrollLeft <= 2;
        if (next) next.disabled = rail.scrollLeft >= max;
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
          opener = btn;
          modal.showModal();
        }));
        cleanups.push(close);
      } else {
        // no <dialog> support: open the video on YouTube instead
        cst.querySelectorAll('[data-video]').forEach((btn) => on(btn, 'click', () => window.open(`https://www.youtube.com/shorts/${btn.dataset.video}`, '_blank', 'noopener')));
      }
    }

    return () => cleanups.forEach((fn) => fn());
  }, [pathname]);

  return null;
}
