import { notFound } from 'next/navigation';
import { services, getService } from '../../../lib/services';
import { renderServicePage } from '../../../lib/servicePage';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }) {
  const s = getService(params.slug);
  if (!s) return {};
  return { title: `${s.title} Services | CodeSquad`, description: s.meta || s.sub };
}

export default function Page({ params }) {
  const s = getService(params.slug);
  if (!s) notFound();
  return <main className="svc-page" dangerouslySetInnerHTML={{ __html: renderServicePage(s) }} />;
}
