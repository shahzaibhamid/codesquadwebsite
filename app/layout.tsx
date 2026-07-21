import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import { site } from '@/data/site';

// DM Sans — the typeface used across the real codesquad.ai site. One family for
// both body and headings (matches the live site).
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'AI Automation & Software Development Agency | CodeSquad',
    template: '%s | CodeSquad',
  },
  description: site.description,
  openGraph: {
    title: 'CodeSquad — AI Automation & Software Development Agency',
    description: site.description,
    type: 'website',
    siteName: 'CodeSquad',
  },
};

/** Root layout: document shell + font only. The marketing chrome
 *  (navbar/footer) lives in app/(site)/layout.tsx so the /dashboard admin
 *  panel can have its own clean chrome. */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="cs-body">{children}</body>
    </html>
  );
}
