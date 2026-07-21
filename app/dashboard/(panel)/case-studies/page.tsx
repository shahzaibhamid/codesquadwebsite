import Link from 'next/link';
import { getCaseStudies } from '@/lib/caseStudies';
import DeleteCaseStudyButton from '@/components/dashboard/DeleteCaseStudyButton';
import CaseStudyInstructions from '@/components/dashboard/CaseStudyInstructions';

export const dynamic = 'force-dynamic';

const messages: Record<string, string> = {
  created: 'Case study created.',
  updated: 'Case study updated.',
  deleted: 'Case study deleted.',
};

export default async function CaseStudiesPage({
  searchParams,
}: {
  searchParams: { ok?: string };
}) {
  const items = await getCaseStudies({ includeDrafts: true });

  return (
    <>
      <div className="cs-dash__head">
        <h1>Case studies</h1>
        <Link className="cs-btn cs-btn--primary cs-btn--sm" href="/dashboard/case-studies/new">+ New case study</Link>
      </div>

      {searchParams.ok && messages[searchParams.ok] && (
        <div className="cs-form__status cs-form__status--ok" style={{ marginBottom: 18 }}>{messages[searchParams.ok]}</div>
      )}

      <CaseStudyInstructions />

      <div className="cs-dash__notice">
        Published items appear in the homepage “Case studies” section. Lower display-order numbers appear first.
      </div>

      <div className="cs-dash__table">
        <div className="cs-dash__row cs-dash__row--head">
          <span>Client</span><span>Category</span><span>Status / order</span><span>Actions</span>
        </div>
        {items.map((item) => (
          <div className="cs-dash__row" key={item.slug}>
            <span className="cs-dash__title">{item.name}</span>
            <span>{item.category}</span>
            <span>{item.published ? 'Published' : 'Draft'} · {item.sortOrder}</span>
            <span className="cs-dash__actions">
              <Link className="cs-btn cs-btn--ghost cs-btn--sm" href={`/dashboard/case-studies/edit/${item.slug}`}>Edit</Link>
              <Link className="cs-btn cs-btn--ghost cs-btn--sm" href={`/case-studies/${item.slug}`}>Visit</Link>
              <DeleteCaseStudyButton slug={item.slug} />
            </span>
          </div>
        ))}
        {items.length === 0 && <div className="cs-dash__row">No case studies yet.</div>}
      </div>
    </>
  );
}
