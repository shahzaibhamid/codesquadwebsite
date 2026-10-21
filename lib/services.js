// The services listed on /services and rendered at /services/<slug> (lib/servicePage.js).
// Copy here is reused from existing site pages (home, /it-engineering, /process, the healthcare
// page and the case studies) — keep it sourced, don't invent claims or numbers.
// `card` is the one-liner on the service cards (same style as the homepage "What We Do" cards).

const svg = (d, w = '1.8') => `<svg class="svgic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const ICONS = {
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
    name: 'Websites &amp; Software',
    title: 'Websites & Software',
    icon: ICONS.code,
    sub: 'Fast, modern sites, web apps and custom platforms built to convert and scale.',
    includedHeading: 'What we build.',
    hero: { secondary: { label: "See what's included", href: '#details' } },
    problems: {
      label: 'The problem',
      heading: 'When the website or software holds the business back.',
      items: [
        { icon: ICONS.bolt, title: "A slow, outdated site that doesn't convert", text: 'Visitors leave before they enquire, so the traffic you work for never turns into customers.' },
        { icon: ICONS.code, title: 'Off-the-shelf tools you have outgrown', text: 'Workarounds and manual steps pile up around software that was never built for how you work.' },
        { icon: ICONS.grid, title: 'Data scattered across tools', text: 'With no <a href="/services/crm-integration">single view</a>, the team cannot see revenue, pipeline and activity in one place.' }
      ]
    },
    // The five original checklist items, grouped into four blocks. Wording is drawn only from those items.
    offerings: [
      { icon: ICONS.code, title: 'Marketing sites &amp; landing pages', text: 'High-converting websites and landing pages — fast, modern and built to convert and scale.' },
      { icon: ICONS.grid, title: 'Customer portals &amp; custom web apps', text: 'Customer portals, web apps and custom platforms built around how your business works.' },
      { icon: ICONS.bars, title: 'Internal tools &amp; live dashboards', text: 'Internal tools and <a href="/services/crm-integration">live dashboards</a> for revenue, pipeline and activity.' },
      { icon: ICONS.bolt, title: 'APIs, integrations &amp; IoT systems', text: 'Secure API integrations across your existing tools, plus IoT and connected systems — device data, real-time monitoring and alerting.' }
    ],
    midCta: { heading: 'Not sure where to start?', text: "Book a free call. We'll map your stack, your bottlenecks and the highest-impact systems to build first.", label: 'Book a Free Call' },
    steps: [
      { title: 'Discovery', text: 'We learn about your business, workflows, goals and bottlenecks.' },
      { title: 'Build', text: 'We implement the systems, AI agents and workflows directly into the stack you already use.' },
      { title: 'Launch', text: 'Everything goes live, documented and connected.' },
      { title: 'Handover', text: 'Training and documentation so nothing is a black box — your team runs it confidently.' }
    ],
    engagement: {
      label: 'Two Phases',
      heading: 'Build once. Grow every month.',
      text: 'Everything is set up properly in a one-time build, then run and improved for you month after month.',
      link: { href: '/process#phases', label: 'How Build &amp; Grow work →' }
    },
    // metric/result lines come from each case-study page (hero stat tiles, results and conclusion copy).
    proof: [
      { ...CASES.ipromo, metric: 'Product imagery automated, connected to Salesforce and email', result: 'Monthly campaigns move from selection to launch with fewer manual steps.' },
      { ...CASES.settlein, metric: 'Automated · Scored · Tracked', result: "Documents are read, scored, and tracked automatically from the moment they're submitted." },
      { ...CASES.debatePartners, metric: 'Teams, cases and billing in one platform', result: 'Coaches manage their teams, cases, and subscriptions from one platform.' }
    ],
    faq: {
      label: 'FAQ',
      heading: 'Questions, answered.',
      items: [
        { q: 'Do you build into our existing stack?', a: 'Yes. We build into your existing stack — booking system, store platform or <a href="/services/crm-integration">CRM</a> — and connect what already works. No rip-and-replace, no new tools to learn. Want the busywork handled too? See <a href="/services/ai-automation">AI agents &amp; automation</a>.' },
        { q: 'How long does a typical build take?', a: 'It depends on scope: how many pages and integrations you need. We give you a timeline after the opportunity assessment, before any build work starts, and nothing goes live until tracking and follow-up are tested end to end.' },
        { q: 'What do we get at handover?', a: 'Everything goes live documented and connected, with training and documentation so nothing is a black box — your team runs it confidently.' },
        { q: 'Can you rebuild or redesign our current site?', a: 'High-converting websites and landing pages are part of what we build, and we build into your existing stack and connect what already works. Book a free call and we will tell you honestly what is worth rebuilding.' },
        { q: 'What does it cost?', a: "Every engagement starts with a free 30-minute call and an honest read on what's worth building. Pricing is a one-time build fee, then a monthly growth retainer with no long-term lock-in. Third-party tools (CRM licences, SMS/email credits) are billed separately." }
      ]
    }
  },
  {
    slug: 'crm-integration',
    card: 'Every lead, deal and campaign tracked in one live view your team actually trusts.',
    name: 'CRM &amp; Dashboards',
    title: 'CRM & Dashboards',
    icon: ICONS.grid,
    sub: 'Every lead, conversation, and metric flowing through one connected system the team actually uses.',
    hero: {
      secondary: { label: "See what's included", href: '#details' },
      // Column titles are the stages you named; card tags are the checklist's own labels (sources, follow-up, attribution).
      pipeline: {
        label: 'Pipeline: New Lead, Contacted, Booked, Customer',
        columns: [
          { title: 'New Lead', cards: ['Ads', 'Forms', 'Calls', 'Chat'] },
          { title: 'Contacted', cards: ['Follow-up tracked', 'Follow-up tracked'] },
          { title: 'Booked', cards: ['Follow-up stops'] },
          { title: 'Customer', cards: ['Campaign · ad · keyword'] }
        ]
      }
    },
    problems: {
      label: 'The problem',
      heading: 'Where leads quietly get lost.',
      items: [
        { icon: ICONS.grid, title: 'Leads land in different inboxes', text: 'Enquiries from ads, forms, calls and chat arrive in separate places, so nobody sees the full picture.' },
        { icon: ICONS.bolt, title: 'Follow-up depends on someone remembering', text: 'Without tracking, leads go quiet and nobody knows who has been contacted, or who already booked.' },
        { icon: ICONS.target, title: 'No idea which campaign produced which customer', text: 'Spend goes out, but customers cannot be traced back to the campaign, ad and keyword behind them.' }
      ]
    },
    // The 8 original checklist items, each expanded using only its own wording, grouped Capture / Follow up / Measure.
    offerings: [
      { group: 'Capture', icon: ICONS.grid, title: 'Unified lead inbox', text: 'Every enquiry from ads, forms, calls and chat in one place, tagged by source.' },
      { group: 'Capture', icon: ICONS.bars, title: 'Pipeline, deal stages &amp; automatic lead routing', text: 'Leads move through your pipeline and deal stages, and are routed automatically.' },
      { group: 'Capture', icon: ICONS.code, title: 'Role-based access &amp; a full audit log', text: 'Role-based access, plus a full audit log of every change.' },
      { group: 'Follow up', icon: ICONS.bolt, title: 'Automated follow-up tracking', text: '<a href="/services/ai-automation">Automated follow-up</a> is tracked, and stops the moment a lead books.' },
      { group: 'Follow up', icon: ICONS.search, title: 'Full customer timeline', text: 'Every call, SMS, email and status change is logged on one timeline.' },
      { group: 'Follow up', icon: ICONS.code, title: 'Quoting, onboarding &amp; support workflows', text: 'Quoting, onboarding and support workflows run in the same system.' },
      { group: 'Measure', icon: ICONS.target, title: 'Campaign attribution built in', text: 'Every customer is traced back to the campaign, ad and keyword behind it — see <a href="/services/marketing-intelligence">marketing intelligence</a>.' },
      { group: 'Measure', icon: ICONS.bars, title: 'Live dashboards for revenue, pipeline &amp; activity', text: 'Live <a href="/services/marketing-intelligence">dashboards</a> for revenue, pipeline and activity.' }
    ],
    midCta: { heading: 'Not sure where to start?', text: "Book a free call. We'll map your stack, your bottlenecks and the highest-impact systems to build first.", label: 'Book a Free Call' },
    flow: {
      label: 'How it connects',
      heading: 'From first enquiry to live dashboard.',
      nodes: [
        { icon: ICONS.grid, title: 'Sources', chips: ['Ads', 'Forms', 'Calls', 'Chat'], text: 'Every enquiry, tagged by source.' },
        { icon: ICONS.bolt, title: 'CRM', text: 'Pipeline, lead routing and a full customer timeline.' },
        { icon: ICONS.bars, title: 'Dashboard', text: 'Live <a href="/services/marketing-intelligence">revenue, pipeline and activity</a> in one view.' }
      ]
    },
    steps: [
      { title: 'Discovery Call', text: 'We learn about your business, workflows, goals and bottlenecks.' },
      { title: 'Opportunity Assessment', text: 'We map the highest-impact automation and AI opportunities, ranked by business value and ROI.' },
      { title: 'Build &amp; Deploy', text: 'We implement the systems, AI agents and workflows directly into the stack you already use.' },
      { title: 'Launch &amp; Train', text: 'Everything goes live, documented and connected — with your team trained to run it confidently.' }
    ],
    // metric/result lines come from each case-study page (hero stat tiles, results and conclusion copy).
    proof: [
      { ...CASES.tristate, metric: '1 CRM — every conversation, ticket and lead in sync', result: 'One connected system captures every customer interaction and routes it — to a ticket, a lead, or a booked appointment — without anything falling through the cracks.' },
      { ...CASES.harmony, metric: '1 dashboard — live visibility across leads and follow-up activity', result: 'Captures leads, responds in about 60 seconds, follows up automatically, and tracks everything in one dashboard.' },
      { ...CASES.debatePartners, metric: 'Teams, cases and billing in one platform', result: 'Coaches manage their teams, cases, and subscriptions from one platform.' }
    ],
    faq: {
      label: 'FAQ',
      heading: 'Questions, answered.',
      items: [
        { q: 'Do you work with our current CRM or replace it?', a: 'We build into your existing stack — booking system, store platform or CRM — and connect what already works. No rip-and-replace, no new tools to learn.' },
        { q: 'What gets tracked automatically?', a: 'Every call, SMS, email and status change is logged on a full customer timeline. Every lead is tagged by source, <a href="/services/ai-automation">follow-up</a> is tracked until the lead books, and every customer is traced back to the campaign, ad and keyword behind it with <a href="/services/marketing-intelligence">attribution</a> built in.' },
        { q: 'Can the team see only what they should?', a: 'Yes. Access is role-based, and a full audit log records every change.' },
        { q: 'How long does setup take?', a: 'It depends on scope: how many pipelines, integrations and workflows you need. We give you a timeline after the opportunity assessment, before any build work starts, and nothing goes live until tracking and follow-up are tested end to end.' },
        { q: 'Is this part of Build or Grow?', a: 'CRM &amp; stack setup is part of the one-time Build phase, alongside the audit, automations and follow-up flows, and team training. The reporting dashboard and ongoing support sit in the monthly Grow phase, with no long-term lock-in. <a href="/process#phases">How Build &amp; Grow work →</a>' }
      ]
    }
  },
  {
    slug: 'seo-geo-aeo',
    card: 'Get found on Google and recommended by AI overviews, ChatGPT and Gemini.',
    name: 'SEO · AEO · GEO',
    title: 'SEO · AEO · GEO',
    icon: ICONS.search,
    sub: 'Get found on Google and recommended by AI overviews, ChatGPT and Gemini.',
    hero: { secondary: { label: "See what's included", href: '#details' } },
    problems: {
      label: 'The problem',
      heading: 'Why good businesses go unfound.',
      items: [
        { icon: ICONS.search, title: 'Invisible on Google for what you sell', text: 'If search engines cannot understand and rank your pages, the people searching for what you sell never find you.' },
        { icon: ICONS.target, title: "Competitors cited in AI answers while you're not", text: 'AI Overviews, ChatGPT and Gemini recommend other brands, and yours is not part of the answer.' },
        { icon: ICONS.code, title: "Content that isn't structured for answer engines", text: 'Content without a clear, useful answer is hard for search engines and AI assistants to pick up.' }
      ]
    },
    // The five original checklist items, each expanded using only its own wording.
    offerings: [
      { icon: ICONS.code, title: 'Technical SEO, site speed &amp; structured data', text: 'Technical SEO, site speed and structured data, so search engines can understand your site.' },
      { icon: ICONS.grid, title: 'Content engines', text: 'Articles written, optimized and published from inside the <a href="/services/crm-integration">CRM</a>.' },
      { icon: ICONS.target, title: 'Local SEO &amp; Google Business Profile management', text: 'Local SEO, plus management of your Google Business Profile.' },
      { icon: ICONS.search, title: 'AI-search visibility', text: 'AEO content AI Overviews can quote, and GEO so ChatGPT and Gemini surface you.' },
      { icon: ICONS.bars, title: 'Reporting dashboards', text: 'Dashboards that show exactly what the work is producing — see <a href="/services/marketing-intelligence">marketing intelligence</a>.' }
    ],
    midCta: { heading: 'Not sure where to start?', text: "Book a free call. We'll map your stack, your bottlenecks and the highest-impact systems to build first.", label: 'Book a Free Call' },
    // Definitions are the original text, unchanged (sourced from the beginner's guide post).
    explainer: {
      label: 'SEO vs AEO vs GEO: what is the difference?',
      tabs: ['SEO', 'AEO', 'GEO'],
      items: [
        { icon: svg('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', '2'), title: 'SEO — Search Engine Optimization', text: 'Improving a website so that search engines can understand, index, and rank its pages for relevant searches. SEO helps your page get discovered and ranked.' },
        { icon: svg('<path d="M4 4h16v12H5.2L4 17.2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="12.5" x2="13" y2="12.5"/>', '2'), title: 'AEO — Answer Engine Optimization', text: "Structuring content so that search engines and AI assistants can easily identify a clear, useful answer to a user's question. AEO helps your content provide the best direct answer." },
        { icon: svg('<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><polyline points="9 12 11 14 15 10"/>', '2'), title: 'GEO — Generative Engine Optimization', text: 'Increasing the likelihood that a brand or its content will be discovered, trusted, cited, or recommended in AI-generated answers. GEO helps your brand and content become a trusted source in generative AI responses.' }
      ],
      // Summary table: every cell is a restatement of the matching definition above, nothing more.
      columns: ['Goal', 'Where you appear', 'What we optimize'],
      rows: [
        { name: 'SEO', cells: ['Get your page discovered and ranked', 'Search engines', 'A website, so search engines can understand, index, and rank its pages for relevant searches'] },
        { name: 'AEO', cells: ['Provide the best direct answer', 'Search engines and AI assistants', "Content structure, so a clear, useful answer to a user's question is easy to identify"] },
        { name: 'GEO', cells: ['Become a trusted source in generative AI responses', 'AI-generated answers', 'The likelihood that your brand or content is discovered, trusted, cited, or recommended'] }
      ],
      note: 'They are not three completely separate marketing strategies — they overlap.',
      link: { href: '/blog/seo-aeo-geo-ai-search-guide-2', label: "Read the beginner's guide to AEO and GEO →" }
    },
    processLabel: 'How it runs',
    // Phases follow the hub's Build (one-time) / Grow (monthly) language; no result timelines.
    steps: [
      { phase: 'Build', title: 'Audit &amp; assessment', text: 'We audit what you have and design the system.' },
      { phase: 'Build', title: 'Technical fixes &amp; content engine setup', text: 'Technical SEO, site speed and structured data, and a content engine set up inside your CRM.' },
      { phase: 'Grow', title: 'Monthly content, optimization &amp; reporting', text: "We run the system, optimize it every month and show you exactly what it's producing." }
    ],
    // metric/result lines come from the GengyveUSA case-study page (hero stat tiles, results section).
    proof: [
      { ...CASES.gengyve, metric: '3 growth channels unified · 1 automation layer', result: 'The team can see how content, ads, search, and customer feedback influence each other.' }
    ],
    articles: [
      { href: '/blog/seo-aeo-geo-ai-search-guide-2', tags: ['Article', 'AEO / SEO'], title: "SEO Is No Longer Enough: A Beginner's Guide to AEO and GEO in the Age of AI Search", text: 'Learn how SEO, AEO, and GEO work together to help your business appear in Google, AI Overviews, ChatGPT, Gemini, and other AI search tools.', linkLabel: "Read the beginner's guide to AEO and GEO →" },
      { href: '/blog/microneedling-seo-med-spas', tags: ['Article', 'Industry example · Med Spas · Local SEO'], title: 'From “Microneedling Near Me” to Booked: The SEO Strategy for Med Spas', text: 'How med spas can use microneedling SEO, local search, Google Ads, and AI-focused search strategies to turn online searches into new patient opportunities.', linkLabel: 'Read the med spa SEO article →' }
    ],
    faq: {
      label: 'FAQ',
      heading: 'Questions, answered.',
      items: [
        { q: "What's the difference between SEO, AEO and GEO?", a: 'SEO helps your page get discovered and ranked. AEO helps your content provide the best direct answer. GEO helps your brand and content become a trusted source in generative AI responses. <a href="/blog/seo-aeo-geo-ai-search-guide-2">Read the beginner\'s guide to AEO and GEO →</a>' },
        { q: 'Do we need all three?', a: 'They are not three completely separate marketing strategies — they overlap, which is why this service covers SEO, AEO and GEO together.' },
        { q: 'How is reporting handled?', a: 'Through reporting dashboards that show exactly what the work is producing, alongside <a href="/services/marketing-intelligence">marketing-intelligence dashboards</a> with content performance scored for SEO, AEO and GEO, and monthly performance reporting.' },
        { q: 'Is this Build or Grow?', a: 'Both. The audit and setup sit in the one-time Build phase; ongoing content &amp; SEO · AEO · GEO and reporting are part of the monthly Grow phase, with no long-term lock-in. <a href="/process#phases">How Build &amp; Grow work →</a>' },
        { q: 'How long before we see results?', a: "We don't quote a ranking timeline up front. We give you a timeline after the opportunity assessment, before any build work starts, and the dashboard shows exactly what the work is producing each month." }
      ]
    }
  },
  {
    slug: 'ai-automation',
    card: 'Instant follow-up, nurture and internal workflows that run without your team.',
    name: 'AI agents &amp; automation',
    title: 'AI Agents & Automation',
    icon: ICONS.bolt,
    // Meta description (<=160 chars), taken from the hero copy.
    meta: 'Onboarding, reporting, data entry and hand-offs burn hours. AI agents and automations handle them: instant follow-up, nurture and workflows that run themselves.',
    schema: { serviceType: 'AI automation' },
    // Existing pain line + the existing "run without your team" outcome clause, plus one sentence from /process (Build & Deploy).
    sub: 'Onboarding, reporting, data entry and hand-offs quietly burn hours. AI agents and automations take the busywork off your team for good — instant follow-up, nurture and internal workflows that run without your team. We implement the systems, AI agents and workflows directly into the stack you already use.',
    hero: {
      title: 'AI Agents &amp; Automation',
      secondary: { label: "See what's included", href: '#details' },
      // Both stats are from the homepage "By the numbers" strip (content/home.html).
      chips: [{ val: '3s', label: 'average lead response' }, { val: '100%', label: 'message delivery logged' }],
      workflow: {
        label: 'Workflow: a trigger starts an AI agent, which works across your tools and delivers the outcome',
        nodes: [
          { icon: ICONS.target, title: 'Trigger', text: 'A new lead, request or message' },
          { icon: ICONS.bolt, title: 'AI agent', text: 'Decides and acts' },
          { icon: ICONS.grid, title: 'Your tools', text: 'CRM, email, SMS and the rest of your stack' },
          { icon: ICONS.bars, title: 'Outcome', text: 'Instant follow-up, work done, nothing re-typed' }
        ]
      }
    },
    problems: {
      label: 'The problem',
      heading: 'Busywork that quietly burns hours.',
      items: [
        { icon: ICONS.target, title: 'Manual onboarding', text: 'Every new client or lead waits on someone to start the process by hand, and the hours add up quietly.' },
        { icon: ICONS.bars, title: 'Manual reporting', text: 'Reports are assembled by hand from several tools, so they arrive late and the numbers rarely line up.' },
        { icon: ICONS.grid, title: 'Data entry &amp; hand-offs', text: 'Information re-typed between tools invites mistakes, and every hand-off is a chance for something to slip.' }
      ]
    },
    beforeAfter: {
      label: 'Before &amp; after',
      heading: "The same work, off your team's plate.",
      before: { title: 'By hand', items: ['A lead sits unanswered until someone gets to it', 'Follow-up depends on someone remembering', 'Data is re-typed between tools', 'Reports are built manually'] },
      after: { title: 'Automated', items: ['Instant follow-up — leads hear back in about 3 seconds on average', 'Nurture flows keep every lead moving without anyone chasing', 'Systems sync themselves through secure API integrations', 'Reports and dashboards update themselves'] }
    },
    offerings: [
      { icon: ICONS.bolt, title: 'AI agents &amp; assistants for support, sales &amp; research', text: 'Assistants take on the repetitive work in support, sales and research, so your team spends its time on the conversations that need a person.' },
      { icon: ICONS.grid, title: 'Workflow automation across your whole stack', text: 'Triggers, hand-offs and routine tasks run on their own across the tools you already use.' },
      { icon: ICONS.code, title: 'Secure API integrations across your existing tools', text: 'Your systems exchange data directly, so nothing has to be re-typed from one tool into another.' },
      { icon: ICONS.target, title: 'Voice AI', text: 'AI agents that work over voice, alongside the text-based assistants above.' },
      { icon: ICONS.bolt, title: 'Automated follow-up &amp; nurture flows', text: 'Email and SMS nurture flows follow up with every lead automatically, so no enquiry goes cold.' },
      { icon: ICONS.grid, title: 'Built into your existing CRM &amp; stack', text: 'We connect what already works — your booking system, store platform or <a href="/services/crm-integration">CRM</a> — with no rip-and-replace.' },
      { icon: ICONS.search, title: 'Document processing &amp; scoring', text: 'OCR and AI read documents, score them against your criteria and track every case in one dashboard.' },
      { icon: ICONS.bars, title: 'Data aggregation &amp; AI scoring', text: 'Data is pulled in from multiple sources automatically, then scored and ranked with AI.' }
    ],
    midCta: { heading: 'Not sure what to automate first?', text: "Book a free call. We'll map your stack, your bottlenecks and the highest-impact systems to build first.", label: 'Book a Free Call' },
    useCases: {
      label: 'Use cases',
      heading: 'Where agents and automations earn their keep.',
      items: [
        { icon: ICONS.bolt, title: 'Lead follow-up &amp; nurture', text: 'A new enquiry gets an instant reply, then a nurture flow keeps the conversation moving until the lead books.' },
        { icon: ICONS.grid, title: 'Internal workflow automation', text: 'Onboarding steps, data entry, reporting and hand-offs between tools run on their own across your stack.' },
        { icon: ICONS.search, title: 'Support &amp; research agent', text: 'An AI assistant handles routine support questions and does the research legwork for your team.' }
      ]
    },
    stack: ['n8n', 'Make', 'LangChain / LangGraph', 'OpenAI', '<a href="/services/crm-integration">CRMs</a>'],
    stackSection: true,
    steps: [
      { title: 'Discovery Call', text: 'We learn about your business, workflows, goals and bottlenecks.' },
      { title: 'Opportunity Assessment', text: 'We map the highest-impact automation and AI opportunities, ranked by business value and ROI.' },
      { title: 'Build &amp; Deploy', text: 'We implement the systems, AI agents and workflows directly into the stack you already use.' },
      { title: 'Launch &amp; Train', text: 'Everything goes live, documented and connected — with your team trained to run it confidently.' }
    ],
    // metric/result lines come from each case-study page (hero stat tiles, results and conclusion copy).
    proof: [
      { ...CASES.settlein, metric: 'Automated · Scored · Tracked', result: "Documents are read, scored, and tracked automatically from the moment they're submitted." },
      { ...CASES.debatePartners, metric: 'Policy, LD and Public Forum supported', result: 'Sources are analyzed and turned into evidence-backed cases automatically, in the format each team competes in.' },
      { ...CASES.mamasCompass, metric: 'Pricing and stock monitored continuously', result: 'Product data, pricing, and stock stay in sync automatically, with AI scoring keeping rankings meaningful as the catalog grows.' },
      { ...CASES.energybits, metric: '15+ platforms connected', result: 'Content is evaluated before publication, when improvements are easiest to make.' }
    ],
    faq: {
      label: 'FAQ',
      heading: 'Questions, answered.',
      items: [
        { q: 'Do you build into our existing tools?', a: 'Yes. We build into your existing stack — booking system, store platform or <a href="/services/crm-integration">CRM</a> — and connect what already works. No rip-and-replace, no new tools to learn.' },
        { q: 'What does an agent actually do day-to-day?', a: 'It takes on support, sales and research work and runs the follow-up, nurture and internal workflows that used to land on your team — instant replies, data moved between tools, routine tasks done without anyone chasing them.' },
        { q: 'How long does a typical automation build take?', a: 'It depends on scope: how many workflows and integrations you need. We give you a timeline after the opportunity assessment, before any build work starts, and automations only launch once tracking and follow-up are tested end to end.' },
        { q: 'What does it cost, and how is it priced?', a: "Every engagement starts with a free 30-minute call and an honest read on what's worth building. Pricing is a one-time build fee, then a monthly growth retainer with no long-term lock-in. Third-party tools (CRM licences, SMS/email credits) are billed separately." },
        { q: 'What happens after launch — who maintains it?', a: "Everything goes live documented and connected, with your team trained to run it confidently. After that, the monthly retainer covers ongoing optimization and support: we run the system, improve it every month and show you exactly what it's producing." }
      ]
    }
  },
  {
    slug: 'marketing-intelligence',
    card: 'Spend, ROAS, LTV and content performance unified across every connected platform.',
    name: 'Marketing intelligence',
    title: 'Marketing Intelligence',
    icon: ICONS.bars,
    sub: 'Spend, ROAS, LTV and content performance unified across every connected platform.',
    // Merged page: the former Google & Meta Ads service (campaigns, landing pages, nurture, pricing note) now lives here.
    // Meta description (<=160 chars) built from the two existing hero lines.
    meta: 'Spend, ROAS and LTV unified across every platform, with Google & Meta campaigns and landing pages tuned to spend where it actually sells.',
    hero: {
      title: 'Marketing Intelligence',
      eyebrow: 'Services',
      // Both existing lines (this page's and the former Google & Meta Ads page's), joined.
      sub: 'Spend, ROAS, LTV and content performance unified across every connected platform — with intent-driven Google &amp; Meta campaigns and landing pages tuned to spend where it actually sells.',
      secondary: { label: "See what's included", href: '#details' },
      // Both figures are the live-client numbers already used on the site (HARMONY_STATS); only the 60 counts up.
      chips: [{ val: '60+', label: 'leads in 2 months', count: true }, { val: '~$50', label: 'cost per lead' }],
      // Labels only, no figures: the tiles and trace use the page's own terms (spend, ROAS, LTV; campaign, ad, keyword).
      dashboard: { label: 'Dashboard: spend, ROAS and LTV, with each booked customer traced to its campaign, ad and keyword', tiles: ['Spend', 'ROAS', 'LTV'], trace: ['Campaign', 'Ad', 'Keyword'] }
    },
    problems: {
      label: 'The problem',
      heading: 'Where ad spend quietly leaks.',
      items: [
        { icon: ICONS.bars, title: 'Ad spend with no clear return', text: 'Money goes into ads, but nobody can say clearly what it brought back.' },
        { icon: ICONS.code, title: "Clicks land on pages that don't convert", text: 'Paid visitors arrive and leave without enquiring, so the budget is spent before a lead ever exists.' },
        { icon: ICONS.bolt, title: 'Follow-up is too slow, so paid leads go cold', text: 'Interest cools while a lead waits for a reply. <a href="/services/ai-automation">Instant follow-up</a> keeps paid leads warm.' }
      ]
    },
    // Original marketing-intelligence checklist (4 items) + the original Google & Meta Ads checklist (campaigns split into Google / Meta; its reporting item is the last step of The Loop).
    offerings: [
      { group: 'Campaigns', lg: true, icon: ICONS.search, title: 'Google Ads', text: 'Google ad campaigns — intent-driven and tuned to spend where it actually sells.' },
      { group: 'Campaigns', lg: true, icon: ICONS.target, title: 'Meta Ads', text: 'Meta ad campaigns built on the same intent-driven approach, tuned to spend where it actually sells.' },
      { group: 'Conversion &amp; follow-up', icon: ICONS.code, title: 'Landing pages &amp; conversion optimization', text: 'Landing pages and conversion optimization, so the clicks you pay for land on pages built to convert.' },
      { group: 'Conversion &amp; follow-up', icon: ICONS.bolt, title: 'Automated email &amp; SMS nurture flows', text: 'Nurture flows that keep following up after the first click — more on <a href="/services/ai-automation">AI agents &amp; automation</a>.' },
      { group: 'Intelligence', icon: ICONS.bars, title: 'One dashboard for spend, ROAS and LTV', text: 'Spend, ROAS and LTV together in a single dashboard.' },
      { group: 'Intelligence', icon: ICONS.target, title: 'Every booked customer traced to its source', text: 'Every booked customer is traced to the campaign, ad and keyword behind it.' },
      { group: 'Intelligence', icon: ICONS.search, title: 'Content performance with SEO, AEO &amp; GEO scoring', text: 'Content performance, scored for SEO, AEO and GEO before publish.' },
      { group: 'Intelligence', icon: ICONS.grid, title: 'Monthly performance reporting', text: 'A monthly report on how everything performed.' }
    ],
    flow: {
      label: 'The loop',
      heading: 'From ad click to reported result.',
      nodes: [
        { icon: ICONS.target, title: 'Ad click', text: 'Intent-driven Google and Meta campaigns.' },
        { icon: ICONS.code, title: 'Landing page', text: 'Landing pages built for conversion.' },
        { icon: ICONS.bolt, title: 'Instant follow-up &amp; nurture', text: '<a href="/services/ai-automation">Automated follow-up</a> by email and SMS.' },
        { icon: ICONS.bars, title: 'Dashboard reporting', text: 'One dashboard for spend, ROAS and LTV, with every booked customer traced back.' }
      ]
    },
    midCta: { heading: 'Not sure where to start?', text: "Book a free call. We'll map your stack, your bottlenecks and the highest-impact systems to build first.", label: 'Book a Free Call' },
    midCtaAfter: 'flow',
    note: 'One-time build fee (audit, setup, launch) · then monthly growth retainer · no long-term lock-in. <a href="/process#phases">How Build &amp; Grow work →</a>',
    noteSection: true,
    proof: [
      { ...CASES.harmony, stats: HARMONY_STATS },
      { ...CASES.energybits, metric: '15+ platforms connected' },
      CASES.gengyve
    ],
    faq: {
      label: 'FAQ',
      heading: 'Questions, answered.',
      items: [
        { q: 'How is ad spend handled alongside your fee?', a: 'Pricing is a one-time build fee, then a monthly growth retainer with no long-term lock-in. Third-party tools and costs (ad spend, CRM licences, SMS/email credits) are billed separately.' },
        { q: 'How fast do campaigns launch?', a: 'We give you a timeline after the opportunity assessment, before any build work starts, and campaigns only launch once tracking and follow-up are tested end to end.' },
        { q: 'Do you build the landing pages too?', a: 'Yes. Landing pages and conversion optimization are part of what we build, alongside the campaigns.' },
        { q: 'How do we see results?', a: 'Reporting runs through one dashboard for spend, ROAS and LTV, with every booked customer traced to the campaign, ad and keyword behind it, plus a monthly performance report.' },
        { q: 'Is there a long-term lock-in?', a: 'No. It is a one-time build fee, then a monthly growth retainer with no long-term lock-in.' }
      ]
    }
  }
];

export const getService = (slug) => services.find((s) => s.slug === slug);
