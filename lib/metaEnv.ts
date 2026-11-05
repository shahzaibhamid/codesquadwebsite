// Server-only env reader for the Meta Ads dashboard. NEVER import this from a
// client component — these values are secrets. Validates that each variable is
// present and throws a clear error naming any missing one (without printing values).

const REQUIRED = [
  'GOOGLE_PROJECT_ID',
  'GOOGLE_SERVICE_ACCOUNT_EMAIL',
  'GOOGLE_PRIVATE_KEY',
  'META_ADS_SHEET_ID',
  'META_ADS_SHEET_TAB',
  'META_ADS_SHEET_RANGE',
  'META_LEADS_SHEET_ID',
  'META_LEADS_SHEET_TAB',
  'META_LEADS_SHEET_RANGE',
  'DASHBOARD_TIMEZONE',
  'META_ADS_CURRENCY',
  'META_ADS_CACHE_SECONDS',
] as const;

export interface MetaEnv {
  projectId: string;
  serviceAccountEmail: string;
  privateKey: string;
  adsSheetId: string;
  adsSheetTab: string;
  adsSheetRange: string;
  leadsSheetId: string;
  leadsSheetTab: string;
  leadsSheetRange: string;
  timezone: string;
  currency: string;
  cacheSeconds: number;
}

/** Read + validate all Meta Ads env vars. Throws naming the first missing one. */
export function getMetaEnv(): MetaEnv {
  const missing = REQUIRED.filter((k) => !process.env[k] || process.env[k]!.trim() === '');
  if (missing.length) {
    throw new Error(
      `Meta Ads is not configured. Missing environment variable(s): ${missing.join(', ')}. ` +
        `Add them to .env.local (local) or your host's Environment Variables (production).`,
    );
  }

  // The private key arrives with literal "\n" sequences; restore real newlines.
  const privateKey = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
  if (!privateKey.includes('BEGIN PRIVATE KEY')) {
    throw new Error(
      'GOOGLE_PRIVATE_KEY looks malformed (missing PEM header). Paste the full "private_key" ' +
        'value from the service-account JSON, keeping the surrounding quotes.',
    );
  }

  const cacheSeconds = Number(process.env.META_ADS_CACHE_SECONDS);

  return {
    projectId: process.env.GOOGLE_PROJECT_ID!,
    serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    privateKey,
    adsSheetId: process.env.META_ADS_SHEET_ID!,
    adsSheetTab: process.env.META_ADS_SHEET_TAB!,
    adsSheetRange: process.env.META_ADS_SHEET_RANGE!,
    leadsSheetId: process.env.META_LEADS_SHEET_ID!,
    leadsSheetTab: process.env.META_LEADS_SHEET_TAB!,
    leadsSheetRange: process.env.META_LEADS_SHEET_RANGE!,
    timezone: process.env.DASHBOARD_TIMEZONE!,
    currency: process.env.META_ADS_CURRENCY!,
    cacheSeconds: Number.isFinite(cacheSeconds) && cacheSeconds > 0 ? cacheSeconds : 1800,
  };
}
