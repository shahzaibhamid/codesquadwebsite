import { savePostAction } from '../../app/dashboard/actions';

const CATS = ['AI Automation', 'SMEs', 'AEO / SEO', 'Business Growth', 'Software Development', 'Lead Generation'];

export default function PostForm({ post = {}, body = '', original = '' }) {
  return (
    <form className="dash-form" action={savePostAction}>
      {original ? <input type="hidden" name="original" value={original} /> : null}
      <label>Title</label>
      <input name="title" defaultValue={post.title || ''} placeholder="Post title" required />

      <label>Slug (optional — auto-generated from title)</label>
      <input name="slug" defaultValue={post.slug || ''} placeholder="my-post-url" />

      <div className="dash-form__row">
        <div>
          <label>Category</label>
          <select name="cat" defaultValue={post.cat || 'AI Automation'}>
            {CATS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Date (optional — defaults to today)</label>
          <input name="date" defaultValue={post.date || ''} placeholder="July 8, 2026" />
        </div>
      </div>

      <label>YouTube URL (optional — auto-fills the card thumbnail)</label>
      <input name="youtube" placeholder="https://youtu.be/…" />
      <input type="hidden" name="img" value={post.img || ''} />

      <label>Excerpt</label>
      <textarea name="excerpt" defaultValue={post.excerpt || ''} rows={3} placeholder="Short summary shown on the blog list." />

      <label>Content</label>
      <div className="dash-help">
        <b>How to format your post:</b> just paste your text — no HTML needed.<br />
        • Leave a blank line between paragraphs. • Start a line with <code>#</code>, <code>##</code> or <code>###</code> for headings. • Wrap text in <code>**double asterisks**</code> for bold. <em>(Existing HTML articles are preserved as-is.)</em>
      </div>
      <textarea name="content" defaultValue={body} rows={16} placeholder="Paste or type the post text here…" className="dash-mono" />

      <button type="submit" className="dash-btn dash-btn--primary">{original ? 'Save changes' : 'Create post'}</button>
    </form>
  );
}
