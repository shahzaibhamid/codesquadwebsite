import { getContent } from '../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'AI Automation & Software Development Agency | CodeSquad',
  description: 'CodeSquad builds growth systems for clinics, med spas and e-commerce brands — ads, instant follow-up, CRM dashboards and SEO/AEO/GEO, built into your stack.'
};
export default function Home() {
  return <main id="top" dangerouslySetInnerHTML={{ __html: getContent('home') }} />;
}
