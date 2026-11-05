// Display formatting. Pure and safe on both server and client.
// Money: $1,234.56 · counts: 1,234 · big KPI numbers: 12.3K / 1.2M · percent: 2dp.

const DASH = '—';

/** Full money with 2 decimals, e.g. $1,234.56. null/undefined → "—". */
export function money(value: number | null | undefined, currency = 'USD'): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/** Integer count with thousands separators, e.g. 1,234. */
export function count(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);
}

/** Compact big number for KPI cards, e.g. 12.3K, 1.2M. */
export function compact(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  if (Math.abs(value) < 1000) return count(value);
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

/** Percentage with 2 decimals, e.g. 2.34%. Expects an already-scaled value (e.g. 2.34). */
export function percent(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  return `${value.toFixed(digits)}%`;
}

/** Signed percentage for change badges, e.g. +12.34% / -3.10%. */
export function signedPercent(value: number | null | undefined, digits = 2): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(digits)}%`;
}

/** Compact money for dense KPI cards, e.g. $12.3K. */
export function moneyCompact(value: number | null | undefined, currency = 'USD'): string {
  if (value === null || value === undefined || !Number.isFinite(value)) return DASH;
  if (Math.abs(value) < 1000) return money(value, currency);
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(value);
  } catch {
    return `$${compact(value)}`;
  }
}

/** "4 Nov 2026" from a YYYY-MM-DD string (no timezone math — already a PK date). */
export function prettyDate(ymd: string): string {
  if (!ymd) return DASH;
  const [y, m, d] = ymd.split('-').map(Number);
  if (!y || !m || !d) return ymd;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(dt);
}

/** Format an ISO instant in a given IANA timezone, e.g. "4 Nov 2026, 08:00". */
export function dateTimeInZone(iso: string, timeZone = 'Asia/Karachi'): string {
  if (!iso) return DASH;
  const dt = new Date(iso);
  if (Number.isNaN(dt.getTime())) return iso;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(dt);
}

/** Mask a phone to e.g. 0300•••••67 (keep first 4 and last 2 visible). */
export function maskPhone(phone: string): string {
  const s = String(phone || '');
  if (s.length <= 6) return s ? '•'.repeat(s.length) : DASH;
  return `${s.slice(0, 4)}${'•'.repeat(Math.max(3, s.length - 6))}${s.slice(-2)}`;
}

/** Mask an email to e.g. j•••@gmail.com. */
export function maskEmail(email: string): string {
  const s = String(email || '').trim();
  const at = s.indexOf('@');
  if (at <= 0) return s ? '•'.repeat(s.length) : DASH;
  const name = s.slice(0, at);
  const domain = s.slice(at);
  const head = name.slice(0, 1);
  return `${head}${'•'.repeat(Math.max(3, name.length - 1))}${domain}`;
}

/** Digits only (for wa.me links): strip +, spaces, dashes, parentheses. */
export function digitsOnly(phone: string): string {
  return String(phone || '').replace(/\D/g, '');
}

export { DASH };
