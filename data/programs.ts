import type { IconName } from '@/types';

/**
 * Base Camp (free, application-only community) + AI Audit (paid offer).
 * Edit copy here.
 */

export interface ProgramFeature {
  icon: IconName;
  title: string;
  desc: string;
}

/**
 * Base Camp — a free, application-only community for SME owners.
 * Content follows the client-provided "Base Camp Community Landing Page"
 * structure doc. Primary conversion goal: apply to join the community.
 * (Lives at /ai-basecamp so existing links keep working.)
 */
export const growthClub = {
  eyebrow: 'Base Camp — Free · Application Only',
  ctaLabel: 'Apply to Join Base Camp',

  hero: {
    headline: 'Stop Guessing. Start Building Systems That Actually Grow Your Business.',
    sub: 'Join Base Camp — a free, application-only community for SME owners who want practical AI, automation, lead generation, and business systems.',
    secondaryLabel: 'Already know what you need? Book an Audit instead',
    secondaryHref: '/ai-audit',
  },

  why: {
    title: 'Why Base Camp exists',
    copy: 'SME owners don’t need more AI content. You need practical business systems for growth, automation, reporting, and lead generation — the operational building blocks that actually move a business forward. Base Camp is built around those systems, not the hype.',
  },

  whatYouGet: [
    { icon: 'workflow', title: 'Practical Business Systems', desc: 'Real, usable systems for growth, automation, reporting, and lead generation — not theory.' },
    { icon: 'headset', title: 'Weekly Business Growth Sessions', desc: 'A live session every week — lesson, Q&A, and system reviews. All sessions are recorded.' },
    { icon: 'layers', title: 'Templates, SOPs & Resources', desc: 'Copy-ready templates, SOPs, and resources you can drop straight into your own business.' },
  ] as ProgramFeature[],

  who: {
    forText: 'Exclusively for SME owners, founders, operators, and business decision-makers who run an active business.',
    good: [
      'SME owners and founders',
      'Operators and business decision-makers',
      'Businesses with real workflows and revenue',
    ],
    not: [
      'Students exploring AI out of curiosity',
      'Freelancers without an active business',
      'Anyone without an operating business',
    ],
  },

  inside: [
    { icon: 'rocket', title: 'Start Here', desc: 'Orientation and the fastest path to your first win inside the community.' },
    { icon: 'chart', title: 'SME Growth Systems', desc: 'The core systems for growing an SME — repeatable and practical.' },
    { icon: 'workflow', title: 'Automation Breakdowns', desc: 'Step-by-step breakdowns of real automations you can rebuild.' },
    { icon: 'layers', title: 'Templates & Resources', desc: 'A growing library of templates, SOPs, and resources.' },
    { icon: 'headset', title: 'Business Growth Sessions', desc: 'Every weekly session, recorded and organized for easy catch-up.' },
    { icon: 'code', title: 'Work With CodeSquad', desc: 'How to go further with audits and done-for-you implementation when you’re ready.' },
  ] as ProgramFeature[],

  sessions: {
    title: 'Weekly Business Growth Sessions',
    copy: 'Every week: a focused lesson, live Q&A, a business/system review, and clear, actionable next steps. Can’t make it live? Every session is recorded so you never miss anything.',
    points: ['Weekly lesson', 'Live Q&A', 'Business & system review', 'Actionable next steps', 'All sessions recorded'],
  },

  free: {
    title: 'A genuinely free community',
    copy: 'Base Camp is completely free. Entry is application-based purely to keep the quality high and the members serious. Community learning is free — audits and implementation are separate paid services, with no pressure to buy.',
  },

  how: [
    { icon: 'reply', step: 'Step 1', title: 'Complete the Application', desc: 'Tell us about your business and your biggest challenge.' },
    { icon: 'eye', step: 'Step 2', title: 'We Review Your Application', desc: 'Every application is reviewed manually, usually within 24–48 hours.' },
    { icon: 'check', step: 'Step 3', title: 'Receive Your Invitation', desc: 'Get your invite and join Base Camp.' },
  ] as { icon: IconName; step: string; title: string; desc: string }[],

  form: {
    title: 'Apply to Join Base Camp',
    note: 'Every application is reviewed manually. Free • Application only • Built exclusively for SME owners.',
    roleOptions: ['Founder / Owner', 'Operator', 'Manager / Team Lead', 'Other'],
  },

  audit: {
    title: 'Ready to go further?',
    copy: 'When you want a done-with-you plan for your specific business, the 20-Day AI Growth & Automation Audit maps your workflows and hands you a prioritized, build-ready roadmap.',
    ctaLabel: 'Explore the Audit',
    href: '/ai-audit',
  },

  finalCta: {
    heading: 'Join Base Camp',
    ctaLabel: 'Apply to Join',
    microcopy: 'Free • Application Only • Built Exclusively for SME Owners',
  },
};

export interface AuditPhase {
  icon: IconName;
  days: string;
  phase: string;
  whatHappens: string;
  deliverable: string;
}

export interface AuditComparePair {
  without: string;
  with: string;
}

/**
 * AI Audit — content structure follows the CodeSquad "20-Day AI Growth &
 * Automation Audit" page spec (client-provided webpage structure doc).
 * Primary conversion goal throughout: book the audit discovery call.
 */
