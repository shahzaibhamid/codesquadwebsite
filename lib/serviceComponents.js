// Reusable section components for the /services/<slug> template. Each takes a props object (all
// copy comes from the per-page content in lib/services.js — nothing is hardcoded here) and returns
// an HTML string, the same way the rest of the site renders. A component that has no data returns ''.
//
// Optional per-service fields these read (all optional, see renderServicePage in servicePage.js):
//   hero: { eyebrow, secondary: { label, href }, visual: { src, alt } | { html }, chips: [{ val, label }] }
//   problems: { label, heading, items: [{ icon, title, text }] }
//   offerings: [string | { title, text, icon }]
//   outcomes: { label, heading, items: [{ val, label, text }] }   // val => count-up, no val => plain text
//   showcase: { label, heading, caption, kind, src, alt }          // no src => labelled placeholder frame
//   midCta: { heading, text, label }
//   testimonial: { quote, name, company, role }
//   faq: { label, heading, items: [{ q, a }] }
//   proof: [{ client|title, industry|tags, metric, result|text, href, linkLabel }]

import { ICONS } from './services';

export const CALENDLY = 'https://calendly.com/code_squad/30min';

// Staggered children get data-i; Scripts.js turns it into an 80ms-per-step transition delay.
const stag = (i) => ` data-i="${i % 6}"`;
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export function ServiceHero({ eyebrow = 'Services', title, sub, primary, secondary, visual, chips }) {
  const hasVisual = !!(visual && (visual.src || visual.html));
  const vis = hasVisual
    ? `<div class="svc-hero-visual hero-in" style="--d:400ms">${visual.html || `<img src="${visual.src}" alt="${attr(visual.alt || '')}" loading="eager" decoding="async">`}</div>`
    : '';
  const chipRow = chips && chips.length
    ? `<div class="co-chips hero-in" style="--d:300ms">${chips.map((c) => `<span class="co-chip">${c.val ? `<b${c.count ? ' class="m-val"' : ''}>${c.val}</b> ` : ''}${c.label}</span>`).join('')}</div>`
    : '';
  const ext = (h) => (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : '');
  return `<section class="co-hero svc-hero${hasVisual ? ' svc-hero--split' : ''}">
  <div class="co-hero-bg" aria-hidden="true"></div>
  <div class="wrap co-hero-inner svc-hero-grid">
    <div class="svc-hero-copy">
      <span class="eyebrow co-hero-eyebrow hero-in" style="--d:0ms">${eyebrow}</span>
      <h1 class="co-h1 hero-in" style="--d:100ms">${title}</h1>
      <p class="co-sub hero-in" style="--d:200ms">${sub}</p>
      ${chipRow}
      <div class="co-herocta hero-in" style="--d:${chipRow ? 400 : 300}ms">
        <a href="${primary.href}"${ext(primary.href)} class="btn btn-blue">${primary.label}</a>
        <a href="${secondary.href}"${ext(secondary.href)} class="btn btn-outline-light">${secondary.label}</a>
      </div>
    </div>
    ${vis}
  </div>
</section>`;
}

const head = (label, heading, center) => `<div class="sec-head${center ? ' center' : ''} reveal">
        ${label ? `<span class="eyebrow">${label}</span>` : ''}
        <h2 class="display">${heading}</h2>
      </div>`;

// Also used for use-case scenario cards (same icon + title + line card).
export function ProblemSection(p) {
  if (!p || !p.items || !p.items.length) return '';
  return `${head(p.label, p.heading)}
      <div class="svc-cards svc-cards--3">${p.items.map((it, i) => `<div class="svc-card reveal"${stag(i)}><span class="svc-ic">${it.icon || ICONS.bolt}</span><h3>${it.title}</h3><p>${it.text}</p></div>`).join('')}</div>`;
}

