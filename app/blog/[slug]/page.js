import { notFound } from 'next/navigation';
import { getPosts, getPost } from '../../../lib/store';

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

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Older articles have the title/category/date baked into their header HTML. Show the
// current values from the dashboard there, without changing the stored body.
function syncHeader(html, post) {
  return html.replace(/<header class="cs-single__header">[\s\S]*?<\/header>/, (hdr) => {
    if (post.title) hdr = hdr.replace(/(<h1[^>]*>)[\s\S]*?(<\/h1>)/, (_, a, b) => a + esc(post.title) + b);
    if (post.cat) hdr = hdr.replace(/(<span class="cs-post__cat">)[\s\S]*?(<\/span>)/, (_, a, b) => a + esc(post.cat) + b);
    if (post.date) hdr = hdr.replace(/(<span class="cs-post__date">)[\s\S]*?(<\/span>)/, (_, a, b) => a + esc(post.date) + b);
    return hdr;
  });
}

export default async function Page({ params }) {
  const post = await getPost(params.slug);
  const html = post?.body || '';
  if (!html) notFound();
  // Older articles store their full layout (<article class="cs-single">…). Posts written
  // in the dashboard store only the text, so wrap them in the same article layout.
  const isFullArticle = /class="cs-single"/.test(html);
  return (
    <main id="top" className="cs-body cs-reader">
      <div className="wrap cs-reader-top">
        <a href="/blog" className="cs-back-link">← All articles</a>
      </div>
      {isFullArticle ? <div dangerouslySetInnerHTML={{ __html: syncHeader(html, post) }} /> : (
        <div>
          <article className="cs-single">
            <header className="cs-single__header">
              <div className="cs-post__meta" style={{ justifyContent: 'center' }}>
                <span className="cs-post__cat">{post.cat}</span><span className="cs-post__date">{post.date}</span>
              </div>
              <h1>{post.title}</h1>
            </header>
            <div className="cs-article" dangerouslySetInnerHTML={{ __html: html }} />
            <div style={{ textAlign: 'center', marginTop: 48 }}>
              <a className="cs-btn cs-btn--ghost" href="/blog">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>Back to blog
              </a>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
