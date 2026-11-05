// Shared types for the Meta Ads dashboard. The data comes only from two private
// Google Sheets (never the Meta/Facebook API). Numbers are already parsed to
// `number`; IDs and phone stay `string` because they are long identifiers.

/** One row of Sheet 1 ("Ad Insights") — one ad on one day. */
export interface AdRow {
  /** YYYY-MM-DD in Pakistan time (Asia/Karachi). */
  date: string;
  campaign: string;
  adSet: string;
  adName: string;
  adId: string;
  spend: number;
  currency: string;
  impressions: number;
  reach: number;
  /** Meta's own per-row frequency (we recompute an approx. for totals). */
  frequency: number;
  clicksAll: number;
  linkClicks: number;
  /** Meta's reported per-row CTR %; totals are recomputed, not averaged. */
  ctr: number;
  cpc: number;
  cpm: number;
  leads: number;
  /** null when there were no leads that day (shown as "—"). */
  costPerLead: number | null;
  landingPageViews: number;
  postEngagement: number;
  videoPlays: number;
  thruPlays: number;
  video25: number;
  video50: number;
  video100: number;
  /** "UNKNOWN" is normalised to "Not enough data". */
  qualityRanking: string;
  engagementRanking: string;
}

/** One row of Sheet 2 ("Untitled") — a real person from a Facebook Instant Form. */
export interface LeadRow {
  /** "YYYY-MM-DD HH:mm" in Pakistan time, as stored by Make.com. */
  dateTime: string;
  /** YYYY-MM-DD part of dateTime, for date-range filtering. */
  date: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  city: string;
  campaign: string;
  adSet: string;
  adName: string;
  platform: string;
  organic: string;
  formId: string;
  leadId: string;
  adId: string;
}

/** Shape returned by GET /api/meta-ads. */
export interface MetaAdsPayload {
  ads: AdRow[];
  leads: LeadRow[];
  /** ISO timestamp of when the data was fetched from Google. */
  fetchedAt: string;
}

/** Summed/derived metrics for a set of ad rows. See lib/metaMetrics.ts. */
export interface Metrics {
  spend: number;
  impressions: number;
  reach: number;
  clicksAll: number;
  linkClicks: number;
  leads: number;
  landingPageViews: number;
  postEngagement: number;
  videoPlays: number;
  thruPlays: number;
  video25: number;
  video50: number;
  video100: number;
  /** All derived rates are null when their denominator is 0 (shown as "—"). */
  ctrAll: number | null;
  linkCtr: number | null;
  cpc: number | null;
  cpm: number | null;
  costPerLead: number | null;
  leadConversionRate: number | null;
  frequencyApprox: number | null;
  videoHookRate: number | null;
  thruPlayRate: number | null;
}
