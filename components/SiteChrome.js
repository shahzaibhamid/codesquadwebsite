'use client';
import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import MobileCta from './MobileCta';
import IndustryModal from './IndustryModal';
import Scripts from './Scripts';

// Industry landing pages are shared as direct links, so the "pick your industry"
// popup would only get in the way there.
const NO_POPUP = ['/aesthetics', '/clinics', '/it-engineering', '/ecommerce'];

export default function SiteChrome({ children }) {
  const path = usePathname() || '';
  if (path.startsWith('/dashboard')) return <>{children}</>;
  const showPopup = !NO_POPUP.some((p) => path === p || path.startsWith(`${p}/`));
  return (
    <>
      <Header />
      {children}
      <Footer />
      <MobileCta />
      {showPopup ? <IndustryModal /> : null}
      <Scripts />
    </>
  );
}
