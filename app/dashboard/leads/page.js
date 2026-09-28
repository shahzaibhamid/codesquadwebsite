import { getLeads, isLive } from '../../../lib/store';

export const dynamic = 'force-dynamic';

export default async function LeadsPage() {
  let leads = [];
  let loadError = '';
  try { leads = await getLeads(); } catch (e) { loadError = e.message; }
  return (
    <div className="dash-wrap">
      <div className="dash-head"><h1>Leads</h1></div>
      {loadError ? (
        <div className="dash-note dash-note--err" role="alert">{loadError}</div>
      ) : (
        <div className="dash-note">Inquiries from the <a href="/inquiry" target="_blank" rel="noopener">/inquiry</a> page. {isLive() ? 'Saved in Supabase.' : 'Local development: saved to content/leads.json.'}</div>
      )}
      <div className="dash-table">
        <div className="dash-tr dash-tr--head dash-tr--leads"><span>Name</span><span>Email</span><span>Source</span><span>Date</span></div>
        {leads.map((l, i) => {
          const p = l.payload || {};
          return (
            <div key={l.id || i}>
              <div className="dash-tr dash-tr--leads">
                <span className="dash-td--title">{l.name || '—'}</span>
                <span className="dash-muted">{l.email ? <a href={`mailto:${l.email}`}>{l.email}</a> : '—'}</span>
                <span><span className="dash-pill">{l.source || '—'}</span></span>
                <span className="dash-muted">{l.date || '—'}</span>
              </div>
              {p.phone || p.business || p.message ? (
                <div className="dash-lead-detail">
                  {p.phone ? <span><b>Phone:</b> {p.phone}</span> : null}
                  {p.business ? <span><b>Business:</b> {p.business}</span> : null}
                  {p.message ? <p>{p.message}</p> : null}
                </div>
              ) : null}
            </div>
          );
        })}
        {leads.length === 0 && !loadError ? <div className="dash-empty">No leads yet.</div> : null}
      </div>
    </div>
  );
}
