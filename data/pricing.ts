/** Offers page content. One universal offer built from three modules —
 *  Attract, Respond, Recover — sold as three depth tiers. No industry split:
 *  every tier lists the same three module names, each deeper than the one
 *  below it. */

export const pricingHero = {
  eyebrow: 'Offers',
  title: 'Simple offers. Real growth.',
  sub: 'Three modules — Attract, Respond, Recover — priced as one monthly plan that gets deeper at every tier. Ad platform costs are never included — billed directly by Google/Meta, separate from your monthly plan.',
};

/** The three modules shown as cards above pricing. Every tier below sells
 *  a deeper version of these same three jobs — never a different list. */
export interface OfferModule {
  key: 'attract' | 'respond' | 'recover';
  name: string;
  tagline: string;
  points: string[];
}

export const offerModules: OfferModule[] = [
  {
    key: 'attract',
    name: 'Attract',
    tagline: 'Get found by people already looking for you.',
    points: ['Local SEO', 'Google Business Profile', 'Website upkeep', 'Google + Meta ads', 'Content'],
  },
  {
    key: 'respond',
    name: 'Respond',
    tagline: 'Every enquiry answered fast, so nobody books elsewhere.',
    points: ['Instant SMS + email reply', 'Staff alerts', 'Lead captured to CRM'],
  },
  {
    key: 'recover',
    name: 'Recover',
    tagline: 'Nobody who enquires gets forgotten.',
    points: ['14-day / 5-touch follow-up for non-bookers', 'Past-customer reactivation', 'Rebooking reminders timed to service cycles'],
  },
];

export interface PricingTier {
  key: 'essential' | 'growth' | 'scale';
  name: string;
  price: string;
  badge?: string;
  tagline: string;
  includesNote?: string;
  /** Max 5 — the rest of the depth lives in the comparison table. */
  bullets: string[];
  scopeNote?: string;
}

export const pricingTiers: PricingTier[] = [
  {
    key: 'essential',
    name: 'Essential',
    price: '$700/mo',
    tagline: 'Get found, and stop missing enquiries.',
    bullets: [
      'Attract (starter) — local SEO, Google Business Profile optimisation, maintenance of your existing website',
      'Respond (basic) — SMS + email reply during business hours',
      'Live dashboard — leads, status, campaign activity, delivery health',
      'Email support',
      '1 strategy call/month',
    ],
    scopeNote: 'Website maintenance covers your existing site — new builds are quoted separately.',
  },
  {
    key: 'growth',
    name: 'Growth',
    price: '$1,300/mo',
    badge: 'Most popular',
    tagline: 'Turn the enquiries you already get into booked appointments.',
    includesNote: 'Everything in Essential, plus:',
    bullets: [
      'Attract — Google Ads setup + management',
      'Respond (full) — under 60 seconds, 24/7, day or night',
      'Recover (full) — 14-day follow-up, reactivation, rebooking reminders',
      'Monthly optimisation call',
      '24-hour response SLA',
    ],
  },
  {
    key: 'scale',
    name: 'Scale',
    price: '$3,000/mo',
    tagline: 'Fill the calendar.',
    includesNote: 'Everything in Growth, plus:',
    bullets: [
      'Attract (full) — Google + Meta + retargeting, content creation, advanced SEO and AI search visibility',
      'Recover (advanced) — reputation management, referral automation',
      'Executive reporting + analytics deep-dive',
      '2 strategy calls/week',
      'Same-day priority support',
    ],
  },
];

/** Full comparison table — grouped by module, then support. Cells show what
 *  each tier gets (depth), not a tick/dash, since every tier includes every
 *  module at some depth. */
export interface ComparisonRow {
  feature: string;
  essential: string;
  growth: string;
  scale: string;
}
export interface ComparisonGroup {
  title: string;
  rows: ComparisonRow[];
}

