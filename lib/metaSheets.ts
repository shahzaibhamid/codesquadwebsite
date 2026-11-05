// Server-only. Reads the two private Google Sheets with a read-only service
// account and parses them into typed rows. Google Sheets is the ONLY data source
// — we never touch the Meta/Facebook API.
//
// Cached with Next's unstable_cache under the tag "meta-ads"; the Refresh button
// clears it via revalidateTag("meta-ads").

import 'server-only';
import { google } from 'googleapis';
import { unstable_cache } from 'next/cache';
import { formatInTimeZone } from 'date-fns-tz';
import { getMetaEnv } from './metaEnv';
import type { AdRow, LeadRow, MetaAdsPayload } from './metaTypes';

const CACHE_SECONDS = Number(process.env.META_ADS_CACHE_SECONDS) > 0
  ? Number(process.env.META_ADS_CACHE_SECONDS)
  : 1800;

/** Error carrying an HTTP status so the route can show a friendly, code-tagged message. */
export class MetaSheetsError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = 'MetaSheetsError';
    this.status = status;
  }
}

// ── parsing helpers ─────────────────────────────────────────────────────────

/** Strip commas/currency/percent/whitespace, then parse. Empty → 0. */
function num(raw: unknown): number {
  if (raw === null || raw === undefined) return 0;
  const s = String(raw).trim();
  if (s === '') return 0;
  const cleaned = s.replace(/[^0-9.\-]/g, '');
  if (cleaned === '' || cleaned === '-' || cleaned === '.') return 0;
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
}

/** Cost per Lead: empty means "no leads" → null (rendered as "—"). */
function numOrNull(raw: unknown): number | null {
  if (raw === null || raw === undefined) return null;
  const s = String(raw).trim();
  if (s === '') return null;
  return num(raw);
}

/** IDs/phones stay strings; drop a leading apostrophe Sheets adds to force-text. */
function str(raw: unknown): string {
  if (raw === null || raw === undefined) return '';
  let s = String(raw).trim();
  if (s.startsWith("'")) s = s.slice(1);
  return s;
}

/** "UNKNOWN" (any case) → "Not enough data"; otherwise the trimmed value. */
function ranking(raw: unknown): string {
  const s = str(raw);
  if (!s || s.toUpperCase() === 'UNKNOWN') return 'Not enough data';
  return s;
}

/**
 * Convert a "Date" cell to a YYYY-MM-DD string in Pakistan time.
 * Handles ISO timestamps ("2026-11-03T19:00:00.000Z" → "2026-11-04"),
 * already-formatted "YYYY-MM-DD", and Google Sheets serial numbers.
 */
function toPkDate(raw: unknown, timeZone: string): string {
  if (raw === null || raw === undefined) return '';
  const s = String(raw).trim();
  if (s === '') return '';

  // Already a plain date.
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;

  // Sheets serial date number (days since 1899-12-30).
  if (/^\d+(\.\d+)?$/.test(s)) {
    const serial = Number.parseFloat(s);
    const ms = Date.UTC(1899, 11, 30) + serial * 86400000;
    return formatInTimeZone(new Date(ms), timeZone, 'yyyy-MM-dd');
  }

  // ISO / parseable timestamp → the calendar date in Pakistan time.
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) return formatInTimeZone(d, timeZone, 'yyyy-MM-dd');

  // Fallback: keep first 10 chars if they look like a date.
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : s;
}

// ── header-name mapping (columns are matched by name, not position) ──────────

