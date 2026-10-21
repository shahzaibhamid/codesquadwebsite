import { getContent } from '../../lib/content';
import { renderServiceGrid } from '../../lib/servicePage';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Services — AI Automation, Custom Software, SEO & Marketing | CodeSquad',
  description: 'AI agents, custom software, and growth marketing — designed, built, and integrated into the tools you already use.'
};
export default function Page() {
  const html = getContent('services').replace('<!--services-grid-->', renderServiceGrid());
  return <main id="top" dangerouslySetInnerHTML={{ __html: html }} />;
}