export const comparisonGroups: ComparisonGroup[] = [
  {
    title: 'Attract',
    rows: [
      { feature: 'Local SEO & Google Business Profile', essential: 'Included', growth: 'Included', scale: 'Included' },
      { feature: 'Website maintenance', essential: 'Existing site', growth: 'Existing site', scale: 'Existing site' },
      { feature: 'Paid ads', essential: 'Not included', growth: 'Google Ads', scale: 'Google + Meta + retargeting' },
      { feature: 'Content', essential: 'Not included', growth: 'Not included', scale: 'Content creation' },
      { feature: 'SEO depth', essential: 'Local SEO basics', growth: 'Local SEO basics', scale: 'Advanced SEO + AI search visibility' },
    ],
  },
  {
    title: 'Respond',
    rows: [
      { feature: 'Response speed', essential: 'Business hours', growth: 'Under 60 sec, 24/7', scale: 'Under 60 sec, 24/7' },
      { feature: 'Reply channels', essential: 'SMS + email', growth: 'SMS + email', scale: 'SMS + email' },
      { feature: 'Staff alerts + CRM capture', essential: 'Included', growth: 'Included', scale: 'Included' },
    ],
  },
  {
    title: 'Recover',
    rows: [
      { feature: 'Non-booker follow-up', essential: 'Not included', growth: '14-day / 5-touch', scale: '14-day / 5-touch' },
      { feature: 'Reactivation & rebooking reminders', essential: 'Not included', growth: 'Included', scale: 'Included' },
      { feature: 'Reputation & referral automation', essential: 'Not included', growth: 'Not included', scale: 'Included' },
    ],
  },
  {
    title: 'Support & Reporting',
    rows: [
      { feature: 'Live dashboard', essential: 'Included', growth: 'Included', scale: 'Included' },
      { feature: 'Reporting depth', essential: 'Leads, status, campaign activity, delivery health', growth: 'Same, reviewed monthly', scale: 'Executive reporting + analytics deep-dive' },
      { feature: 'Strategy calls', essential: '1/month', growth: 'Monthly optimisation call', scale: '2/week' },
      { feature: 'Support', essential: 'Email support', growth: '24-hour response SLA', scale: 'Same-day priority support' },
    ],
  },
];

export const adCostsNote = 'Ad platform costs are never included — billed directly by Google/Meta, separate from the monthly plan.';

export const guaranteeBand = {
  title: 'Your lead response live within 14 days, or your first month is free.',
  sub: 'No setup fee. No contract. Cancel any month.',
};

export interface OnboardingStep {
  days: string;
  title: string;
  desc: string;
}

export const onboardingSteps: OnboardingStep[] = [
  { days: 'Days 1–3', title: 'Access & audit', desc: 'Nothing gets replaced.' },
  { days: 'Days 4–10', title: 'Lead response live', desc: 'Respond goes live across SMS + email.' },
  { days: 'Days 11–20', title: 'Follow-up & reactivation', desc: 'Recover switches on.' },
  { days: 'Days 21–30', title: 'Handover', desc: 'Dashboard handover + first optimisation call.' },
];

/** Full-width block on /custom — bespoke/project-based work, not a monthly
 *  retainer, so it lives on its own page instead of the tier grid. */
export const customOffer = {
  badge: 'Enterprise',
  name: 'Custom AI Implementation',
  price: 'Starting at $10K',
  priceNote: 'One-time project pricing, not a monthly retainer.',
  description: 'For businesses needing bespoke AI agents, custom integrations, or industry-specific systems across any vertical. Scoped to your needs.',
  cta: 'Book a scoping call',
};

export const pricingFaq = [
  { question: 'Are ad spend fees included?', answer: 'No — ad spend is billed by the platforms (Google, Meta) directly, separate from your monthly plan.' },
  { question: 'Can I switch tiers?', answer: 'Yes, month-to-month — upgrade or downgrade as your needs change.' },
  { question: 'Is there a setup fee?', answer: 'None — setup and integration are included in every plan.' },
  { question: 'Is there a contract?', answer: 'No — every plan is month-to-month.' },
  { question: 'Do I have to change my booking system?', answer: 'No. We build into what you already use.' },
  { question: 'What if I need something not listed here?', answer: 'Book a call and tell us what you need — we’ll scope it and put together a custom quote.' },
];
