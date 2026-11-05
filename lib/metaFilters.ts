// Date-range presets + filtering + option building for the Meta Ads page.
// All dates are plain YYYY-MM-DD strings in Pakistan time (Asia/Karachi), so the
// comparisons are simple lexical string comparisons — no timezone math needed here
// (the conversion to PK dates already happened in lib/metaSheets.ts).

import type { AdRow, LeadRow } from './metaTypes';

export type PresetKey =
  | 'today'
  | 'yesterday'
  | 'last7'
  | 'last14'
  | 'last30'
  | 'thisMonth'
  | 'lastMonth'
  | 'lifetime'
  | 'custom';

export const PRESETS: { key: PresetKey; label: string }[] = [
  { key: 'today', label: 'Today' },
  { key: 'yesterday', label: 'Yesterday' },
  { key: 'last7', label: 'Last 7 days' },
  { key: 'last14', label: 'Last 14 days' },
  { key: 'last30', label: 'Last 30 days' },
  { key: 'thisMonth', label: 'This month' },
  { key: 'lastMonth', label: 'Last month' },
  { key: 'lifetime', label: 'Lifetime' },
  { key: 'custom', label: 'Custom' },
];

/** Inclusive date range. null bound = open (used by Lifetime). */
export interface DateRange {
  start: string | null;
  end: string | null;
}

/** Today's date as YYYY-MM-DD in the given timezone. */
export function todayInZone(timeZone = 'Asia/Karachi'): string {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('year')}-${get('month')}-${get('day')}`;
}

/** Add `days` (can be negative) to a YYYY-MM-DD string, staying in YYYY-MM-DD. */
export function addDays(ymd: string, days: number): string {
  const [y, m, d] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

function firstOfMonth(ymd: string): string {
  return `${ymd.slice(0, 7)}-01`;
}
function lastOfMonth(ymd: string): string {
  const [y, m] = ymd.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m, 0)); // day 0 of next month = last day of this one
  return dt.toISOString().slice(0, 10);
}

/**
 * Resolve a preset (or custom range) into concrete start/end dates.
 * `custom` uses the supplied customStart/customEnd.
 */
export function resolveRange(
  preset: PresetKey,
  timeZone = 'Asia/Karachi',
  customStart?: string | null,
  customEnd?: string | null,
): DateRange {
  const today = todayInZone(timeZone);
  switch (preset) {
    case 'today':
      return { start: today, end: today };
    case 'yesterday': {
      const y = addDays(today, -1);
      return { start: y, end: y };
    }
    case 'last7':
      return { start: addDays(today, -6), end: today };
    case 'last14':
      return { start: addDays(today, -13), end: today };
    case 'last30':
      return { start: addDays(today, -29), end: today };
    case 'thisMonth':
      return { start: firstOfMonth(today), end: today };
    case 'lastMonth': {
      const firstThis = firstOfMonth(today);
      const lastPrevEnd = addDays(firstThis, -1);
      return { start: firstOfMonth(lastPrevEnd), end: lastPrevEnd };
    }
    case 'custom':
      return { start: customStart || null, end: customEnd || null };
    case 'lifetime':
    default:
      return { start: null, end: null };
  }
}

/**
 * The equal-length period immediately before `range`, for "compare to previous".
 * Returns null for open-ended ranges (Lifetime) where a comparison is meaningless.
 */
export function previousRange(range: DateRange): DateRange | null {
  if (!range.start || !range.end) return null;
  const startMs = Date.parse(`${range.start}T00:00:00Z`);
  const endMs = Date.parse(`${range.end}T00:00:00Z`);
  const lengthDays = Math.round((endMs - startMs) / 86400000) + 1;
  const prevEnd = addDays(range.start, -1);
  const prevStart = addDays(prevEnd, -(lengthDays - 1));
  return { start: prevStart, end: prevEnd };
}

/** True when a YYYY-MM-DD date falls inside an inclusive range. */
export function inRange(date: string, range: DateRange): boolean {
  if (range.start && date < range.start) return false;
  if (range.end && date > range.end) return false;
  return true;
}

export interface Selection {
  campaigns: string[];
  adSets: string[];
  ads: string[]; // ad names
}

const EMPTY_SELECTION: Selection = { campaigns: [], adSets: [], ads: [] };

function matchesSelection(
  row: { campaign: string; adSet: string; adName: string },
  sel: Selection,
): boolean {
  if (sel.campaigns.length && !sel.campaigns.includes(row.campaign)) return false;
  if (sel.adSets.length && !sel.adSets.includes(row.adSet)) return false;
  if (sel.ads.length && !sel.ads.includes(row.adName)) return false;
  return true;
}

/** Filter ad rows by date range + campaign/adSet/ad selection. */
export function filterAds(
  rows: AdRow[],
  range: DateRange,
  sel: Selection = EMPTY_SELECTION,
): AdRow[] {
  return rows.filter((r) => inRange(r.date, range) && matchesSelection(r, sel));
}

/** Filter lead rows the same way (leads carry campaign/adSet/adName too). */
export function filterLeads(
  rows: LeadRow[],
  range: DateRange,
  sel: Selection = EMPTY_SELECTION,
): LeadRow[] {
  return rows.filter((r) => inRange(r.date, range) && matchesSelection(r, sel));
}

/**
 * Build the cascading filter options. Choosing campaigns narrows the ad-set and
 * ad lists; choosing ad sets narrows the ad list. Options are sorted and unique.
 */
export function buildOptions(rows: AdRow[], sel: Selection) {
  const uniqSorted = (xs: string[]) =>
    Array.from(new Set(xs.filter(Boolean))).sort((a, b) => a.localeCompare(b));

  const campaigns = uniqSorted(rows.map((r) => r.campaign));

  const forAdSets = sel.campaigns.length
    ? rows.filter((r) => sel.campaigns.includes(r.campaign))
    : rows;
  const adSets = uniqSorted(forAdSets.map((r) => r.adSet));

  const forAds = forAdSets.filter((r) => !sel.adSets.length || sel.adSets.includes(r.adSet));
  const ads = uniqSorted(forAds.map((r) => r.adName));

  return { campaigns, adSets, ads };
}
