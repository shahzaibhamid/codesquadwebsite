import type { Metadata } from 'next';
import BlogCard from '@/components/ui/BlogCard';
import CTA from '@/components/sections/CTA';
import HeroVideo from '@/components/layout/HeroVideo';
import { blogCategories } from '@/data/blog';
import { getPosts } from '@/lib/posts';

// Always read the store fresh so dashboard changes appear immediately.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'CodeSquad Blog | AI Automation, SMEs & Business Growth',
  description:
    'Practical insights on AI automation, SMEs, AEO/SEO, lead generation, and business growth from the CodeSquad team.',
};

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <section className="cs-hero cs-blog-hero">
        <HeroVideo
          className="cs-blog-hero__video"
          src="/videos/blog-hero.mp4"
          poster="/videos/blog-hero-poster.jpg"
        />
        <div className="cs-blog-hero__overlay" aria-hidden="true" />
        <div className="cs-container cs-hero__inner">
          <span className="cs-eyebrow">CodeSquad Blog</span>
          <h1>
            Insights on <span className="cs-gradient-text">AI automation</span> &amp; business growth
          </h1>
          <p className="cs-hero__sub">
            Practical, technical perspectives on AI automation, SMEs, AEO/SEO, lead generation, software
            development, and scaling operations.
          </p>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          {/* Category filters (visual; wire to real filtering when posts grow). */}
          <div className="cs-cats" role="list" aria-label="Blog categories">
            <span className="cs-cat cs-cat--active" role="listitem">
              All
            </span>
            {blogCategories.map((c) => (
              <span className="cs-cat" role="listitem" key={c}>
                {c}
              </span>
            ))}
          </div>

          <div className="cs-grid cs-grid--3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
