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
  'careinn-dental-clinic': {
    eyebrow: 'Patient growth systems',
    title: 'Live before the first patient walked in.',
    stats: [{ value: '24/7', label: 'Lead capture & follow-up' }, { value: '5', label: 'Touch follow-up sequence' }],
    rows: ['Enquiry captured automatically', 'Instant response sent', '14-day follow-up sequence triggered', 'Visibility live on one dashboard'],
    accent: '#6d4aa8',
  },
  'rtm-kinetics': {
    eyebrow: 'Remote patient monitoring',
    title: 'From lead to recovery, one connected system.',
    stats: [{ value: '1', label: 'CRM for the full lifecycle' }, { value: 'Live', label: 'Recovery tracking' }],
    rows: ['Lead captured and routed', 'Reconnect campaign triggered for quiet leads', 'Therapist dashboard updated in real time', 'Recovery progress tracked to completion'],
    accent: '#2f6fae',
  },
  'law-signal': {
    eyebrow: 'Legal media automation',
    title: 'Case files in. Press-ready media out.',
    stats: [{ value: 'Auto', label: 'Case files to press-ready media' }, { value: 'Synced', label: 'CRM & back office' }],
    rows: ['Case file ingested', 'Video and release drafted automatically', 'CRM and back office synced', 'Published with SEO & AEO optimization'],
    accent: '#8a6d3b',
  },
  'mamas-compass': {
    eyebrow: 'Product comparison & aggregation',
    title: 'Scattered listings. One confident comparison.',
    stats: [{ value: 'AI', label: 'Products ranked automatically' }, { value: 'Live', label: 'Pricing & stock monitored' }],
    rows: ['Product data pulled from multiple sources', 'Listings scored and ranked by AI', 'Pricing and stock refreshed continuously', 'SEO content generated for every comparison'],
    accent: '#b23b2f',
  },
  settlein: {
    eyebrow: 'Document & eligibility processing',
    title: 'Manual review, replaced by an eligibility engine.',
    stats: [{ value: 'OCR', label: 'Documents read automatically' }, { value: '1', label: 'Dashboard for every application' }],
    rows: ['Document uploaded and read via OCR', 'Eligibility scored against criteria', 'Applicant notified with clear feedback', 'Status tracked on one dashboard'],
    accent: '#3f8f6e',
  },
  'debate-partners': {
    eyebrow: 'Competitive debate platform',
    title: 'Research in. Ready-to-run cases out.',
    stats: [{ value: 'Auto', label: 'Sources turned into cases' }, { value: '3', label: 'Formats supported' }],
    rows: ['Source material analyzed', 'Evidence-backed case drafted automatically', 'Team and coach access managed', 'Billing and subscriptions handled in one platform'],
    accent: '#1e3a5f',
  },
};
