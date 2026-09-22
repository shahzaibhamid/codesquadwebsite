import { getContent } from '../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'AI Automation & Software Development Agency | CodeSquad',
  description: 'CodeSquad builds AI growth systems for businesses of every kind — ads, dashboards, SEO/AEO/GEO and marketing intelligence, built into your existing stack. No rip-and-replace.'
};
export default function Home() {
  return <main id="top" dangerouslySetInnerHTML={{ __html: getContent('home') }} />;
}
