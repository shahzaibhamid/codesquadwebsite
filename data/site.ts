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
    lines: ['312 W 2nd St Unit #A1528', 'Casper, WY 82601'],
    map: 'https://www.google.com/maps/place/Apt+Tech+Studio/@39.156704,-75.5242117,17z/data=!3m1!4b1!4m6!3m5!1s0x89c765214ce2e4a3:0xd8584f678a89eceb!8m2!3d39.156704!4d-75.5242117!16s%2Fg%2F11y6rmnrz0!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDcwOC4wIKXMDSoASAFQAw%3D%3D',
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

/** Primary navigation. AI Basecamp + AI Audit are reference features modeled on
 *  cogentlabs.co, adapted for CodeSquad. "Contact" is Next-only (WP had none). */
export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'Blog', href: '/blog' },
  { label: 'Base Camp', href: '/ai-basecamp' },
  { label: 'AI Audit', href: '/ai-audit' },
  { label: 'Contact', href: '/contact' },
] as const;
