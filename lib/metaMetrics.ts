// All Meta Ads math lives here. Golden rule: derived rates (CTR, CPC, CPM, CPL…)
// are ALWAYS recomputed from summed totals — we never average the daily % columns,
// because averaging percentages across days is statistically wrong.
//
// Every division is guarded against a zero denominator and returns `null`, which
// the UI renders as "—".

import type { AdRow, Metrics } from './metaTypes';

/** Safe division: returns null when the denominator is 0 (or not finite). */
export function div(numerator: number, denominator: number): number | null {
  if (!denominator || !Number.isFinite(denominator)) return null;
  const r = numerator / denominator;
  return Number.isFinite(r) ? r : null;
}

const sum = (rows: AdRow[], pick: (r: AdRow) => number): number =>
  rows.reduce((acc, r) => acc + (pick(r) || 0), 0);

/** Aggregate a set of ad rows into totals + correctly-derived rates. */
export function computeMetrics(rows: AdRow[]): Metrics {
  const spend = sum(rows, (r) => r.spend);
  const impressions = sum(rows, (r) => r.impressions);
  const reach = sum(rows, (r) => r.reach);
  const clicksAll = sum(rows, (r) => r.clicksAll);
  const linkClicks = sum(rows, (r) => r.linkClicks);
  const leads = sum(rows, (r) => r.leads);
  const landingPageViews = sum(rows, (r) => r.landingPageViews);
  const postEngagement = sum(rows, (r) => r.postEngagement);
  const videoPlays = sum(rows, (r) => r.videoPlays);
  const thruPlays = sum(rows, (r) => r.thruPlays);
  const video25 = sum(rows, (r) => r.video25);
  const video50 = sum(rows, (r) => r.video50);
  const video100 = sum(rows, (r) => r.video100);

  const ctrAll = div(clicksAll, impressions);
  const linkCtr = div(linkClicks, impressions);
  const cpm = div(spend, impressions);

  return {
    spend,
    impressions,
    reach,
    clicksAll,
    linkClicks,
    leads,
    landingPageViews,
    postEngagement,
    videoPlays,
    thruPlays,
    video25,
    video50,
    video100,
    ctrAll: ctrAll === null ? null : ctrAll * 100,
    linkCtr: linkCtr === null ? null : linkCtr * 100,
    cpc: div(spend, linkClicks),
    cpm: cpm === null ? null : cpm * 1000,
    costPerLead: div(spend, leads),
    leadConversionRate: (() => {
      const v = div(leads, linkClicks);
      return v === null ? null : v * 100;
    })(),
    // Reach overlaps across days, so this is an approximation (labelled as such in UI).
    frequencyApprox: div(impressions, reach),
    videoHookRate: (() => {
      const v = div(video25, videoPlays);
      return v === null ? null : v * 100;
    })(),
    thruPlayRate: (() => {
      const v = div(thruPlays, videoPlays);
      return v === null ? null : v * 100;
    })(),
  };
}

/** Percentage change from `prev` to `curr`. null when there is no baseline. */
export function pctChange(curr: number | null, prev: number | null): number | null {
  if (curr === null || prev === null) return null;
  if (prev === 0) return curr === 0 ? 0 : null;
  return ((curr - prev) / Math.abs(prev)) * 100;
}

/**
 * Whether an increase in a metric is "good" (green). For cost metrics
 * (CPC/CPM/CPL) lower is better; Spend is neutral (grey) and handled in the UI.
 */
export type ChangeDirection = 'up-good' | 'down-good' | 'neutral';

export function directionFor(metricKey: string): ChangeDirection {
  const lowerIsBetter = new Set(['cpc', 'cpm', 'costPerLead']);
  const neutral = new Set(['spend']);
  if (neutral.has(metricKey)) return 'neutral';
  if (lowerIsBetter.has(metricKey)) return 'down-good';
  return 'up-good';
}

/** Group rows by a key (campaign, adSet, adName, adId, date…) preserving insertion order. */
export function groupBy<K extends keyof AdRow>(rows: AdRow[], key: K): Map<string, AdRow[]> {
  const out = new Map<string, AdRow[]>();
  for (const r of rows) {
    const k = String(r[key] ?? '');
    const bucket = out.get(k);
    if (bucket) bucket.push(r);
    else out.set(k, [r]);
  }
  return out;
}

export interface DailyPoint {
  date: string;
  spend: number;
  leads: number;
  linkClicks: number;
  impressions: number;
  linkCtr: number | null;
}

/** One point per day, sorted ascending by date — for the time-series charts. */
export function dailySeries(rows: AdRow[]): DailyPoint[] {
  const byDate = groupBy(rows, 'date');
  const points: DailyPoint[] = [];
  for (const [date, dayRows] of byDate) {
    const m = computeMetrics(dayRows);
    points.push({
      date,
      spend: m.spend,
      leads: m.leads,
      linkClicks: m.linkClicks,
      impressions: m.impressions,
      linkCtr: m.linkCtr,
    });
  }
  points.sort((a, b) => a.date.localeCompare(b.date));
  return points;
}

export interface GroupRow extends Metrics {
  key: string;
  daysActive: number;
}

/** Per-group totals (e.g. per campaign / ad set / ad) for the Ads-Manager tables. */
export function groupMetrics<K extends keyof AdRow>(rows: AdRow[], key: K): GroupRow[] {
  const grouped = groupBy(rows, key);
  const out: GroupRow[] = [];
  for (const [k, groupRows] of grouped) {
    const m = computeMetrics(groupRows);
    const daysActive = new Set(groupRows.map((r) => r.date)).size;
    out.push({ key: k, daysActive, ...m });
  }
  return out;
}

export interface AdSummary extends Metrics {
  adId: string;
  adName: string;
  campaign: string;
  adSet: string;
  qualityRanking: string;
  engagementRanking: string;
  daysActive: number;
}

/** One aggregated summary per ad (across all its daily rows). */
export function adSummaries(rows: AdRow[]): AdSummary[] {
  const byAd = groupBy(rows, 'adId');
  const out: AdSummary[] = [];
  for (const [adId, adRows] of byAd) {
    const first = adRows[0];
    out.push({
      adId,
      adName: first.adName,
      campaign: first.campaign,
      adSet: first.adSet,
      qualityRanking: first.qualityRanking,
      engagementRanking: first.engagementRanking,
      daysActive: new Set(adRows.map((r) => r.date)).size,
      ...computeMetrics(adRows),
    });
  }
  return out;
}

/**
 * The "Top ad": lowest CPL among ads with >=1 lead; if none has a lead, the
 * highest Link CTR among ads with >=100 impressions. Returns null when neither
 * rule can be satisfied.
 */
export function topAd(summaries: AdSummary[]): AdSummary | null {
  const withLeads = summaries.filter((a) => a.leads > 0 && a.costPerLead !== null);
  if (withLeads.length > 0) {
    return withLeads.reduce((best, a) =>
      (a.costPerLead as number) < (best.costPerLead as number) ? a : best,
    );
  }
  const byCtr = summaries.filter((a) => a.impressions >= 100 && a.linkCtr !== null);
  if (byCtr.length > 0) {
    return byCtr.reduce((best, a) =>
      (a.linkCtr as number) > (best.linkCtr as number) ? a : best,
    );
  }
  return null;
}