export const audit = {
  eyebrow: 'AI Audit',
  ctaLabel: 'Book Your Audit Call',
  microcopy: 'A 30-minute discovery call. No obligation. We will tell you honestly if the audit is not the right fit.',

  hero: {
    headline: 'Stop Guessing What to Automate. Build a Clear Growth Roadmap in Just 20 Days.',
    sub: 'The CodeSquad AI Growth & Automation Audit helps SME owners understand where time, money, and effort are being lost, identify the highest-value automation opportunities, and leave with a practical implementation roadmap built around their business.',
    secondaryLink: 'Not ready yet? Join the CodeSquad Base Camp.',
    secondaryHref: '/ai-basecamp',
  },

  trustBar: [
    { icon: 'workflow', label: 'Business Process Analysis' },
    { icon: 'chart', label: 'Cost Reduction Opportunities' },
    { icon: 'robot', label: 'AI Readiness Assessment' },
    { icon: 'target', label: 'Prioritized Automation Roadmap' },
    { icon: 'headset', label: 'Executive Delivery Session' },
  ] as { icon: IconName; label: string }[],

  evaluation: [
    { icon: 'workflow', title: 'Business Processes', desc: 'How work moves across your team and where bottlenecks exist.' },
    { icon: 'reply', title: 'Lead Management', desc: 'How leads are captured, followed up, qualified, and tracked.' },
    { icon: 'arrow-ur', title: 'Customer Journey', desc: 'Where prospects or customers experience delays, confusion, or drop-off.' },
    { icon: 'bolt', title: 'Operational Efficiency', desc: 'Where manual work, duplicate effort, or unnecessary handoffs are slowing the business.' },
    { icon: 'robot', title: 'AI & Automation Readiness', desc: 'Which processes are suitable for automation and which should remain human-led.' },
    { icon: 'chart', title: 'Costs & Time Savings', desc: 'Where improvements may reduce operating effort, delay, or unnecessary expense.' },
    { icon: 'eye', title: 'Dashboards & KPIs', desc: 'Whether decision-makers have the visibility needed to manage performance.' },
    { icon: 'target', title: 'Growth Bottlenecks', desc: 'What is preventing the business from scaling efficiently.' },
  ] as ProgramFeature[],

  process: [
    {
      icon: 'search',
      days: 'Days 1–3',
      phase: 'Business Discovery & Current-State Assessment',
      whatHappens: 'We review business goals, team structure, tools, workflows, operational challenges, and existing manual processes.',
      deliverable: 'Current-State Assessment and confirmed audit scope.',
    },
    {
      icon: 'workflow',
      days: 'Days 4–10',
      phase: 'Process Mapping & Cost Analysis',
      whatHappens: 'We map the most important workflows, identify bottlenecks, duplicate effort, cost-heavy activities, and realistic automation opportunities.',
      deliverable: 'Visual process maps, bottleneck analysis, and estimated time/cost-saving opportunities.',
    },
    {
      icon: 'layers',
      days: 'Days 11–13',
      phase: 'Competitive & Capability Gap Analysis',
      whatHappens: 'We compare the current operating model with relevant industry practices and modern AI-enabled workflows.',
      deliverable: 'Gap analysis showing where the business is ahead, behind, or missing key capabilities.',
    },
    {
      icon: 'target',
      days: 'Days 14–16',
      phase: 'Priority Matrix & Opportunity Ranking',
      whatHappens: 'We rank recommendations by business impact, complexity, cost, urgency, and expected value.',
      deliverable: 'A clear priority matrix showing what to do now, next, and later.',
    },
    {
      icon: 'rocket',
      days: 'Days 17–20',
      phase: 'Strategic Action Plan & Delivery Session',
      whatHappens: 'We combine the findings into a sequenced roadmap and present it in a live executive walkthrough.',
      deliverable: 'Executive summary, process maps, priority roadmap, implementation timeline, and final strategy session.',
    },
  ] as AuditPhase[],

  why: {
    copy: 'Every business is different. We do not begin by recommending software. We begin by understanding how your business works, where the largest operational opportunities exist, and which improvements are worth implementing first. This reduces guesswork and helps you invest in systems that create measurable business value.',
    pairs: [
      { without: 'Random tool purchases', with: 'Business-first analysis' },
      { without: 'Unclear priorities', with: 'Prioritized opportunities' },
      { without: 'Automating the wrong process', with: 'Clear effort-versus-impact decisions' },
      { without: 'Wasted budget and team effort', with: 'Defined roadmap and ownership' },
      { without: 'No measurable implementation plan', with: 'Better basis for ROI and implementation' },
    ] as AuditComparePair[],
  },

  fit: {
    good: [
      'SME owners, founders, and operators',
      'Businesses with active teams and real workflows',
      'Decision-makers who want a plan before committing to implementation',
      'Companies seeking efficiency, visibility, or scalable processes',
    ],
    not: [
      'Students exploring AI out of curiosity',
      'Idea-stage businesses without operating processes',
      'People seeking free one-to-one consulting',
      'Businesses wanting an immediate build without discovery or planning',
    ],
  },

  after: {
    copy: 'The audit is a complete, standalone engagement. You can take the roadmap and implement it internally. If you want CodeSquad to build the recommended systems, implementation is scoped separately. There is no obligation to continue after the audit.',
    paths: [
      { icon: 'code', title: 'Implement Internally', desc: 'You take the roadmap and execute it with your own team.' },
      { icon: 'rocket', title: 'CodeSquad Implementation', desc: 'CodeSquad scopes a separate monthly engagement to build, integrate, monitor, and optimize the approved systems.' },
    ] as { icon: IconName; title: string; desc: string }[],
  },

  finalCta: {
    heading: 'Build Smarter Systems. Make Better Decisions.',
    text: 'Discover where AI and automation can create the greatest impact in your business with a structured 20-Day AI Growth & Automation Audit.',
    microcopy: '30-minute discovery call. No obligation. We will tell you honestly if the audit is right for your business.',
  },

  community: {
    copy: 'Still exploring AI and automation? Join the CodeSquad Base Camp for practical business systems, templates, and community sessions. The first 100 approved members receive lifetime community access.',
    ctaLabel: 'Join Base Camp',
    href: '/ai-basecamp',
  },
};
