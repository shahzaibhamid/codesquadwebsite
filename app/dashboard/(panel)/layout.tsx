import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { logout } from '../actions';

export const metadata: Metadata = { title: 'Dashboard', robots: { index: false, follow: false } };

/** Admin chrome for the authenticated dashboard (no marketing navbar/footer). */
export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cs-dash">
      <header className="cs-dash__bar">
        <Link href="/dashboard" className="cs-dash__brand" aria-label="CodeSquad dashboard">
          <Image
            src="/images/logo-dark.png"
            alt="CodeSquad AI Solutions"
            width={172}
            height={32}
            priority
          />
          <span>Dashboard</span>
        </Link>
        <nav className="cs-dash__nav">
          <Link href="/dashboard">Posts</Link>
          <Link href="/dashboard/new">New post</Link>
          <Link href="/dashboard/case-studies">Case studies</Link>
          <Link href="/dashboard/leads">Leads</Link>
          <Link href="/" target="_blank" rel="noopener">
            View site ↗
          </Link>
          <form action={logout}>
            <button className="cs-btn cs-btn--ghost cs-btn--sm" type="submit">
              Log out
            </button>
          </form>
        </nav>
      </header>
      <main className="cs-dash__main">
        <div className="cs-container">{children}</div>
      </main>
    </div>
  );
}
