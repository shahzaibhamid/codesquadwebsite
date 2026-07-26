/** Pricing page content, split by industry. Same 3 price points for both
 *  verticals; feature lists are tailored to how each industry buys. */

export const pricingHero = {
  eyebrow: 'Pricing',
  title: 'Simple pricing. Real growth.',
  sub: 'Growth plans for clinics and e-commerce brands. All monthly, maintenance included. Ad platform costs are never included — billed separately by the platform.',
};

export interface PricingTier {
  name: string;
  price: string;
  badge?: string;
  description: string;
  features: string[];
}

export interface PricingComparisonRow {
  feature: string;
  dashboard: boolean;
  growth: boolean;
  scale: boolean;
}

export interface PricingIndustry {
  key: 'clinics' | 'ecommerce';
  label: string;
  tiers: PricingTier[];
  comparison: PricingComparisonRow[];
}

export const pricingIndustries: PricingIndustry[] = [
  {
    key: 'clinics',
    label: 'Clinics & Appointment-Based Businesses',
    tiers: [
      {
        name: 'Dashboard',
        price: '$500/mo',
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
        price: '$1,000/mo',
        badge: 'Most popular',
        description: 'Everything in Dashboard, plus:',
        features: [
          'Instant lead response (SMS + email within 60 seconds)',
          '2-week automated follow-up for new leads',
          'Past-customer reactivation campaigns',
          'Automatic rebooking reminders (timed to treatment cycles)',
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
        price: '$3,000/mo',
        description: 'Everything in Growth, plus:',
        features: [
          'Multi-platform ads (Google + Meta + retargeting)',
          'Reputation management (auto review requests + monitoring)',
          'Referral program automation',
          'Advanced SEO + AI search visibility (ChatGPT, Perplexity, AI Overviews)',
          'Content creation (not just upload)',
          'Outbound lead acquisition system',
          'Monthly executive report + analytics deep-dive',
          '2 strategy calls/week',
          'Same-day priority support',
        ],
      },
    ],
    comparison: [
      { feature: 'Live dashboard & tool integrations', dashboard: true, growth: true, scale: true },
      { feature: 'Staff access management', dashboard: true, growth: true, scale: true },
      { feature: 'Website maintenance', dashboard: true, growth: true, scale: true },
      { feature: 'Strategy calls', dashboard: true, growth: true, scale: true },
      { feature: 'Instant lead response (60 sec)', dashboard: false, growth: true, scale: true },
      { feature: 'Automated follow-up sequences', dashboard: false, growth: true, scale: true },
      { feature: 'Customer reactivation & rebooking', dashboard: false, growth: true, scale: true },
      { feature: 'Referral program automation', dashboard: false, growth: false, scale: true },
      { feature: 'Google Ads management', dashboard: false, growth: true, scale: true },
      { feature: 'On-page SEO + Google Business Profile', dashboard: false, growth: true, scale: true },
      { feature: 'Content upload', dashboard: false, growth: true, scale: true },
      { feature: '24-hour support SLA', dashboard: false, growth: true, scale: true },
      { feature: 'Multi-platform ads (Google + Meta + retargeting)', dashboard: false, growth: false, scale: true },
      { feature: 'Reputation management', dashboard: false, growth: false, scale: true },
      { feature: 'Advanced SEO + AI search visibility', dashboard: false, growth: false, scale: true },
      { feature: 'Content creation (not just upload)', dashboard: false, growth: false, scale: true },
      { feature: 'Outbound lead acquisition system', dashboard: false, growth: false, scale: true },
      { feature: 'Monthly executive report + analytics', dashboard: false, growth: false, scale: true },
      { feature: 'Same-day priority support', dashboard: false, growth: false, scale: true },
    ],
  },
  {
    key: 'ecommerce',
    label: 'Marketing and E-commerce',
    tiers: [
      {
        name: 'Dashboard',
        price: '$500/mo',
        description: 'For e-commerce brands with an existing team who want visibility without workflow changes.',
        features: [
          'Live dashboard connecting existing tools (Shopify/WooCommerce, ads, email, analytics)',
          'Sales + traffic + campaign performance + inventory alerts in one view',
          'Staff access management',
          'Setup + integration included',
          'Website maintenance',
          '1 strategy call/month',
          'Email support',
        ],
      },
      {
        name: 'Growth',
        price: '$1,000/mo',
        badge: 'Most popular',
        description: 'Everything in Dashboard, plus:',
        features: [
          'SEO · AEO · GEO content optimization',
          'Google Ads setup + management',
          'On-page SEO + technical audits',
          'Content upload (blog + product descriptions)',
          'Review and customer feedback monitoring',
          'Full performance dashboard',
          'Weekly strategy call',
          '24-hour response SLA',
        ],
      },
      {
        name: 'Scale',
        price: '$3,000/mo',
        description: 'Everything in Growth, plus:',
        features: [
          'Multi-platform ads (Google + Meta + retargeting)',
          'Marketing intelligence across 15+ connected ad and content platforms',
          'Advanced SEO + AI search visibility (ChatGPT, Perplexity, AI Overviews)',
          'Content creation (not just upload)',
          'Automated blog and campaign pipelines',
          'Monthly executive report + analytics deep-dive',
          '2 strategy calls/week',
          'Same-day priority support',
        ],
      },
    ],
    comparison: [
      { feature: 'Live dashboard & tool integrations', dashboard: true, growth: true, scale: true },
      { feature: 'Staff access management', dashboard: true, growth: true, scale: true },
      { feature: 'Website maintenance', dashboard: true, growth: true, scale: true },
      { feature: 'Strategy calls', dashboard: true, growth: true, scale: true },
      { feature: 'SEO · AEO · GEO optimization', dashboard: false, growth: true, scale: true },
      { feature: 'Google Ads management', dashboard: false, growth: true, scale: true },
      { feature: 'On-page SEO + technical audits', dashboard: false, growth: true, scale: true },
      { feature: 'Content upload', dashboard: false, growth: true, scale: true },
      { feature: 'Review & feedback monitoring', dashboard: false, growth: true, scale: true },
      { feature: '24-hour support SLA', dashboard: false, growth: true, scale: true },
      { feature: 'Multi-platform ads (Google + Meta + retargeting)', dashboard: false, growth: false, scale: true },
      { feature: 'Marketing intelligence (15+ platforms)', dashboard: false, growth: false, scale: true },
      { feature: 'Advanced SEO + AI search visibility', dashboard: false, growth: false, scale: true },
      { feature: 'Content creation (not just upload)', dashboard: false, growth: false, scale: true },
      { feature: 'Automated blog & campaign pipelines', dashboard: false, growth: false, scale: true },
      { feature: 'Monthly executive report + analytics', dashboard: false, growth: false, scale: true },
      { feature: 'Same-day priority support', dashboard: false, growth: false, scale: true },
    ],
  },
];

export const pricingFaq = [
  { question: 'Are ad spend fees included?', answer: 'No — ad spend is billed by the platforms (Google, Meta) directly, separate from your monthly plan.' },
  { question: 'Can I switch tiers?', answer: 'Yes, month-to-month — upgrade or downgrade as your needs change.' },
  { question: 'Is there a setup fee?', answer: 'None — setup and integration are included in every plan.' },
  { question: 'Is there a contract?', answer: 'No — every plan is month-to-month.' },
];