function normalizeHeader(h: string): string {
  return String(h || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Build a getter that finds a cell by any of several candidate header names. */
function makeColumnGetter(headerRow: string[]) {
  const index = new Map<string, number>();
  headerRow.forEach((h, i) => {
    const key = normalizeHeader(h);
    if (key && !index.has(key)) index.set(key, i);
  });
  return (row: string[], candidates: string[]): string => {
    for (const c of candidates) {
      const i = index.get(normalizeHeader(c));
      if (i !== undefined) return row[i] ?? '';
    }
    return '';
  };
}

function isEmptyRow(row: string[]): boolean {
  return !row || row.every((c) => String(c ?? '').trim() === '');
}

// ── Google client ────────────────────────────────────────────────────────────

function sheetsClient() {
  const env = getMetaEnv();
  const auth = new google.auth.JWT({
    email: env.serviceAccountEmail,
    key: env.privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });
  return { sheets: google.sheets({ version: 'v4', auth }), env };
}

async function fetchValues(spreadsheetId: string, tab: string, range: string): Promise<string[][]> {
  const { sheets } = sheetsClient();
  // Quote the tab name because it can contain spaces.
  const a1 = `'${tab.replace(/'/g, "''")}'!${range}`;
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: a1,
      valueRenderOption: 'FORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });
    return (res.data.values as string[][]) || [];
  } catch (err: any) {
    const status: number =
      err?.code || err?.response?.status || err?.status || 500;
    // Log full details on the server only; never leak to the client.
    console.error(`[meta-sheets] values.get failed (${status}) for ${a1}:`, err?.message || err);
    if (status === 403) {
      throw new MetaSheetsError(
        'Google denied access to the sheet. Share it with the service account as Viewer.',
        403,
      );
    }
    if (status === 404) {
      throw new MetaSheetsError(
        'Sheet or tab not found. Check the spreadsheet ID and the exact tab name.',
        404,
      );
    }
    throw new MetaSheetsError('Could not read data from Google Sheets.', status === 0 ? 500 : status);
  }
}

// ── parsers ───────────────────────────────────────────────────────────────────

function parseAdRows(values: string[][], timeZone: string): AdRow[] {
  if (!values.length) return [];
  const [header, ...rows] = values;
  const get = makeColumnGetter(header);
  const out: AdRow[] = [];
  for (const row of rows) {
    if (isEmptyRow(row)) continue;
    out.push({
      date: toPkDate(get(row, ['Date']), timeZone),
      campaign: str(get(row, ['Campaign'])),
      adSet: str(get(row, ['Ad Set', 'AdSet'])),
      adName: str(get(row, ['Ad Name', 'AdName'])),
      adId: str(get(row, ['Ad ID', 'AdID'])),
      spend: num(get(row, ['Spend', 'Amount Spent'])),
      currency: str(get(row, ['Currency'])),
      impressions: num(get(row, ['Impressions'])),
      reach: num(get(row, ['Reach'])),
      frequency: num(get(row, ['Frequency'])),
      clicksAll: num(get(row, ['Clicks (All)', 'Clicks All', 'Clicks'])),
      linkClicks: num(get(row, ['Link Clicks'])),
      ctr: num(get(row, ['CTR (%)', 'CTR'])),
      cpc: num(get(row, ['CPC'])),
      cpm: num(get(row, ['CPM'])),
      leads: num(get(row, ['Leads'])),
      costPerLead: numOrNull(get(row, ['Cost per Lead', 'Cost Per Lead', 'CPL'])),
      landingPageViews: num(get(row, ['Landing Page Views'])),
      postEngagement: num(get(row, ['Post Engagement'])),
      videoPlays: num(get(row, ['Video Plays'])),
      thruPlays: num(get(row, ['ThruPlays', 'Thru Plays'])),
      video25: num(get(row, ['Video 25%', 'Video 25'])),
      video50: num(get(row, ['Video 50%', 'Video 50'])),
      video100: num(get(row, ['Video 100%', 'Video 100'])),
      qualityRanking: ranking(get(row, ['Quality Ranking'])),
      engagementRanking: ranking(get(row, ['Engagement Ranking'])),
    });
  }
  // Rows are not in date order in the sheet — always sort.
  out.sort((a, b) => a.date.localeCompare(b.date) || a.campaign.localeCompare(b.campaign));
  return out;
}

function parseLeadRows(values: string[][]): LeadRow[] {
  if (!values.length) return [];
  const [header, ...rows] = values;
  const get = makeColumnGetter(header);
  const out: LeadRow[] = [];
  const seen = new Set<string>();
  for (const row of rows) {
    if (isEmptyRow(row)) continue;
    const leadId = str(get(row, ['Lead ID', 'LeadID']));
    // De-duplicate on Lead ID when present.
    if (leadId) {
      if (seen.has(leadId)) continue;
      seen.add(leadId);
    }
    const dateTime = str(get(row, ['Lead Date & Time', 'Lead Date and Time', 'Date & Time', 'Date']));
    out.push({
      dateTime,
      date: dateTime.slice(0, 10),
      fullName: str(get(row, ['Full Name'])),
      firstName: str(get(row, ['First Name'])),
      lastName: str(get(row, ['Last Name'])),
      phone: str(get(row, ['Phone', 'Phone Number'])),
      email: str(get(row, ['Email'])),
      city: str(get(row, ['City'])),
      campaign: str(get(row, ['Campaign'])),
      adSet: str(get(row, ['Ad Set', 'AdSet'])),
      adName: str(get(row, ['Ad Name', 'AdName'])),
      platform: str(get(row, ['Platform (FB/IG)', 'Platform'])),
      organic: str(get(row, ['Organic?', 'Organic'])),
      formId: str(get(row, ['Form ID', 'FormID'])),
      leadId,
      adId: str(get(row, ['Ad ID', 'AdID'])),
    });
  }
  // Newest first.
  out.sort((a, b) => b.dateTime.localeCompare(a.dateTime));
  return out;
}

// ── public API (cached under tag "meta-ads") ─────────────────────────────────

async function loadAllUncached(): Promise<MetaAdsPayload> {
  const env = getMetaEnv();
  const [adValues, leadValues] = await Promise.all([
    fetchValues(env.adsSheetId, env.adsSheetTab, env.adsSheetRange),
    fetchValues(env.leadsSheetId, env.leadsSheetTab, env.leadsSheetRange),
  ]);
  return {
    ads: parseAdRows(adValues, env.timezone),
    leads: parseLeadRows(leadValues),
    fetchedAt: new Date().toISOString(),
  };
}

const loadAllCached = unstable_cache(loadAllUncached, ['meta-ads:all'], {
  tags: ['meta-ads'],
  revalidate: CACHE_SECONDS,
});

/** Both sheets + fetch timestamp, cached. Used by GET /api/meta-ads. */
export function getMetaData(): Promise<MetaAdsPayload> {
  return loadAllCached();
}

/** Parsed Sheet 1 rows (cached). */
export async function getAdInsights(): Promise<AdRow[]> {
  return (await loadAllCached()).ads;
}

/** Parsed Sheet 2 rows (cached). */
export async function getLeads(): Promise<LeadRow[]> {
  return (await loadAllCached()).leads;
}
