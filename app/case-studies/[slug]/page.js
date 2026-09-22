import { getContent } from '../../../lib/content';
import { caseStudies, caseBySlug } from '../../../lib/posts';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = caseBySlug[params.slug];
  if (!p) return { title: 'Case Study | CodeSquad' };
  return { title: `${p.name} — Case Study | CodeSquad`, description: p.tagline };
}

export default function Page({ params }) {
  const html = getContent(`case-studies/${params.slug}`);
  return (
    <main id="top" className="cs-body cs-reader cs-reader--study">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
