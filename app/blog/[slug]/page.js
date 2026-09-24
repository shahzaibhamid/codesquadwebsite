import { notFound } from 'next/navigation';
import { getPosts, getPost, getPostBody } from '../../../lib/store';

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getPost(params.slug);
  if (!p) return { title: 'Article | CodeSquad Blog' };
  return { title: `${p.title} | CodeSquad`, description: p.excerpt };
}

export default async function Page({ params }) {
  const html = await getPostBody(params.slug);
  if (!html) notFound();
  return (
    <main id="top" className="cs-body cs-reader">
      <div className="wrap cs-reader-top">
        <a href="/blog" className="cs-back-link">← All articles</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
