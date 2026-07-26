/** Shared content types. These double as the shape Supabase tables should
 *  return later, so swapping static data for a query is a drop-in change. */

export type IconName =
  | 'bolt' | 'robot' | 'reply' | 'chart' | 'search' | 'code' | 'target'
  | 'headset' | 'layers' | 'workflow' | 'shield' | 'rocket' | 'check' | 'x'
  | 'arrow' | 'arrow-ur' | 'sun' | 'moon' | 'phone' | 'mail' | 'eye' | 'eye-off';

export interface Service {
  icon: IconName;
  title: string;
  desc: string;
  points: string[];
}

export interface Build {
  icon: IconName;
  title: string;
  desc: string;
}

export interface CaseStudy {
  slug: string;
  name: string;
  url: string;
  category: string;
  services: string;
  desc: string;
  published: boolean;
  sortOrder: number;
  /** Optional long-form CMS fields. Text fields intentionally have no length limit. */
  kicker?: string;
  headline?: string;
  challenge?: string;
  solution?: string;
  implementation?: string;
  results?: string;
  conclusion?: string;
  metrics?: string;
  capabilities?: string;
  mediaLinks?: string[];
  coverImage?: string;
  challengeMedia?: string[];
  solutionMedia?: string[];
  implementationMedia?: string[];
  resultsMedia?: string[];
  conclusionMedia?: string[];
  challengeMediaPlacement?: 'start' | 'inline' | 'end';
  solutionMediaPlacement?: 'start' | 'inline' | 'end';
  implementationMediaPlacement?: 'start' | 'inline' | 'end';
  resultsMediaPlacement?: 'start' | 'inline' | 'end';
  conclusionMediaPlacement?: 'start' | 'inline' | 'end';
  testimonial?: string;
  testimonialAuthor?: string;
  /** Industry/vertical used by the /case-studies filter tabs — an
   *  admin-managed value (see lib/industries.ts), not a fixed set. Leave
   *  unset to keep a case study out of the curated homepage grid while still
   *  appearing under "All" on the /case-studies index. */
  vertical?: string;
  /** Short stat shown on case-study cards, e.g. "60 sec response". */
  headlineMetric?: string;
  /** Pipe-delimited `Question | Answer`, one per line. */
  faq?: string;
  /** Pipe-delimited `icon-keyword | Title | Description`, one per line (up to 3). */
  iconHighlights?: string;
  /** Pipe-delimited `Metric | Before | After`, one per line. */
  beforeAfter?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  role: string;
  url?: string;
}

export interface ApproachStep {
  icon: IconName;
  title: string;
  desc: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  /** Business/company name. */
  company?: string;
  /** Free-text message — for Base Camp this holds the "biggest business challenge". */
  message?: string;
  /** Applicant's role (Base Camp application). */
  role?: string;
  /** Current tools they use (Base Camp application, optional). */
  tools?: string;
  /** Which form the lead came from. */
  source: 'growth-club' | 'ai-basecamp' | 'ai-audit' | 'contact';
  createdAt: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;        // ISO or display date
  excerpt: string;
  /** Full HTML body (paragraphs/headings). */
  content: string;
  /** Optional YouTube URL — its thumbnail auto-fills the card. */
  youtube?: string;
  /** Optional featured image path under /public. */
  image?: string;
  placeholder?: boolean;
}