// strings (the existing checklist) still work: they become a title-only card.
// Items carrying a `group` are rendered under sub-heads (h3), in order of first appearance, with card titles as h4.
export function IncludedGrid({ label, heading, items }) {
  const card = (raw, i, h) => {
    const it = typeof raw === 'string' ? { title: raw } : raw;
    return `<div class="svc-card svc-card--inc reveal"${stag(i)}><span class="svc-ic">${it.icon || ICONS.grid}</span><div><${h}>${it.title}</${h}>${it.text ? `<p>${it.text}</p>` : ''}</div></div>`;
  };
  if (items.some((it) => it && it.group)) {
    const groups = [];
    items.forEach((it) => {
      let g = groups.find((x) => x.name === it.group);
      if (!g) groups.push((g = { name: it.group, items: [] }));
      g.items.push(it);
    });
    return `${head(label, heading)}
      ${groups.map((g) => `<div class="svc-group"><h3 class="svc-group-h reveal">${g.name}</h3><div class="svc-cards svc-cards--${Math.min(g.items.length, 3)}${g.items.every((it) => it.lg) ? ' svc-cards--lg' : ''}">${g.items.map((it, i) => card(it, i, 'h4')).join('')}</div></div>`).join('')}`;
  }
  return `${head(label, heading)}
      <div class="svc-cards svc-cards--2">${items.map((raw, i) => card(raw, i, 'h3')).join('')}</div>`;
}

// Numeric `val` goes through the site's .m-val count-up (Scripts.js); no val => plain text block.
export function OutcomeStrip(o) {
  if (!o || !o.items || !o.items.length) return '';
  const n = o.items.length;
  return `<section class="metrics-band" id="outcomes">
  <div class="wrap">
    ${head(o.label, o.heading, true).replace('class="sec-head center reveal"', 'class="sec-head center reveal" style="margin:0 auto"')}
    <div class="num-grid svc-outcomes svc-outcomes--${n > 3 ? 4 : n}">${o.items.map((it, i) => it.val
      ? `<div class="metric reveal"${stag(i)}><div class="m-val">${it.val}</div><div class="m-lab">${it.label}</div></div>`
      : `<div class="metric metric--text reveal"${stag(i)}><div class="m-text">${it.label}</div>${it.text ? `<div class="m-lab">${it.text}</div>` : ''}</div>`).join('')}</div>
  </div>
</section>`;
}

export function ProcessSteps({ label, steps }) {
  if (!steps || !steps.length) return '';
  return `<span class="svx-label reveal">${label}</span>
    <ol class="svc-steps" data-lit style="--n:${steps.length}">${steps.map((st, i) => `<li class="svc-step" style="--i:${i}"><span class="jstep">Step 0${i + 1}</span>${st.phase ? `<span class="svc-phase">${st.phase}</span>` : ''}<h3>${st.title}</h3><p>${st.text}</p></li>`).join('')}</ol>`;
}

export function VisualShowcase(v) {
  if (!v) return '';
  const frame = v.src
    ? `<img src="${v.src}" alt="${attr(v.alt || '')}" loading="lazy" decoding="async">`
    : `<div class="svc-ph" role="img" aria-label="${attr(v.label || v.heading || 'Visual')}"><div class="svc-ph-bar" aria-hidden="true"><i></i><i></i><i></i></div><div class="svc-ph-body" aria-hidden="true"><b></b><b></b><b></b><b></b></div><span class="svc-ph-tag">${v.kind || v.label || ''}</span></div>`;
  return `${v.heading ? head(v.label, v.heading) : ''}
      <figure class="svc-show svc-show--scale reveal">${frame}${v.caption ? `<figcaption>${v.caption}</figcaption>` : ''}</figure>`;
}

// Same markup + global handler as the /services hub FAQ (Scripts.js adds aria-expanded/controls).
export function ServiceFAQ(f) {
  if (!f || !f.items || !f.items.length) return '';
  return `${head(f.label, f.heading, true)}
      <div class="faq-list reveal">${f.items.map((it) => `<div class="faq"><button type="button"><span>${it.q}</span><span class="ico" aria-hidden="true">+</span></button><div class="ans"><p>${it.a}</p></div></div>`).join('')}</div>`;
}

// Renders nothing unless real testimonial data is passed.
export function TestimonialBlock(t) {
  if (!t || !t.quote || !t.name) return '';
  const who = [t.role, t.company].filter(Boolean).join(', ');
  return `<figure class="svc-quote reveal"><blockquote>${t.quote}</blockquote><figcaption><b>${t.name}</b>${who ? `<span>${who}</span>` : ''}</figcaption></figure>`;
}

export function MidPageCTA(c) {
  if (!c) return '';
  return `<div class="svc-mid reveal">
      <div><h2>${c.heading}</h2>${c.text ? `<p>${c.text}</p>` : ''}</div>
      <a class="btn btn-blue" href="${CALENDLY}" target="_blank" rel="noopener">${c.label}</a>
    </div>`;
}

