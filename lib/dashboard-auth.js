// Dashboard auth config (password gate).
// Real values come from env vars (DASHBOARD_PASSWORD, DASHBOARD_SECRET) — set in
// Vercel for production and in .env.local for local dev. The fallbacks below are
// non-secret dev placeholders only, safe to commit.
export const DASH_COOKIE = 'cs_dash';
export const DASH_PASSWORD = process.env.DASHBOARD_PASSWORD || 'change-me-set-DASHBOARD_PASSWORD';
// Value stored in the cookie once the correct password is entered.
export const DASH_TOKEN = process.env.DASHBOARD_SECRET || 'dev-only-set-DASHBOARD_SECRET';
