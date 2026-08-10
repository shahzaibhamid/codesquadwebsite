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
    <form className="cs-form" action={action} encType="multipart/form-data">
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
        <label htmlFor="pf-image-url">Cover image URL</label>
        <input
          id="pf-image-url"
          name="image_url"
          className="cs-input"
          type="url"
          defaultValue={post?.image?.startsWith('http') ? post.image : ''}
          placeholder="https://example.com/cover.jpg"
        />
      </div>

      <div className="cs-field">
        <label htmlFor="pf-image-file">Upload cover image</label>
        <input id="pf-image-file" name="image_file" className="cs-input" type="file" accept="image/*" />
        <input type="hidden" name="existing_image" defaultValue={post?.image} />
        {post?.image && <small>Current cover: {post.image}</small>}
        <small>Uploading a new image or entering a new URL replaces the current cover.</small>
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
          <br />• To place an image, write <code>#IMAGE#</code> on its own line exactly where it should appear — add the images below, in the same order as the markers.
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

      <div className="cs-field">
        <label htmlFor="pf-content-image-links">In-content image URLs</label>
        <textarea
          id="pf-content-image-links"
          name="content_image_links"
          className="cs-textarea"
          placeholder={'https://example.com/image-1.jpg\nhttps://example.com/image-2.jpg'}
        />
        <small>One URL per line. Matched in order to each #IMAGE# marker above, before the uploaded files below.</small>
      </div>

      <div className="cs-field">
        <label htmlFor="pf-content-image-files">Upload in-content images</label>
        <input id="pf-content-image-files" name="content_image_files" className="cs-input" type="file" accept="image/*" multiple />
        <small>You may select multiple images. They fill #IMAGE# markers after the URLs above, in the order selected.</small>
      </div>

      <button className="cs-btn cs-btn--primary" type="submit">
        {submitLabel}
      </button>
    </form>
  );
}
