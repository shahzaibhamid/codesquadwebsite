import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Motion from '@/components/layout/Motion';
import MotionInit from '@/components/layout/MotionInit';

/** Public marketing layout: navbar, footer, scroll-reveal.
 *  MotionInit enables .cs-motion here only (not on dashboard pages). */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MotionInit />
      <Navbar />
      <main id="cs-main">{children}</main>
      <Footer />
      <Motion />
    </>
  );
}
