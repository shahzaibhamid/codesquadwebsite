export type CaseStudy = {
  slug: string;
  company: string;
  companyUrl: string;
  tags: [string, string];
  title: string;
};

export type ClientQuote = {
  slug: string;
  quote: string;
  name: string;
  title: string;
  company: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'modern-law',
    company: 'Modern Law',
    companyUrl: 'https://mymodernlaw.com',
    tags: ['Family Law', 'Content Automation'],
    title:
      'Turned a four-brand law firm into a self-publishing content engine that creates blogs, social posts, and images automatically.',
  },
  {
    slug: 'ipromo',
    company: 'iPromo',
    companyUrl: 'https://www.ipromo.com',
    tags: ['B2B E-commerce', 'Image Automation · Salesforce'],
    title:
      'Built an automated product-of-the-month image pipeline integrated with Salesforce and email, plus enrichment and analysis for a 25-year-old promotional products company.',
  },
  {
    slug: 'gengyveusa',
    company: 'GengyveUSA',
    companyUrl: 'https://gengyveusa.com',
    tags: ['Healthcare E-commerce', 'SEO · Ads · Content'],
    title:
      'Unified SEO, paid ads, and review analysis into one automation layer for a veteran-owned oral care brand.',
  },
  {
    slug: 'energybits',
    company: 'ENERGYbits',
    companyUrl: 'https://energybits.com',
    tags: ['DTC Wellness', 'Marketing Intelligence'],
    title:
      'Built a complete marketing intelligence platform analyzing 15+ connected ad and content platforms, with blog generation pipelines and SEO, AEO, and GEO scoring before publish.',
  },
];

export const clientQuotes: ClientQuote[] = [
  {
    slug: 'modern-law',
    quote:
      "Working with Shahzaib was the ideal experience. He was knowledgeable, solutions oriented, and incredibly communicative. He worked quickly and did an excellent job on the projects we assigned him. We'll definitely be working with him again in the future and highly recommend him.",
    name: 'Billie Tarascio',
    title: 'Founder & Attorney',
    company: 'Modern Law',
  },
  {
    slug: 'ipromo',
    quote:
      'Shahzaib did a great job of communicating throughout the project. He found solutions to hurdles along the way and ultimately we were very satisfied.',
    name: 'Jon Ruby',
    title: 'Vice President of Operations',
    company: 'iPromo',
  },
  {
    slug: 'gengyveusa',
    quote:
      'Shahzaib is an absolute gem. He is always polite and prompt in his communications, making collaboration seamless and enjoyable.',
    name: 'Dr. Stephen Thaddeus Connelly',
    title: 'Owner & Dentist',
    company: 'GengyveUSA',
  },
];
