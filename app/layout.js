import './globals.css';
import SiteChrome from '../components/SiteChrome';

// Favicon comes from the file-based convention (app/favicon.ico, app/icon.png,
// app/apple-icon.png) so it's served from a stable, crawlable URL — Google's
// favicon indexing doesn't pick up data: URIs, which this used to be.
export const metadata = {
  metadataBase: new URL('https://www.codesquad.ai'),
  title: 'medspa.codesquad — The Med Spa Growth System',
  description: 'CodeSquad builds one connected growth system — ads, landing pages, CRM, 3-second follow-up, booking, SEO content and reporting — built into your existing stack. No rip-and-replace.'
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#0A0A0A' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSFML7Q3');`
          }}
        />
        {/* End Google Tag Manager */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,900&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSFML7Q3"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
