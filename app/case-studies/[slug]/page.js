import { notFound } from 'next/navigation';
import { getCases, getCase, getCaseBody } from '../../../lib/store';

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cases = await getCases();
  return cases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getCase(params.slug);
  if (!p) return { title: 'Case Study | CodeSquad' };
  return { title: `${p.name} — Case Study | CodeSquad`, description: p.tagline };
}

export default async function Page({ params }) {
  const html = await getCaseBody(params.slug);
  if (!html) notFound();
  return (
    <main id="top" className="cs-body cs-reader cs-reader--study">
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