function proofCard(p, i) {
  const tags = p.tags || (p.industry ? [p.industry] : []);
  const stats = p.stats
    ? `<div class="num-grid num-grid--3 svx-nums">${p.stats.map((m) => `<div class="metric"><div class="m-val">${m.val}</div><div class="m-lab">${m.lab}</div></div>`).join('')}</div>`
    : '';
  const metric = p.metric ? `<p class="co-case-metric">${p.metric}</p>` : '';
  return `<a class="co-case reveal" href="${p.href}"${stag(i)}>
        <div class="co-case-tags">${tags.map((t) => `<span>${t}</span>`).join('')}</div>
        <h3>${p.client || p.title}</h3>
        ${metric}${stats}<p>${p.result || p.text}</p>
        <span class="co-case-link">${p.linkLabel || 'Read case study →'}</span>
      </a>`;
}

export function RelatedWork({ label = 'Related work', items }) {
  if (!items || !items.length) return '';
  return `<span class="svx-label reveal">${label}</span>
    <div class="co-cases${items.length === 3 ? ' co-cases--3' : ''}">${items.map(proofCard).join('')}</div>`;
}

// ---- JSON-LD slots -------------------------------------------------------------------------
const plain = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&#39;|&rsquo;/g, "'").replace(/\s+/g, ' ').trim();
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

export function ServiceSchema(s, url) {
  return ld({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: plain(s.title),
    description: plain(s.sub),
    url,
    serviceType: plain(s.title),
    provider: { '@type': 'Organization', name: 'CodeSquad', url: 'https://www.codesquad.ai' },
    ...(s.schema || {})
  });
}

export function FAQSchema(f) {
  if (!f || !f.items || !f.items.length) return '';
  return ld({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: f.items.map((it) => ({ '@type': 'Question', name: plain(it.q), acceptedAnswer: { '@type': 'Answer', text: plain(it.a) } }))
  });
}

// ---- extra components used by the AI agents & automation page ------------------------------

// Two-column contrast. The columns slide in from opposite sides (CSS: .svc-ba-l / .svc-ba-r).
export function BeforeAfter(b) {
  if (!b || !b.before || !b.after) return '';
  const col = (c, cls, side) => `<div class="svc-ba-col ${cls} ${side} reveal"><h3>${c.title}</h3><ul>${c.items.map((it) => `<li>${it}</li>`).join('')}</ul></div>`;
  return `${head(b.label, b.heading)}
      <div class="svc-ba">${col(b.before, 'svc-ba--before', 'svc-ba-l')}<span class="svc-ba-arrow" aria-hidden="true">→</span>${col(b.after, 'svc-ba--after', 'svc-ba-r')}</div>`;
}

// Trigger → agent → tools → outcome chain built from CSS only. Nodes light up in sequence once
// when it scrolls into view ([data-lit] in Scripts.js adds .lit; delays come from --i / --base).
export function WorkflowVisual({ nodes, label, base = 0 }) {
  if (!nodes || !nodes.length) return '';
  return `<div class="svc-wf" data-lit style="--base:${base}ms" role="img" aria-label="${attr(label || nodes.map((n) => n.title).join(' → '))}">${nodes.map((n, i) => `${i ? '<span class="wf-link" style="--i:${i}" aria-hidden="true"></span>' : ''}<div class="wf-node" style="--i:${i}"><span class="wf-ic">${n.icon || ICONS.bolt}</span><div><b>${n.title}</b>${n.text ? `<span>${n.text}</span>` : ''}</div></div>`).join('')}</div>`;
}

// Short note tying a service to the hub's Build (one-time) / Grow (monthly) model; copy comes from the page data.
export function Engagement(e) {
  if (!e) return '';
  return `<div class="svc-engage reveal">
      <div><span class="eyebrow">${e.label}</span><h2 class="display">${e.heading}</h2><p>${e.text}</p></div>
      <a class="btn btn-ghost" href="${e.link.href}">${e.link.label}</a>
    </div>`;
}

export function BuiltWith({ label, items }) {
  if (!items || !items.length) return '';
  return `<div class="svc-built reveal"><span class="svx-label">${label}</span><div class="svx-stack">${items.map((t) => `<span class="svx-pill">${t}</span>`).join('')}</div></div>`;
}

