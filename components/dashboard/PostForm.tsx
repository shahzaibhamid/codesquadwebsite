import { blogCategories } from '@/data/blog';
import type { BlogPost } from '@/types';

interface PostFormProps {
  action: (formData: FormData) => void | Promise<void>;
  post?: BlogPost;
  submitLabel: string;
}

/** Shared create/edit form for blog posts (server component). */
export default function PostForm({ action, post, submitLabel }: PostFormProps) {
  return (
    <form className="cs-form" action={action}>
      {post && <input type="hidden" name="original_slug" defaultValue={post.slug} />}

      <div className="cs-field">
        <label htmlFor="pf-title">Title</label>
        <input id="pf-title" name="title" className="cs-input" defaultValue={post?.title} required />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-slug">Slug (optional — auto-generated from title)</label>
        <input id="pf-slug" name="slug" className="cs-input" defaultValue={post?.slug} placeholder="my-post-url" />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-cat">Category</label>
        <select id="pf-cat" name="category" className="cs-input" defaultValue={post?.category || 'AI Automation'}>
          {blogCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="cs-field">
        <label htmlFor="pf-date">Date (optional — defaults to today)</label>
        <input id="pf-date" name="date" className="cs-input" defaultValue={post?.date} placeholder="July 8, 2026" />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-yt">YouTube URL (optional — auto-fills the card thumbnail)</label>
        <input id="pf-yt" name="youtube" className="cs-input" defaultValue={post?.youtube} placeholder="https://youtu.be/…" />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-excerpt">Excerpt</label>
        <textarea id="pf-excerpt" name="excerpt" className="cs-textarea" defaultValue={post?.excerpt} style={{ minHeight: 80 }} />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-content">Content</label>
        <div className="cs-dash__notice">
          <strong>How to format your post:</strong> just paste your text — no HTML needed.
          <br />• Leave a blank line between paragraphs.
          <br />• Start a line with <code># </code> for a big heading, <code>## </code> for a medium heading, or <code>### </code> for a small heading.
          <br />• Wrap text in <code>**double asterisks**</code> to make it bold.
        </div>
        <textarea
          id="pf-content"
          name="content"
          className="cs-textarea"
          defaultValue={post?.content}
          placeholder="Paste or type the post text here…"
          style={{ minHeight: 280 }}
        />
      </div>

      <button className="cs-btn cs-btn--primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
