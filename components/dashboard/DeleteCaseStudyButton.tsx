'use client';

import { deleteCaseStudy } from '@/app/dashboard/case-study-actions';

export default function DeleteCaseStudyButton({ slug }: { slug: string }) {
  return (
    <form
      action={deleteCaseStudy}
      onSubmit={(event) => {
        if (!confirm('Delete this case study? This cannot be undone.')) event.preventDefault();
      }}
    >
      <input type="hidden" name="slug" value={slug} />
      <button className="cs-btn cs-btn--ghost cs-btn--sm" type="submit">Delete</button>
    </form>
  );
}
