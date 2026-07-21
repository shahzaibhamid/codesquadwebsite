import type { Service, Build } from '@/types';

/** The eight core services offered by CodeSquad. */
export const services: Service[] = [
  {
    icon: 'target', title: 'Outbound',
    desc: 'Automated outbound systems that find the right prospects, personalize outreach, and create qualified sales conversations at scale.',
    points: ['Prospect research and lead enrichment', 'Personalized email and LinkedIn outreach', 'Automated follow-up and CRM updates'],
  },
  {
    icon: 'reply', title: 'Inbound',
    desc: 'Turn incoming interest into booked meetings with fast, intelligent lead capture, qualification, routing, and follow-up.',
    points: ['Instant lead response across channels', 'Automated qualification and routing', 'Meeting booking and nurture workflows'],
  },
  {
    icon: 'search', title: 'SEO · AEO · GEO',
    desc: 'Build visibility across search engines, answer engines, and generative AI platforms with technically sound, authoritative content.',
    points: ['Search and answer-engine strategy', 'Technical audits and content optimization', 'Rankings, citations, and visibility tracking'],
  },
  {
    icon: 'workflow', title: 'Content Automation',
    desc: 'Create a reliable content engine that turns ideas and source material into on-brand content ready for review and publishing.',
    points: ['Research, briefs, drafts, and repurposing', 'Brand voice and approval workflows', 'Automated scheduling and publishing'],
  },
  {
    icon: 'chart', title: 'Ads',
    desc: 'Connect campaign data, creative workflows, and reporting so your team can improve performance without manual spreadsheet work.',
    points: ['Cross-platform campaign reporting', 'Creative and audience performance insights', 'Automated alerts and optimization workflows'],
  },
  {
    icon: 'headset', title: 'Customer Support',
    desc: 'AI-assisted support systems that resolve routine requests quickly while giving your team the context to handle complex issues.',
    points: ['24/7 first-response coverage', 'Knowledge-base and ticket automation', 'Smart escalation with full context'],
  },
  {
    icon: 'layers', title: 'Back Office',
    desc: 'Remove operational bottlenecks by connecting the tools and workflows behind finance, admin, reporting, and delivery.',
    points: ['Data entry and document processing', 'Billing, reporting, and admin workflows', 'System integrations and audit trails'],
  },
  {
    icon: 'robot', title: 'AI Agents',
    desc: 'Deploy task-specific AI agents that reason, use your business tools, and complete real work with the right human controls.',
    points: ['Research, analysis, and task execution', 'CRM, inbox, document, and app integrations', 'Human approval and operational safeguards'],
  },
];

/** "What We Build" grid on the Home page. */
export const builds: Build[] = [
  { icon: 'workflow', title: 'Automation Engines', desc: 'Reliable workflows that run your repetitive operations without manual effort.' },
  { icon: 'robot', title: 'AI Agents', desc: 'Agents that complete real tasks inside your existing tools and data.' },
  { icon: 'reply', title: 'Inbound & Outbound Systems', desc: 'Funnels and outreach that capture, qualify, and follow up automatically.' },
  { icon: 'layers', title: 'Back-Office Workflows', desc: 'Ops, billing, and admin processes streamlined end to end.' },
  { icon: 'chart', title: 'Dashboards & Reporting', desc: 'Live visibility into leads, sales, and performance in one place.' },
  { icon: 'code', title: 'Custom Software', desc: 'Bespoke apps and integrations engineered for scale.' },
];

/** Tools and platforms marquee. */
export const tools: string[] = [
  'OpenAI', 'Anthropic', 'n8n', 'Make', 'Zapier', 'HubSpot', 'Airtable',
  'Supabase', 'Next.js', 'WordPress', 'Twilio', 'Slack', 'Google Sheets', 'Stripe',
];
