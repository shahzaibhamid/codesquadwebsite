import { getPosts, canWrite, isLive } from '../../lib/store';
import { deletePostAction } from './actions';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <div className="dash-wrap">
      <div className="dash-head">
        <h1>Blog posts</h1>
        <a href="/dashboard/new" className="dash-btn dash-btn--primary">+ New post</a>
      </div>
      {isLive() ? (
        <div className="dash-note">✓ Connected to Supabase — create, edit and delete save live to your site.</div>
      ) : !canWrite() ? (
        <div className="dash-note dash-note--warn">Read-only on the live site — connect Supabase to create, edit and delete here.</div>
      ) : (
        <div className="dash-note">Saving locally to your project files. Create, edit and delete work right away.</div>
      )}
      <div className="dash-table">
        <div className="dash-tr dash-tr--head"><span>Title</span><span>Category</span><span>Date</span><span>Actions</span></div>
        {posts.map((p) => (
          <div className="dash-tr" key={p.slug}>
            <span className="dash-td--title">{p.title}</span>
            <span><span className="dash-pill">{p.cat}</span></span>
            <span className="dash-muted">{p.date}</span>
            <span className="dash-actions">
              <a href={`/dashboard/edit/${p.slug}`}>Edit</a>
              <a href={`/blog/${p.slug}`} target="_blank" rel="noopener">View</a>
              <form action={deletePostAction}><input type="hidden" name="slug" value={p.slug} /><button type="submit" className="dash-del">Delete</button></form>
            </span>
          </div>
        ))}
        {posts.length === 0 ? <div className="dash-empty">No posts yet.</div> : null}
      </div>
    </div>
  );
}