// Pipeline mock built from CSS: columns populate left to right once ([data-lit] -> .lit). Card tags come from page data.
export function PipelineMock({ columns, label, base = 0 } = {}) {
  if (!columns || !columns.length) return '';
  return `<div class="svc-pipe" data-lit style="--base:${base}ms" role="img" aria-label="${attr(label || columns.map((c) => c.title).join(' → '))}">${columns.map((c, ci) => `<div class="pc-col" style="--c:${ci}"><div class="pc-h">${c.title}</div>${c.cards.map((tag, r) => `<div class="pc-card" style="--r:${r}"><span class="pc-tag">${tag}</span><i></i><i></i></div>`).join('')}</div>`).join('')}</div>`;
}

// Sources -> CRM -> Dashboard row; nodes then connectors fade in one after another once.
export function FlowDiagram({ label, heading, nodes } = {}) {
  if (!nodes || !nodes.length) return '';
  return `${head(label, heading)}
      <div class="svc-flow svc-flow--${nodes.length}" data-lit>${nodes.map((n, i) => `${i ? `<span class="fl-link" style="--i:${i}" aria-hidden="true">→</span>` : ''}<div class="fl-node" style="--i:${i}"><span class="svc-ic">${n.icon || ICONS.grid}</span><h3>${n.title}</h3>${n.chips ? `<div class="fl-chips">${n.chips.map((c) => `<span class="svx-pill">${c}</span>`).join('')}</div>` : ''}${n.text ? `<p>${n.text}</p>` : ''}</div>`).join('')}</div>`;
}

// Dashboard mock for the hero slot: labelled tiles + decorative bars (no figures). Bars grow once (.lit).
export function DashboardMock({ tiles, trace, label, base = 0 } = {}) {
  if (!tiles || !tiles.length) return '';
  return `<div class="svc-dash" data-lit style="--base:${base}ms" role="img" aria-label="${attr(label || tiles.join(', '))}">
    <div class="sd-tiles">${tiles.map((t, i) => `<div class="sd-tile" style="--i:${i}"><span>${t}</span><i></i></div>`).join('')}</div>
    <div class="sd-chart" aria-hidden="true">${[46, 62, 38, 74, 56, 88, 70].map((h, i) => `<b style="--h:${h}%;--i:${i}"></b>`).join('')}</div>
    ${trace ? `<div class="sd-trace">${trace.map((t) => `<span class="pc-tag">${t}</span>`).join('<em aria-hidden="true">→</em>')}</div>` : ''}
  </div>`;
}

// Tabbed comparison (reuses the site's .ptabs/.ptab pattern + the [data-tabs] handler in Scripts.js) with a summary table.
// Every panel is in the server-rendered HTML; the note and link sit outside the tabs so they are never hidden.
export function TabbedExplainer(e) {
  if (!e || !e.items || !e.items.length) return '';
  const id = (i) => e.tabs[i].toLowerCase();
  const tabs = e.items.map((it, i) => `<button type="button" role="tab" class="ptab${i ? '' : ' on'}" id="tab-explain-${id(i)}" aria-controls="explain-${id(i)}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${e.tabs[i]}</button>`).join('');
  const panels = e.items.map((it, i) => `<div class="svc-tabpanel${i ? '' : ' is-active'}" role="tabpanel" id="explain-${id(i)}" aria-labelledby="tab-explain-${id(i)}" tabindex="0"><div class="svc-tab-ic">${it.icon}</div><div><h3>${it.title}</h3><p>${it.text}</p></div></div>`).join('');
  const cols = e.columns;
  const table = e.rows ? `<table class="svc-cmp"><thead><tr><th scope="col"><span class="sr-only">Approach</span></th>${cols.map((c) => `<th scope="col">${c}</th>`).join('')}</tr></thead><tbody>${e.rows.map((r, i) => `<tr class="reveal"${stag(i)}><th scope="row">${r.name}</th>${r.cells.map((cell, k) => `<td data-label="${attr(cols[k])}">${cell}</td>`).join('')}</tr>`).join('')}</tbody></table>` : '';
  return `${head(null, e.label)}
      <div class="ptabs svc-tabs" role="tablist" aria-label="${attr(e.label)}" data-tabs>${tabs}</div>
      <div class="svc-tabpanels reveal">${panels}</div>
      ${table}
      <p class="svx-note reveal">${e.note} <a href="${e.link.href}">${e.link.label}</a></p>`;
}
