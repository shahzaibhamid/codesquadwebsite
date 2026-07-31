/** Global site config — the single source of truth for brand + contact info.
 *  Mirrors the constants from the WordPress functions.php. */

export const site = {
  name: 'CodeSquad',
  tagline: 'AI Automation & Software Development',
  description:
    'AI automation and software development agency. We build automation engines, AI agents, and custom systems that scale your business inside your existing stack.',
  calendly: 'https://calendly.com/code_squad/30min',
  email: 'info@codesquad.ai',
  phone: '+1 (307) 396-4945',
  phoneTel: '+13073964945',
  logo: '/images/logo.png',
  /** White-text variant (transparent bg) for use over the dark home hero. */
  logoDark: '/images/logo-dark.png',
} as const;

/** Office locations shown in the footer (matches codesquad.ai). */
export const offices = [
  {
    code: 'us' as const,
    country: 'USA',
    lines: ['8 The Green Ste 14681', 'Dover, DE 19901'],
    map: 'https://www.google.com/maps/search/?api=1&query=8+The+Green+Ste+14681%2C+Dover%2C+DE+19901',
  },
  { code: 'pk' as const, country: 'Pakistan', lines: ['Lahore, Pakistan'], map: undefined as string | undefined },
];

/** Platforms shown in the footer "Tools & platforms we work with" row. */
export const platforms = [
  { code: 'openai' as const, label: 'OpenAI' },
  { code: 'make' as const, label: 'Make' },
  { code: 'hubspot' as const, label: 'HubSpot' },
  { code: 'google' as const, label: 'Google' },
  { code: 'meta' as const, label: 'Meta' },
  { code: 'salesforce' as const, label: 'Salesforce' },
  { code: 'apollo' as const, label: 'Apollo' },
  { code: 'zapier' as const, label: 'Zapier' },
];

export type PlatformCode = (typeof platforms)[number]['code'];

/** Primary navigation. Base Camp (/ai-basecamp) and AI Audit (/ai-audit) stay
 *  live as standalone pages but are unlinked from nav. */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Offers', href: '/offers' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
] as const;

/** Footer "Services" column — independent from data/services.ts so the
 *  /services page copy isn't affected by footer label changes. */
export const footerServices = [
  'Patient Growth Systems',
  'Dashboards & Reporting',
  'Ads (Google + Meta)',
  'SEO · AEO · GEO',
  'Marketing Intelligence (E-commerce)',
] as const;
