/** Pricing page content. Pricing applies to clinics and appointment-based
 *  physical businesses only — e-commerce projects are custom-quoted. */

export const pricingHero = {
  eyebrow: 'Pricing',
  title: 'Simple pricing. Real growth.',
  sub: 'Growth plans for clinics and appointment-based businesses. All monthly, maintenance included. Ad platform costs billed separately by the platform.',
  note: 'This pricing applies to physical and appointment-based businesses (clinics, med spas, and similar). E-commerce projects are custom-quoted — book a call to scope yours.',
};

export interface PricingTier {
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
}

export const pricingTiers: PricingTier[] = [
  {
    name: 'Dashboard',
    price: '$300–$500/mo',
    description: 'For clinics with an existing team who want visibility without workflow changes.',
    features: [
      'Live dashboard connecting existing tools (CRM, ads, calendar, forms)',
      'Leads + status + campaign activity + delivery health + audit log',
      'Staff access management',
      'Setup + integration included',
      'Website maintenance',
      '1 strategy call/month',
      'Email support',
    ],
  },
  {
    name: 'Growth',
    price: '$1,200–$1,500/mo',
    badge: 'Most popular',
    description: 'Everything in Dashboard, plus:',
    features: [
      'Instant lead response (SMS + email within 60 seconds)',
      '2-week automated follow-up for new leads',
      'Past-patient reactivation campaigns',
      'Automatic rebooking reminders (timed to treatment cycles)',
      'Referral program automation',
      'Google Ads setup + management',
      'On-page SEO + Google Business Profile optimization',
      'Content upload (blog + social)',
      'Full performance dashboard',
      'Weekly strategy call',
      '24-hour response SLA',
    ],
  },
  {
    name: 'Scale',
    price: '$2,500–$3,000/mo',
    description: 'Everything in Growth, plus:',
    features: [
      'Multi-platform ads (Google + Meta + retargeting)',
      'Reputation management (auto review requests + monitoring)',
      'Advanced SEO + AI search visibility (ChatGPT, Perplexity, AI Overviews)',
      'Content creation (not just upload)',
      'Outbound patient acquisition system',
      'Monthly executive report + analytics deep-dive',
      '2 strategy calls/week',
      'Same-day priority support',
    ],
  },
];

export interface PricingComparisonRow {
  feature: string;
  dashboard: boolean;
  growth: boolean;
  scale: boolean;
}

export const pricingComparison: PricingComparisonRow[] = [
  { feature: 'Live dashboard & tool integrations', dashboard: true, growth: true, scale: true },
  { feature: 'Staff access management', dashboard: true, growth: true, scale: true },
  { feature: 'Website maintenance', dashboard: true, growth: true, scale: true },
  { feature: 'Strategy calls', dashboard: true, growth: true, scale: true },
  { feature: 'Instant lead response (60 sec)', dashboard: false, growth: true, scale: true },
  { feature: 'Automated follow-up sequences', dashboard: false, growth: true, scale: true },
  { feature: 'Patient reactivation & rebooking', dashboard: false, growth: true, scale: true },
  { feature: 'Referral program automation', dashboard: false, growth: true, scale: true },
  { feature: 'Google Ads management', dashboard: false, growth: true, scale: true },
  { feature: 'On-page SEO + Google Business Profile', dashboard: false, growth: true, scale: true },
  { feature: 'Content upload', dashboard: false, growth: true, scale: true },
  { feature: '24-hour support SLA', dashboard: false, growth: true, scale: true },
  { feature: 'Multi-platform ads (Google + Meta + retargeting)', dashboard: false, growth: false, scale: true },
  { feature: 'Reputation management', dashboard: false, growth: false, scale: true },
  { feature: 'Advanced SEO + AI search visibility', dashboard: false, growth: false, scale: true },
  { feature: 'Content creation (not just upload)', dashboard: false, growth: false, scale: true },
  { feature: 'Outbound patient acquisition system', dashboard: false, growth: false, scale: true },
  { feature: 'Monthly executive report + analytics', dashboard: false, growth: false, scale: true },
  { feature: 'Same-day priority support', dashboard: false, growth: false, scale: true },
];

export const pricingFaq = [
  { question: 'Are ad spend fees included?', answer: 'No — ad spend is billed by the platforms (Google, Meta) directly, separate from your monthly plan.' },
  { question: 'Can I switch tiers?', answer: 'Yes, month-to-month — upgrade or downgrade as your needs change.' },
  { question: 'Is there a setup fee?', answer: 'None — setup and integration are included in every plan.' },
  { question: 'Is there a contract?', answer: 'No — every plan is month-to-month.' },
];
