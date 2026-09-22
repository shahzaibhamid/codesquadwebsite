import { getContent } from '../../lib/content';
export const dynamic = 'force-static';
export const metadata = {
  title: 'Industry Solutions — CodeSquad',
  description: 'One connected growth system, configured for your industry — Aesthetics, E-commerce and IT & Engineering. Web, CRM, AI, automation, ads, follow-up and content, in one dashboard.'
};
export default function Page() {
  return <main dangerouslySetInnerHTML={{ __html: getContent('industry') }} />;
}
