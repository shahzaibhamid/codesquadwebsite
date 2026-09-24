import './globals.css';
import SiteChrome from '../components/SiteChrome';

const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23173a8f'/%3E%3Cstop offset='1' stop-color='%2325c6b6'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='%230A0A0A'/%3E%3Ctext x='50' y='70' font-family='Arial' font-size='52' font-weight='700' fill='url(%23g)' text-anchor='middle'%3ECS%3C/text%3E%3C/svg%3E";

export const metadata = {
  metadataBase: new URL('https://medspa-eight.vercel.app'),
  title: 'medspa.codesquad — The Med Spa Growth System',
  description: 'CodeSquad builds one connected growth system — ads, landing pages, CRM, 3-second follow-up, booking, SEO content and reporting — built into your existing stack. No rip-and-replace.',
  icons: { icon: FAVICON }
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0A0A0A' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
