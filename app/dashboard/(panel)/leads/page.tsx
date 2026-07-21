import { getLeads } from '@/lib/leads';

export const dynamic = 'force-dynamic';

const SOURCE_LABEL: Record<string, string> = {
  'growth-club': 'Base Camp',
  'ai-basecamp': 'AI Basecamp',
  'ai-audit': 'AI Audit',
  contact: 'Contact',
};

export default async function LeadsPage() {
  const leads = await getLeads();

  return (
    <>
      <div className="cs-dash__head">
        <h1>Leads</h1>
      </div>

      <div className="cs-dash__notice">
        Submissions from the Base Camp application, AI Audit, and Contact forms are saved locally to{' '}
        <code>content/leads.json</code>. To persist on live hosting (e.g. Vercel), connect Supabase later (see{' '}
        <code>supabase/schema.sql</code>).
      </div>

      <div className="cs-dash__table">
        <div className="cs-dash__row cs-dash__row--head">
          <span>Name</span>
          <span>Email</span>
          <span>Source</span>
          <span>Date</span>
        </div>
        {leads.map((l) => (
          <div className="cs-dash__row" key={l.id}>
            <span className="cs-dash__title">
              {l.name}
              {l.company ? ` — ${l.company}` : ''}
              {(l.role || l.message || l.tools) && (
                <span style={{ display: 'block', color: 'var(--cs-muted)', fontWeight: 400, fontSize: 13, marginTop: 4 }}>
                  {l.role && (
                    <>
                      <b>Role:</b> {l.role}
                      <br />
                    </>
                  )}
                  {l.message && (
                    <>
                      <b>Challenge:</b> {l.message}
                      <br />
                    </>
                  )}
                  {l.tools && (
                    <>
                      <b>Tools:</b> {l.tools}
                    </>
                  )}
                </span>
              )}
            </span>
            <span>
              <a href={`mailto:${l.email}`}>{l.email}</a>
            </span>
            <span>{SOURCE_LABEL[l.source] || l.source}</span>
            <span>{new Date(l.createdAt).toLocaleString()}</span>
          </div>
        ))}
        {leads.length === 0 && <div className="cs-dash__row">No leads yet.</div>}
      </div>
    </>
  );
}
