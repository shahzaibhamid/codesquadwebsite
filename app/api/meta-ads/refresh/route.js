import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';
import { DASH_COOKIE, isValidToken } from '../../../../lib/dashboard-auth';

export const dynamic = 'force-dynamic';

// POST /api/meta-ads/refresh → clears the cached sheet data so the next read is fresh.
// Admin-only.
export async function POST() {
  const token = cookies().get(DASH_COOKIE)?.value;
  if (!isValidToken(token)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  revalidateTag('meta-ads');
  return NextResponse.json({ ok: true, refreshedAt: new Date().toISOString() });
}
