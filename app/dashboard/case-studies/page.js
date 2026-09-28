import { getCases } from '../../../lib/store';
import StoreStatus from '../../../components/dash/StoreStatus';
import { deleteCaseAction } from '../actions';

export const dynamic = 'force-dynamic';

export default async function CaseStudiesPage({ searchParams }) {
  let cases = [];
  let loadError = '';
  try { cases = await getCases({ strict: true }); } catch (e) { loadError = e.message; }
  return (
    <div className="dash-wrap">
      <div className="dash-head">
        <h1>Case studies</h1>
        <a href="/dashboard/case-studies/new" className="dash-btn dash-btn--primary">+ New case study</a>
      </div>
      <StoreStatus loadError={loadError} flash={{ error: searchParams?.error }} />
      <div className="dash-table">
        <div className="dash-tr dash-tr--head"><span>Client</span><span>Category</span><span>Filter</span><span>Actions</span></div>
        {cases.map((c) => (
          <div className="dash-tr" key={c.slug}>
            <span className="dash-td--title">{c.name}</span>
            <span><span className="dash-pill">{c.cat}</span></span>
            <span className="dash-muted">{c.filter}</span>
            <span className="dash-actions">
              <a href={`/dashboard/case-studies/edit/${c.slug}`}>Edit</a>
              <a href={`/case-studies/${c.slug}`} target="_blank" rel="noopener">Visit</a>
              <form action={deleteCaseAction}><input type="hidden" name="slug" value={c.slug} /><button type="submit" className="dash-del">Delete</button></form>
            </span>
          </div>
        ))}
        {cases.length === 0 && !loadError ? <div className="dash-empty">No case studies yet.</div> : null}
      </div>
    </div>
  );
}
