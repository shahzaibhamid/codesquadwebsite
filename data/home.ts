/** Home page content — mirrors the live codesquad.ai home page. */

/** Hero — badge, headline, sub, service tags. */
export const hero = {
  badge: 'Trusted by 20+ companies worldwide',
  title: 'Build Automation Engines',
  sub: 'We help businesses automate repetitive manual tasks.',
  tags: [
    'Outbound',
    'Inbound',
    'SEO · AEO · GEO',
    'Content Automation',
    'Ads',
    'Customer Support',
    'Back Office',
    'AI Agents',
  ],
  ctaLabel: 'Book a Consultation Call',
};

/** Trusted-by companies (logo strip). Each name links to the client's site. */
export interface Partner {
  name: string;
  url: string;
  logo: string;
}
export const partners: Partner[] = [
  { name: 'iPromo', url: 'https://www.ipromo.com/', logo: '/partners/ipromo.webp' },
  { name: 'ENERGYbits', url: 'https://energybits.com/', logo: '/partners/energybits-logo.svg' },
  { name: 'Gengyve USA', url: 'https://gengyveusa.com/', logo: '/partners/gengyve.webp' },
  { name: 'Modern Law', url: 'https://mymodernlaw.com/', logo: '/partners/modern-law.svg' },
  { name: 'Kenetics Solutions', url: 'https://keneticssolutions.com', logo: '/partners/kenetics.png' },
  { name: 'TriState Auto Sales', url: 'https://www.settlein.io', logo: '/partners/tristate.webp' },
  { name: 'SettleIn', url: 'https://www.harmonymedspafl.com', logo: '/partners/settlein.png' },
  { name: 'Mama’s Compass', url: 'https://mamascompass.com', logo: '/partners/mamas-compass.png' },
  { name: 'Debate Partners', url: 'https://debatepartners.com', logo: '/partners/debate-partners-transparent.png' },
  { name: 'Harmony Med Spa', url: 'https://www.tristateautosales.com', logo: '/partners/harmony-med-spa.png' },
];

/** Case studies — the selected work shown on the live site's home page. */
export interface HomeCase {
  name: string;
  url: string;
  category: string;
  services: string;
  desc: string;
}
export const caseStudies: HomeCase[] = [
  {
    name: 'Modern Law', url: 'https://mymodernlaw.com', category: 'Family Law',
    services: 'Content Automation',
    desc: 'Turned a four-brand law firm into a self-publishing content engine that creates blogs, social posts, and images automatically.',
  },
  {
    name: 'iPromo', url: 'https://www.ipromo.com', category: 'B2B E-commerce',
    services: 'Image Automation · Salesforce',
    desc: 'Built an automated product-of-the-month image pipeline integrated with Salesforce and email, plus enrichment and analysis for a 25-year-old promotional products company.',
  },
  {
    name: 'GengyveUSA', url: 'https://gengyveusa.com', category: 'Healthcare E-commerce',
    services: 'SEO · Ads · Content',
    desc: 'Unified SEO, paid ads, and review analysis into one automation layer for a veteran-owned oral care brand.',
  },
  {
    name: 'ENERGYbits', url: 'https://energybits.com', category: 'DTC Wellness',
    services: 'Marketing Intelligence',
    desc: 'Built a complete marketing intelligence platform analyzing 15+ connected ad and content platforms, with blog generation pipelines and SEO, AEO, and GEO scoring before publish.',
  },
];

/** Founder section — matches the live site copy. */
export const founder = {
  eyebrow: 'Founder',
  name: 'Shahzaib Hamid',
  role: 'Founder, CodeSquad',
  photo: '/images/shahzaib.jpeg',
  initials: 'SH',
  bio: [
    'I build AI systems that help small and medium businesses grow, with automation that lives inside your stack and becomes yours to run.',
    'At CodeSquad, my team and I turn those capabilities into systems that actually move the needle: more pipeline, more booked revenue, fewer hours lost to manual work. We don’t just automate tasks; we build the engine that drives growth and then hand it over. It lives in your stack, your team runs it, and it holds up under real workload.',
  ],
};

/** "How we work" — the 4-step process from the live site. */
export const howWeWork = [
  { step: '01', title: 'Discovery Call', desc: 'We learn about your business, workflows, goals, and bottlenecks.' },
  { step: '02', title: 'Opportunity Assessment', desc: 'We identify the highest-impact automation and AI opportunities based on business value and ROI.' },
  { step: '03', title: 'Build & Deploy', desc: 'We implement automation systems, AI agents, and workflows directly into your existing stack.' },
  { step: '04', title: 'Optimize & Scale', desc: 'We continuously improve and expand systems as your business grows.' },
];
