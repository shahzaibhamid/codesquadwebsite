// Renders the /services card grid and each /services/<slug> page from lib/services.js, as static
// HTML strings (the same way the other pages are rendered via dangerouslySetInnerHTML).

import { services } from './services';

const CALENDLY = 'https://calendly.com/code_squad/30min';

// Same card as the homepage "What We Do" grid: icon, name, one-liner.
const card = (s) => `<a class="cap reveal" href="/services/${s.slug}"><span class="cap-ic">${s.icon}</span><h3>${s.name}</h3><p>${s.card}</p></a>`;

export function renderServiceGrid() {
  return `<div class="cap-grid">
      ${services.map(card).join('\n      ')}
    </div>`;
}

function proofCard(p) {
  const stats = p.stats
    ? `<div class="num-grid num-grid--3 svx-nums">${p.stats.map((m) => `<div class="metric"><div class="m-val">${m.val}</div><div class="m-lab">${m.lab}</div></div>`).join('')}</div>`
    : '';
  return `<a class="co-case reveal" href="${p.href}">
        <div class="co-case-tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <h3>${p.title}</h3>
        ${stats}<p>${p.text}</p>
        <span class="co-case-link">${p.linkLabel || 'Read case study →'}</span>
      </a>`;
}

const INFO_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8.01"/><line x1="11" y1="12" x2="12" y2="12"/><line x1="12" y1="12" x2="12" y2="16"/></svg>';

export function renderServicePage(s) {
  const stack = s.stack
    ? `<span class="svx-label">Built with</span><div class="svx-stack">${s.stack.map((t) => `<span class="svx-pill">${t}</span>`).join('')}</div>`
    : '';
  const note = s.note ? `<p class="plan-note">${INFO_ICON}<span>${s.note}</span></p>` : '';
  const steps = s.steps
    ? `<span class="svx-label reveal">How we build</span>
    <div class="svx-steps">${s.steps.map((st, i) => `<div class="svx-step reveal"><span class="jstep">Step 0${i + 1}</span><h4>${st.title}</h4><p>${st.text}</p></div>`).join('')}</div>`
    : '';
  const explainer = s.explainer
    ? `<span class="svx-label reveal">${s.explainer.label}</span>
    <div class="adapt svx-explain">${s.explainer.items.map((e) => `<div class="a reveal"><div class="ai">${e.icon}</div><h3>${e.title}</h3><p>${e.text}</p></div>`).join('')}</div>
    <p class="svx-note reveal">${s.explainer.note} <a href="${s.explainer.link.href}">${s.explainer.link.label}</a></p>`
    : '';
  const proof = s.proof.length
    ? `<span class="svx-label reveal">Related work</span>
    <div class="co-cases${s.proof.length === 3 ? ' co-cases--3' : ''}">${s.proof.map(proofCard).join('')}</div>`
    : '';
  const others = services.filter((o) => o.slug !== s.slug);

  return `<span id="top"></span>

<section class="co-hero">
  <div class="co-hero-bg" aria-hidden="true"></div>
  <div class="wrap co-hero-inner">
    <span class="eyebrow co-hero-eyebrow reveal">Services</span>
    <h1 class="co-h1 reveal">${s.name}</h1>
    <p class="co-sub reveal">${s.sub}</p>
    <div class="co-herocta reveal">
      <a href="${CALENDLY}" target="_blank" rel="noopener" class="btn btn-blue">Book a Free Call →</a>
      <a href="/services" class="btn btn-outline-light">All services</a>
    </div>
  </div>
</section>

<section class="sec" id="details">
  <div class="wrap">
    <div class="svx-intro">
      <div class="sec-head reveal">
        <span class="eyebrow">${s.name}</span>
        <h2 class="display">What's included.</h2>
      </div>
      <div class="svx-panel reveal">
        <ul class="case-points">${s.offerings.map((o) => `<li>${o}</li>`).join('')}</ul>
        ${stack}${note}
      </div>
    </div>
    ${steps}
    ${explainer}
    ${proof}
  </div>
</section>

<section class="sec creambg" id="more-services">
  <div class="wrap">
    <div class="sec-head reveal"><span class="eyebrow">More Services</span><h2 class="display">One team. Every system your growth needs.</h2></div>
    <div class="cap-grid">${others.map(card).join('')}</div>
  </div>
</section>

<section class="cs-ready" id="contact">
  <div class="cs-container cs-ready__inner reveal">
    <h2>Ready to build?</h2>
    <p>Tell us where it hurts — manual operations, invisible marketing, or software that can't keep up. We'll map the fastest path forward on a free 30-minute call.</p>
    <div class="cs-ready__actions">
      <a class="cs-btn cs-btn--primary" href="${CALENDLY}" target="_blank" rel="noopener noreferrer">Book a Free Call</a>
      <a class="cs-btn cs-btn--ghost" href="/services">All services</a>
    </div>
    <div class="cs-ready__meta">Serving clients across the US, Canada, UK &amp; UAE &nbsp;·&nbsp; Team in Lahore, Pakistan &nbsp;·&nbsp; +1 (307) 396-4945</div>
  </div>
</section>`;
}
