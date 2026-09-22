import { getContent } from '../../../lib/content';
import { blogPosts, blogBySlug } from '../../../lib/posts';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = blogBySlug[params.slug];
  if (!p) return { title: 'Article | CodeSquad Blog' };
  return { title: `${p.title} | CodeSquad`, description: p.excerpt };
}

export default function Page({ params }) {
  const html = getContent(`blog/${params.slug}`);
  return (
    <main id="top" className="cs-body cs-reader">
      <div className="wrap cs-reader-top">
        <a href="/blog" className="cs-back-link">← All articles</a>
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
