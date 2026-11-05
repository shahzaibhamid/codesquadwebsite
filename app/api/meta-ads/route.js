import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { DASH_COOKIE, isValidToken } from '../../../lib/dashboard-auth';
import { getMetaData, MetaSheetsError } from '../../../lib/metaSheets';

// Always run fresh (the data layer itself is cached under the "meta-ads" tag).
export const dynamic = 'force-dynamic';

// GET /api/meta-ads → { ads, leads, fetchedAt }. Admin-only (same login as the dashboard).
export async function GET() {
  const token = cookies().get(DASH_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getMetaData();
    return NextResponse.json(data);
  } catch (err) {
    const status = err instanceof MetaSheetsError ? err.status : 500;
    // Config/permission messages are safe to show; everything else logs server-side only.
    console.error('[api/meta-ads] GET failed:', err?.message || err);
    const message =
      err instanceof MetaSheetsError || /environment variable/i.test(err?.message || '')
        ? err.message
        : 'Could not load Meta Ads data. Please try again.';
    return NextResponse.json({ error: message, code: status }, { status });
  }
}
