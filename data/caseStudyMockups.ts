import type { CaseStudyMockupProps } from '@/components/sections/CaseStudyMockup';

/** Illustrative "system" visual shown for case studies with no uploaded
 *  cover photo — original artwork describing the delivered system, not a
 *  screenshot of the client's actual site or product. Used both as the
 *  case-study hero visual and as the card thumbnail on /case-studies. */
export const caseStudyMockups: Record<string, CaseStudyMockupProps> = {
  'modern-law': {
    eyebrow: 'Content operations',
    title: '4 brands. One publishing engine.',
    stats: [{ value: '4', label: 'Brands connected' }, { value: '1', label: 'Unified workflow' }],
    rows: ['Brief approved', 'Draft generated per brand voice', 'Social variants created', 'Queued for review'],
    accent: '#8a6d3b',
  },
  ipromo: {
    eyebrow: 'Campaign pipeline',
    title: 'Product-of-the-month, automated.',
    stats: [{ value: '25+', label: 'Years in business' }, { value: '1', label: 'Connected pipeline' }],
    rows: ['Product image generated', 'Salesforce record enriched', 'Campaign email queued', 'Analysis report ready'],
    accent: '#2f6fae',
  },
  gengyveusa: {
    eyebrow: 'Marketing intelligence',
    title: 'SEO, ads, and reviews — one view.',
    stats: [{ value: '3', label: 'Channels unified' }, { value: '2,674+', label: 'Reviews analyzed' }],
    rows: ['Keyword rankings synced', 'Ad spend pulled from Meta & Google', 'Review sentiment tagged', 'Content brief generated'],
    accent: '#3f8f6e',
  },
  energybits: {
    eyebrow: 'Content & search intelligence',
    title: '15+ platforms. One publishing brain.',
    stats: [{ value: '15+', label: 'Platforms connected' }, { value: '3', label: 'Search scores' }],
    rows: ['Platform signals ingested', 'Draft scored for SEO · AEO · GEO', 'Editorial queue updated', 'Post scheduled'],
    accent: '#1e3a5f',
  },
  'tristate-auto-sales': {
    eyebrow: 'Omnichannel engagement',
    title: 'Every conversation, one connected system.',
    stats: [{ value: '8', label: 'Connected workflows' }, { value: '1', label: 'Shared CRM' }],
    rows: ['Conversation classified by intent', 'Lead scored and routed', 'Appointment booked', 'Follow-up sent automatically'],
    accent: '#b23b2f',
  },
};
