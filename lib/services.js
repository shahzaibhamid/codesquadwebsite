// The services listed on /services and rendered at /services/<slug> (lib/servicePage.js).
// Copy here is reused from existing site pages (home, /it-engineering, /process, the healthcare
// page and the case studies) — keep it sourced, don't invent claims or numbers.
// `card` is the one-liner on the service cards (same style as the homepage "What We Do" cards).

const svg = (d, w = '1.8') => `<svg class="svgic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const ICONS = {
  bolt: svg('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'),
  code: svg('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>'),
  grid: svg('<rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>'),
  search: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>'),
  target: svg('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/>'),
  bars: svg('<line x1="4" y1="21" x2="4" y2="11"/><line x1="10" y1="21" x2="10" y2="4"/><line x1="16" y1="21" x2="16" y2="14"/><line x1="2.5" y1="21" x2="21.5" y2="21"/>')
};

// Case studies referenced by more than one service.
const CASES = {
  settlein: { href: '/case-studies/settlein', tags: ['Document &amp; Eligibility Processing', 'OCR · Document Processing · Eligibility Scoring'], title: 'SettleIn', text: 'A document processing and eligibility platform — using OCR and AI to read documents, score eligibility, and give applicants clear feedback without manual review bottlenecks.' },
  debatePartners: { href: '/case-studies/debate-partners', tags: ['Competitive Debate Platform', 'AI Case Generation · CRM · Billing'], title: 'Debate Partners', text: 'A case-generation and CRM platform for competitive debate — turning source research into evidence-backed cases while managing teams, coaches, and subscriptions in one system.' },
  mamasCompass: { href: '/case-studies/mamas-compass', tags: ['Comparison &amp; Aggregation', 'Product Aggregation · AI Scoring · SEO Content'], title: "Mama's Compass", text: 'A product aggregation and comparison platform — pulling data from multiple sources, scoring products with AI, and generating SEO content that helps parents choose with confidence.' },
  energybits: { href: '/case-studies/energybits', tags: ['DTC Wellness', 'Marketing Intelligence'], title: 'ENERGYbits', text: 'A complete marketing-intelligence platform analyzing 15+ connected ad and content platforms, with blog pipelines and SEO/AEO/GEO scoring before publish.' },
  ipromo: { href: '/case-studies/ipromo', tags: ['B2B E-commerce', 'Image Automation · Salesforce'], title: 'iPromo', text: 'An automated product-of-the-month image pipeline integrated with Salesforce and email, plus enrichment and analysis for a 25-year-old promotional products company.' },
  gengyve: { href: '/case-studies/gengyveusa', tags: ['Healthcare E-commerce', 'SEO · Ads · Content'], title: 'GengyveUSA', text: 'Unified SEO, paid ads, and review analysis into one automation layer for a veteran-owned oral care brand.' },
  harmony: { href: '/case-studies/harmony-medspa-patient-growth-automation', tags: ['Medical Aesthetics', 'Automation · SEO'], title: 'Harmony Med Spa', text: 'A patient growth system that captures leads, responds in about 60 seconds, follows up automatically, and tracks everything in one dashboard.' },
  tristate: { href: '/case-studies/tristate-auto-sales', tags: ['Automotive Retail', 'Chatbot Automation · CRM Integration · Lead Routing'], title: 'TriState Auto Sales', text: 'A connected engagement system that captures, routes, and follows up on every customer conversation across channels — from first chat to booked appointment.' }
};

const HARMONY_STATS = [
  { val: '60<em>+</em>', lab: 'Leads (2 months)' },
  { val: '<em>~$</em>50', lab: 'Cost per lead' },
  { val: '6–7', lab: 'New patients booked' }
];

export const services = [
  {
    slug: 'websites-software',
    card: 'Fast, modern sites, web apps and custom platforms built to convert and scale.',
    name: 'Websites &amp; software',
    title: 'Websites & Software',
    icon: ICONS.code,
    sub: 'Fast, modern sites, web apps and custom platforms built to convert and scale.',
    offerings: [
      'Marketing sites, customer portals &amp; custom web apps',
      'High-converting website &amp; landing pages',
      'Internal tools &amp; live dashboards for revenue, pipeline &amp; activity',
      'Secure API integrations across your existing tools',
      'IoT &amp; connected systems — device data, real-time monitoring &amp; alerting'
    ],
    stack: ['Next.js / React', 'FastAPI / Python'],
    steps: [
      { title: 'Discovery', text: 'We learn about your business, workflows, goals and bottlenecks.' },
      { title: 'Build', text: 'We implement the systems, AI agents and workflows directly into the stack you already use.' },
      { title: 'Launch', text: 'Everything goes live, documented and connected.' },
      { title: 'Handover', text: 'Training and documentation so nothing is a black box — your team runs it confidently.' }
    ],
    proof: [CASES.ipromo, CASES.settlein, CASES.debatePartners]
  },
  {
    slug: 'crm-integration',
    card: 'Every lead, deal and campaign tracked in one live view your team actually trusts.',
    name: 'CRM &amp; dashboards',
    title: 'CRM & Dashboards',
    icon: ICONS.grid,
    sub: 'Every lead, conversation, and metric flowing through one connected system the team actually uses.',
    offerings: [
      'Pipeline, deal stages &amp; automatic lead routing',
      'Unified lead inbox — every enquiry from ads, forms, calls and chat in one place, tagged by source',
      'Full customer timeline — every call, SMS, email and status change logged',
      'Automated follow-up tracking that stops the moment a lead books',
      'Campaign attribution built in — every customer traced back to the campaign, ad and keyword',
      'Role-based access &amp; a full audit log of every change',
      'Quoting, onboarding and support workflows',
      'Live dashboards for revenue, pipeline &amp; activity'
    ],
    proof: [CASES.tristate, CASES.debatePartners]
  },
  {
    slug: 'digital-marketing',
    card: 'Intent-driven campaigns and landing pages, tuned to spend where it actually sells.',
    name: 'Ads — Google &amp; Meta',
    title: 'Google & Meta Ads',
    icon: ICONS.target,
    sub: 'Intent-driven campaigns and landing pages, tuned to spend where it actually sells.',
    offerings: [
      'Google &amp; Meta ad campaigns',
      'Landing pages &amp; conversion optimization',
      'Automated email &amp; SMS nurture flows',
      'Reporting through <a href="/services/marketing-intelligence">marketing-intelligence dashboards</a>'
    ],
    note: 'One-time build fee (audit, setup, launch) · then monthly growth retainer · no long-term lock-in. <a href="/process#phases">How Build &amp; Grow work →</a>',
    proof: [{ ...CASES.harmony, stats: HARMONY_STATS }, CASES.energybits]
  },
  {
    slug: 'seo-geo-aeo',
    card: 'Get found on Google and recommended by AI overviews, ChatGPT and Gemini.',
    name: 'SEO · AEO · GEO',
    title: 'SEO · AEO · GEO',
    icon: ICONS.search,
    sub: 'Get found on Google and recommended by AI overviews, ChatGPT and Gemini.',
    offerings: [
      'Technical SEO, site speed &amp; structured data',
      'Content engines — articles written, optimized and published from inside the CRM',
      'Local SEO &amp; Google Business Profile management',
      'AI-search visibility — AEO content AI Overviews can quote, GEO so ChatGPT &amp; Gemini surface you',
      'Reporting dashboards'
    ],
    explainer: {
      label: 'SEO vs AEO vs GEO: what is the difference?',
      items: [
        { icon: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', '2'), title: 'SEO — Search Engine Optimization', text: 'Improving a website so that search engines can understand, index, and rank its pages for relevant searches. SEO helps your page get discovered and ranked.' },
        { icon: svg('<path d="M4 4h16v12H5.2L4 17.2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12.5" x2="13" y2="12.5"/>', '2'), title: 'AEO — Answer Engine Optimization', text: "Structuring content so that search engines and AI assistants can easily identify a clear, useful answer to a user's question. AEO helps your content provide the best direct answer." },
        { icon: svg('<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><polyline points="9 12 11 14 15 10"/>', '2'), title: 'GEO — Generative Engine Optimization', text: 'Increasing the likelihood that a brand or its content will be discovered, trusted, cited, or recommended in AI-generated answers. GEO helps your brand and content become a trusted source in generative AI responses.' }
      ],
      note: 'They are not three completely separate marketing strategies — they overlap.',
      link: { href: '/blog/seo-aeo-geo-ai-search-guide-2', label: "Read the beginner's guide to AEO and GEO →" }
    },
    proof: [
      CASES.gengyve,
      { href: '/blog/microneedling-seo-med-spas', tags: ['Industry example', 'Med Spas · Local SEO'], title: 'From “Microneedling Near Me” to Booked', text: 'How med spas can use microneedling SEO, local search, Google Ads, and AI-focused search strategies to turn online searches into new patient opportunities.', linkLabel: 'Read the article →' }
    ]
  },
  {
    slug: 'ai-automation',
    card: 'Instant follow-up, nurture and internal workflows that run without your team.',
    name: 'AI agents &amp; automation',
    title: 'AI Agents & Automation',
    icon: ICONS.bolt,
    sub: 'Onboarding, reporting, data entry and hand-offs quietly burn hours. AI agents and automations take the busywork off your team for good — instant follow-up, nurture and internal workflows that run without your team.',
    offerings: [
      'AI agents &amp; assistants for support, sales &amp; research',
      'Workflow automation across your whole stack',
      'Secure API integrations across your existing tools',
      'Voice AI'
    ],
    stack: ['n8n', 'Make', 'LangChain / LangGraph', 'OpenAI', 'CRMs'],
    proof: [CASES.settlein, CASES.debatePartners, CASES.mamasCompass, CASES.energybits]
  },
  {
    slug: 'marketing-intelligence',
    card: 'Spend, ROAS, LTV and content performance unified across every connected platform.',
    name: 'Marketing intelligence',
    title: 'Marketing Intelligence',
    icon: ICONS.bars,
    sub: 'Spend, ROAS, LTV and content performance unified across every connected platform.',
    offerings: [
      'One dashboard for spend, ROAS and LTV',
      'Every booked customer traced to the campaign, ad and keyword behind it',
      'Content performance with SEO, AEO &amp; GEO scoring before publish',
      'Monthly performance reporting'
    ],
    proof: [CASES.energybits, CASES.gengyve]
  }
];

export const getService = (slug) => services.find((s) => s.slug === slug);
