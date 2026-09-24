import { getLeads } from '../../../lib/store';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  const leads = await getLeads();
  return (
    <div className="dash-wrap">
      <div className="dash-head"><h1>Leads</h1></div>
      <div className="dash-note">Form submissions from the site are saved to <code>content/leads.json</code>. On live hosting this needs Supabase to persist.</div>
      <div className="dash-table">
        <div className="dash-tr dash-tr--head dash-tr--leads"><span>Name</span><span>Email</span><span>Source</span><span>Date</span></div>
        {leads.map((l, i) => (
          <div className="dash-tr dash-tr--leads" key={i}>
            <span className="dash-td--title">{l.name || '—'}</span>
            <span className="dash-muted">{l.email || '—'}</span>
            <span><span className="dash-pill">{l.source || '—'}</span></span>
            <span className="dash-muted">{l.date || '—'}</span>
          </div>
        ))}
        {leads.length === 0 ? <div className="dash-empty">No leads yet.</div> : null}
      </div>
    </div>
  );
}
