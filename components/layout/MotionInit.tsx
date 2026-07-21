/**
 * Pre-paint script that enables scroll-reveal (.cs-motion) — rendered ONLY inside
 * the marketing (site) layout, which also mounts the <Motion> reveal observer.
 * Kept out of the root layout so dashboard/login pages never hide content with
 * no observer to reveal it. Skips reveal for users who prefer reduced motion.
 */
const INIT = `(function(){try{
  var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(('IntersectionObserver' in window)&&!rm){document.documentElement.classList.add('cs-motion');}
}catch(e){}})();`;

export default function MotionInit() {
  return <script dangerouslySetInnerHTML={{ __html: INIT }} />;
}
