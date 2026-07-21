import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, ADMIN_SESSION } from '@/lib/auth';

/** Protect /dashboard/* (except the login page). Redirects to login when the
 *  admin cookie is missing/incorrect. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/dashboard/login')) return NextResponse.next();

  const token = req.cookies.get(ADMIN_COOKIE)?.value;
  if (token !== ADMIN_SESSION) {
    const url = req.nextUrl.clone();
    url.pathname = '/dashboard/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*'] };
