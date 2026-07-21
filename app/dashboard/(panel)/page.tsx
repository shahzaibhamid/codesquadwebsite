import Link from 'next/link';
import { getPosts } from '@/lib/posts';
import DeleteButton from '@/components/dashboard/DeleteButton';

export const dynamic = 'force-dynamic';

const OK_MSG: Record<string, string> = {
  created: 'Post created.',
  updated: 'Post updated.',
  deleted: 'Post deleted.',
};

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: { ok?: string; error?: string };
}) {
  const posts = await getPosts();

  return (
    <>
      <div className="cs-dash__head">
        <h1>Blog posts</h1>
        <Link className="cs-btn cs-btn--primary cs-btn--sm" href="/dashboard/new">
          + New post
        </Link>
      </div>

      {searchParams?.ok && OK_MSG[searchParams.ok] && (
        <div className="cs-form__status cs-form__status--ok" style={{ marginBottom: 18 }}>
          {OK_MSG[searchParams.ok]}
        </div>
      )}
      <div className="cs-dash__notice">
        Posts are saved locally to <code>content/posts.json</code> — create, edit, and delete work right away.
        To persist on live hosting (e.g. Vercel), connect Supabase later (see <code>supabase/schema.sql</code>).
      </div>

      <div className="cs-dash__table">
        <div className="cs-dash__row cs-dash__row--head">
          <span>Title</span>
          <span>Category</span>
          <span>Date</span>
          <span>Actions</span>
        </div>
        {posts.map((p) => (
          <div className="cs-dash__row" key={p.slug}>
            <span className="cs-dash__title">{p.title}</span>
            <span>{p.category}</span>
            <span>{p.date}</span>
            <span className="cs-dash__actions">
              <Link className="cs-btn cs-btn--ghost cs-btn--sm" href={`/dashboard/edit/${p.slug}`}>
                Edit
              </Link>
              <Link className="cs-btn cs-btn--ghost cs-btn--sm" href={`/blog/${p.slug}`} target="_blank" rel="noopener">
                View
              </Link>
              <DeleteButton slug={p.slug} />
            </span>
          </div>
        ))}
        {posts.length === 0 && <div className="cs-dash__row">No posts yet. Create your first one.</div>}
      </div>
    </>
  );
}
