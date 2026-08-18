import type { IconName } from '@/types';

/** Offers page content. Three parallel packages — Marketing & Lead
 *  Generation, Cold Outbound, and Business Operations — shown side by side.
 *  They aren't depth tiers of each other: a business can take one or
 *  combine them. Each package groups its scope under sub-labels instead of
 *  a flat bullet list. */

export const pricingHero = {
  eyebrow: 'Offers',
  title: 'Automate the boring stuff. Scale the business.',
  sub: 'Marketing & Lead Generation, Cold Outbound, and Business Operations — take one or combine them. Starting at $1,000/month.',
};

export interface PackageGroup {
  label: string;
  points: string[];
}

export interface OfferPackage {
  key: 'marketing' | 'outbound' | 'operations';
  name: string;
  icon: IconName;
  tagline: string;
  groups: PackageGroup[];
  footnote?: string;
}

export const offerPackages: OfferPackage[] = [
  {
    key: 'marketing',
    name: 'Marketing & Lead Generation',
    icon: 'search',
    tagline: 'Get found, respond instantly, and never lose a lead to silence.',
    groups: [
      {
        label: 'Attract',
        points: ['Local SEO & Google Business Profile', 'Google + Meta ads', 'Website upkeep', 'Content', 'Reputation & referral automation'],
      },
      {
        label: 'Respond',
        points: ['Under 60 seconds, 24/7', 'SMS + email reply', 'Staff alerts', 'Lead captured to CRM'],
      },
      {
        label: 'Recover',
        points: ['14-day / 5-touch follow-up for non-bookers', 'Past-customer reactivation', 'Rebooking reminders timed to service cycles'],
      },
    ],
    footnote: 'Ad platform costs are billed directly by Google/Meta, separate from this package.',
  },
  {
    key: 'outbound',
    name: 'Cold Outbound',
    icon: 'target',
    tagline: 'Generate new demand instead of waiting for it to arrive.',
    groups: [
      {
        label: 'Prospecting',
        points: ['Targeted list building', 'Lead enrichment'],
      },
      {
        label: 'Outreach',
        points: ['Personalized cold email sequences', 'LinkedIn outreach'],
      },
      {
        label: 'Infrastructure',
        points: ['Sending domain setup & warmup', 'Inbox rotation', 'Deliverability monitoring'],
      },
      {
        label: 'Follow-up',
        points: ['Automated sequencing', 'Reply handling', 'CRM logging'],
      },
    ],
  },
  {
    key: 'operations',
    name: 'Business Operations',
    icon: 'layers',
    tagline: 'Automation for what happens after the lead becomes a customer.',
    groups: [
      {
        label: 'Customer Support',
        points: ['24/7 inquiry handling', 'FAQ / knowledge-base agent', 'Ticket escalation with context'],
      },
      {
        label: 'Back-Office & Admin',
        points: ['Billing & invoicing automation', 'Intake & document processing', 'Inventory, package & membership tracking', 'System integrations'],
      },
      {
        label: 'AI Agents & Workflows',
        points: ['Staff scheduling', 'Reporting & analytics compilation', 'Cross-tool data sync'],
      },
    ],
    footnote: 'Website builds and industry-specific systems are scoped separately — see Custom AI Implementation.',
  },
];

export const guaranteeBand = {
  title: 'Live within 30 days, or your first month is free.',
  sub: 'No setup fee. No contract. Cancel any month.',
};

export interface OnboardingStep {
  days: string;
  title: string;
  desc: string;
}

export const onboardingSteps: OnboardingStep[] = [
  { days: 'Days 1–3', title: 'Access & audit', desc: 'Nothing gets replaced.' },
  { days: 'Days 4–10', title: 'Core systems live', desc: 'Your chosen package(s) go live in your existing stack.' },
  { days: 'Days 11–20', title: 'Depth & integrations', desc: 'Deeper automation and integrations connected.' },
  { days: 'Days 21–30', title: 'Handover', desc: 'Dashboard handover + first optimisation call.' },
];

/** Full-width block on /custom — bespoke/project-based work, not a monthly
 *  retainer, so it lives on its own page instead of the package grid. */
export const customOffer = {
  badge: 'Enterprise',
  name: 'Custom AI Implementation',
  price: 'Starting at $10K',
  priceNote: 'One-time project pricing, not a monthly retainer.',
  description: 'For businesses needing bespoke AI agents, custom integrations, or industry-specific systems across any vertical. Scoped to your needs.',
  cta: 'Book a scoping call',
};

export const pricingFaq = [
  { question: 'Are ad spend fees included?', answer: 'No — ad spend is billed by the platforms (Google, Meta) directly, separate from your package.' },
  { question: 'Can I combine packages?', answer: 'Yes — take Marketing & Lead Generation, Cold Outbound, and Business Operations independently or together, and adjust month-to-month.' },
  { question: 'Is there a setup fee?', answer: 'None — setup and integration are included in every package.' },
  { question: 'Is there a contract?', answer: 'No — every package is month-to-month.' },
  { question: 'Do I have to change my booking system?', answer: 'No. We build into what you already use.' },
  { question: 'What if I need something not listed here?', answer: 'Book a call and tell us what you need — we’ll scope it and put together a custom quote.' },
];
