'use client';

import { deletePost } from '@/app/dashboard/actions';

/** Delete form with a confirm prompt (server action does the actual delete). */
export default function DeleteButton({ slug }: { slug: string }) {
  return (
    <form
      action={deletePost}
      onSubmit={(e) => {
        if (!confirm('Delete this post? This cannot be undone.')) e.preventDefault();
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button className="cs-btn cs-btn--ghost cs-btn--sm" type="submit">
        Delete
      </button>
    </form>
  );
}
