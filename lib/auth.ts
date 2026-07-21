/** Simple gate for the hidden /dashboard. For production, upgrade to Supabase
 *  Auth; this password gate just keeps the panel private. */
export const ADMIN_COOKIE = 'cs_admin';
export const DASHBOARD_PASSWORD = (process.env.DASHBOARD_PASSWORD || 'codesquad-admin').trim();
export const ADMIN_SESSION = 'authenticated';

export function isValidDashboardPassword(value: string): boolean {
  const password = value.trim();
  return (
    password === DASHBOARD_PASSWORD ||
    (process.env.NODE_ENV !== 'production' && password === 'codesquad-admin')
  );
}
