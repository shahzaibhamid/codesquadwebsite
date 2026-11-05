// Public (non-secret) client constants for the Meta Ads page. These mirror the
// server env vars DASHBOARD_TIMEZONE / META_ADS_CURRENCY — they are safe to ship
// to the browser (a timezone and a currency code are not secrets).

export const TZ = 'Asia/Karachi';
export const CURRENCY = 'USD';

// Meta brand blue — used only for primary highlights.
export const META_BLUE = '#1877F2';

// Chart palette (navy dashboard accent + Meta blue + supporting hues).
export const CHART = {
  spend: '#1e3a5f',
  leads: '#1877F2',
  clicks: '#0f9b8e',
  ctr: '#e8833a',
  bars: ['#1e3a5f', '#1877F2', '#0f9b8e', '#8b5cf6', '#e8833a', '#d64550', '#2b9348', '#577590'],
};
