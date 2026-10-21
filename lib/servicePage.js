// Renders the /services card grid and each /services/<slug> page from lib/services.js, as static
// HTML strings (the same way the other pages are rendered via dangerouslySetInnerHTML).

import { services } from './services';
import { CALENDLY, ServiceHero, ProblemSection, IncludedGrid, OutcomeStrip, ProcessSteps, VisualShowcase, ServiceFAQ, TestimonialBlock, MidPageCTA, RelatedWork, BeforeAfter, WorkflowVisual, BuiltWith, Engagement, TabbedExplainer, DashboardMock, PipelineMock, FlowDiagram, ServiceSchema, FAQSchema } from './serviceComponents';

// Same card as the homepage "What We Do" grid: icon, name, one-liner.
const card = (s) => `<a class="cap reveal" href="/services/${s.slug}"><span class="cap-ic">${s.icon}</span><h3>${s.name}</h3><p>${s.card}</p></a>`;

const INFO_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="8.01"/><line x1="11" y1="12" x2="12" y2="12"/><line x1="12" y1="12" x2="12" y2="16"/></svg>';

export function renderServicePage(s) {
  const stackItems = s.stackSection ? null : s.stack;
  const stack = stackItems
    ? `<span class="svx-label">Built with</span><div class="svx-stack">${stackItems.map((t) => `<span class="svx-pill">${t}</span>`).join('')}</div>`
    : '';
  const note = s.note ? `<p class="plan-note">${INFO_ICON}<span>${s.note}</span></p>` : '';
  const explainer = TabbedExplainer(s.explainer);
  const others = services.filter((o) => o.slug !== s.slug);
  const hero = s.hero || {};

  // Light sections alternate white / tint automatically, whatever subset of sections a page has.
  // Dark sections (hero, outcome strip, final CTA) sit outside the alternation.
  let tint = false;
  const sec = (id, inner, force) => {
    if (!inner.trim()) return '';
    const useTint = force === 'tint' ? true : tint;
    const cls = useTint ? 'sec creambg' : 'sec';
    tint = !useTint;
    return `<section class="${cls}"${id ? ` id="${id}"` : ''}>
  <div class="wrap">
    ${inner}
  </div>
</section>`;
  };

  const midCta = s.midCta ? `<section class="sec sec--slim"><div class="wrap">${MidPageCTA(s.midCta)}</div></section>` : '';
  const included = IncludedGrid({ label: s.name, heading: s.includedHeading || "What's included.", items: s.offerings });
  const noteCard = s.noteSection ? `<div class="svc-note reveal">${note}</div>` : '';
  const panelExtras = stack || (note && !s.noteSection) ? `<div class="svx-panel reveal">${stack}${s.noteSection ? '' : note}</div>` : '';

  return [
    '<span id="top"></span>',
    ServiceSchema(s, `https://www.codesquad.ai/services/${s.slug}`),
    FAQSchema(s.faq),
    ServiceHero({
      eyebrow: hero.eyebrow,
      title: hero.title || s.name,
      sub: hero.sub || s.sub,
      primary: { label: 'Book a Free Call →', href: CALENDLY },
      secondary: hero.secondary || { label: "See what's included", href: '#details' },
      visual: hero.workflow ? { html: WorkflowVisual({ ...hero.workflow, base: 900 }) } : hero.pipeline ? { html: PipelineMock({ ...hero.pipeline, base: 900 }) } : hero.dashboard ? { html: DashboardMock({ ...hero.dashboard, base: 900 }) } : hero.visual,
      chips: hero.chips
    }),
    sec('problems', ProblemSection(s.problems)),
    sec('contrast', BeforeAfter(s.beforeAfter)),
    sec('how', explainer, 'tint'),
    sec('details', included + panelExtras),
    s.midCta && s.midCtaAfter !== 'flow' ? midCta : '',
    sec('use-cases', ProblemSection(s.useCases)),
    sec('flow', FlowDiagram(s.flow)),
    s.midCta && s.midCtaAfter === 'flow' ? midCta : '',
    sec('pricing', noteCard),
    sec('showcase', VisualShowcase(s.showcase)),
    s.stackSection ? sec('built-with', BuiltWith({ label: 'Built with', items: s.stack })) : '',
    OutcomeStrip(s.outcomes),
    sec('process', ProcessSteps({ label: s.processLabel || 'How we build', steps: s.steps })),
    sec('engagement', Engagement(s.engagement)),
    sec('testimonial', TestimonialBlock(s.testimonial)),
    sec('work', RelatedWork({ items: s.proof }) + RelatedWork({ label: 'Learn — articles', items: s.articles })),
    sec('faq', ServiceFAQ(s.faq)),
    `<section class="sec${tint ? ' creambg' : ''}" id="more-services">
  <div class="wrap">
    <div class="sec-head reveal"><span class="eyebrow">More Services</span><h2 class="display">One team. Every system your growth needs.</h2></div>
    <div class="cap-grid">${others.map(card).join('')}</div>
  </div>
</section>`,
    `<section class="cs-ready${tint ? '' : ' svc-cta-tint'}" id="contact">
  <div class="cs-container cs-ready__inner reveal">
    <h2>Ready to build?</h2>
    <p>Tell us where it hurts — manual operations, invisible marketing, or software that can't keep up. We'll map the fastest path forward on a free 30-minute call.</p>
    <div class="cs-ready__actions">
      <a class="cs-btn cs-btn--primary" href="${CALENDLY}" target="_blank" rel="noopener noreferrer">Book a Free Call</a>
      <a class="cs-btn cs-btn--ghost" href="/case-studies">View case studies</a>
    </div>
    <div class="cs-ready__meta">Serving clients across the US, Canada, UK &amp; UAE &nbsp;·&nbsp; Team in Lahore, Pakistan &nbsp;·&nbsp; +1 (307) 396-4945</div>
  </div>
</section>`
  ].join('\n\n');
}
