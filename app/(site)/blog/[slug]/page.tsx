import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import CTA from '@/components/sections/CTA';
import { blogPosts } from '@/data/blog';
import { getPost } from '@/lib/posts';
import { youtubeId } from '@/lib/utils';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Article not found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // Embed the attached video (from the youtube field or a link in the content).
  const videoId = youtubeId(post.youtube) || youtubeId(post.content);

  return (
    <>
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <article className="cs-single">
            <header className="cs-single__header">
              <div className="cs-post__meta" style={{ justifyContent: 'center' }}>
                <span className="cs-post__cat">{post.category}</span>
                <span className="cs-post__date">{post.date}</span>
              </div>
              <h1>{post.title}</h1>
            </header>

            {videoId && (
              <div className="cs-video">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={post.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}

            {/* Content is trusted, first-party HTML from the data layer / dashboard. */}
            <div className="cs-article" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <Button href="/blog" variant="ghost" icon="arrow">
                Back to blog
              </Button>
            </div>
          </article>
        </div>
      </section>

      <CTA />
    </>
  );
}
