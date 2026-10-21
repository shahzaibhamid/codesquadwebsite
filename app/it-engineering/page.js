import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'IT & Engineering Growth System — CodeSquad',
  description: 'Web development, CRM, AI & automation, IoT and SEO/AEO/GEO for IT, engineering and technical businesses — plans from $499/mo.'
};
export default function Page() {
  return <main id="top" className="page-tech" dangerouslySetInnerHTML={{ __html: getContent('it-engineering') }} />;
}
