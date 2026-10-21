import { getContent } from '../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'AI Automation, Custom Software & Growth Marketing Agency | CodeSquad',
  description: 'CodeSquad designs and builds AI automation, custom software, SEO/GEO/AEO, and performance marketing systems for growing businesses — engineered into your stack, measured on revenue.'
};
export default function Home() {
  return <main id="top" dangerouslySetInnerHTML={{ __html: getContent('home') }} />;
}
