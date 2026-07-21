import Link from 'next/link';
import type { BlogPost } from '@/types';
import { youtubeThumb } from '@/lib/utils';

/** Blog card — ported from the card markup in home.php + cs_post_thumb().
 *  Thumbnail priority: featured image → YouTube thumbnail (with play badge)
 *  → gradient placeholder (from CSS). */
export default function BlogCard({ post }: { post: BlogPost }) {
  // Thumbnail from an explicit `youtube` field OR any YouTube link inside the
  // post content (matches the WordPress cs_youtube_thumb behavior).
  const yt = youtubeThumb(post.youtube) || youtubeThumb(post.content);
  const thumb = post.image || yt;

  return (
    <article className="cs-card cs-post">
      <div className="cs-post__thumb">
        {thumb && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={thumb} alt={post.title} loading="lazy" decoding="async" />
        )}
        {!post.image && yt && <span className="cs-post__play" aria-hidden="true" />}
      </div>
      <div className="cs-post__meta">
        <span className="cs-post__cat">{post.category}</span>
        <span className="cs-post__date">{post.date}</span>
      </div>
      <h3>
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p>{post.excerpt}</p>
      <Link className="cs-post__more" href={`/blog/${post.slug}`}>
        Read article →
      </Link>
    </article>
  );
}
