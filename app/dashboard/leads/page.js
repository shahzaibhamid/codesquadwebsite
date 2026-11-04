import { getLeads, isLive } from '../../../lib/store';
import { deleteLeadAction } from '../actions';
import { AUDIT_QUESTIONS, getLowIntentTag } from '../../../lib/auditQuestions';

export const dynamic = 'force-dynamic';

// Lead shapes: main-site audit stores payload.answers[]; the healthcare subdomain form
// stores payload.audit{id: answer}, payload.website and payload.tags. Normalize both.
function normalize(raw) {
  const p = { ...(raw || {}) };
  if (!Array.isArray(p.answers) && p.audit && typeof p.audit === 'object') {
    p.answers = AUDIT_QUESTIONS
      .filter((q) => p.audit[q.id])
      .map((q) => ({ id: q.id, question: q.question, answer: String(p.audit[q.id]) }));
    if (p.lowIntent === undefined) p.lowIntent = getLowIntentTag(p.audit.role);
  }
  p.profile = p.profile || p.website || '';
  p.tags = Array.isArray(p.tags) ? p.tags.filter(Boolean) : [];
  return p;
}

// Answer text for a question id, or an em dash (legacy inquiry leads have no answers).
function answerOf(p, id) {
  const a = Array.isArray(p.answers) ? p.answers.find((x) => x.id === id) : null;
  return a?.answer || '—';
}

// Only link http(s) URLs or bare domains; plain text (e.g. @handle) stays text.
function profileHref(v) {
  const s = String(v || '').trim();
  if (/^https?:\/\/\S+$/i.test(s)) return s;
  if (/^(www\.)?[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(s)) return `https://${s}`;
  return '';
}

export default async function LeadsPage({ searchParams }) {
  let leads = [];
  let loadError = '';
  try { leads = await getLeads(); } catch (e) { loadError = e.message; }
  const flashError = searchParams?.error;
  const flashOk = searchParams?.deleted ? '✓ Lead deleted.' : '';
  return (
    <div className="dash-wrap">
      <div className="dash-head"><h1>Leads</h1></div>
      {flashError ? <div className="dash-note dash-note--err" role="alert">{flashError}</div> : null}
      {flashOk ? <div className="dash-note dash-note--ok" role="status">{flashOk}</div> : null}
      {loadError ? (
        <div className="dash-note dash-note--err" role="alert">{loadError}</div>
      ) : (
        <div className="dash-note">Growth Audit requests from the <a href="/inquiry" target="_blank" rel="noopener">/inquiry</a> page, plus earlier inquiries. {isLive() ? 'Saved in Supabase.' : 'Local development: saved to content/leads.json.'}</div>
      )}
      <div className="dash-table">
        <div className="dash-tr dash-tr--head dash-tr--leads"><span>Name / Business</span><span>Contact</span><span>Type</span><span>Budget</span><span>Timeline</span><span>Quality</span><span>Date</span><span>Actions</span></div>
        {leads.map((l, i) => {
          const p = normalize(l.payload);
          const hasAnswers = Array.isArray(p.answers) && p.answers.length > 0;
          const biz = p.businessName || p.business;
          const profileUrl = profileHref(p.profile);
          const type = answerOf(p, 'businessType');
          const budget = answerOf(p, 'budget');
          const timeline = answerOf(p, 'timeline');
          const hasDetail = hasAnswers || p.profile || (!hasAnswers && p.message);
          return (
            <div key={l.id || i}>
              <div className="dash-tr dash-tr--leads">
                <span>
                  <span className="dash-td--title">{l.name || '—'}</span>
                  {biz ? <span className="dash-sub">{biz}</span> : null}
                </span>
                <span className="dash-muted dash-contact">
                  {l.email ? <a href={`mailto:${l.email}`}>{l.email}</a> : '—'}
                  {p.phone ? <a href={`tel:${String(p.phone).replace(/[^\d+]/g, '')}`}>{p.phone}</a> : null}
                </span>
                <span className="dash-clip" title={type}>{type}</span>
                <span className="dash-clip" title={budget}>{budget}</span>
                <span className="dash-clip" title={timeline}>{timeline}</span>
                <span className="dash-pills"><span className="dash-pill">{l.source || '—'}</span>{p.lowIntent ? <span className="dash-pill dash-pill--low">{p.lowIntent}</span> : null}{p.tags.map((t) => <span key={t} className="dash-pill">{t}</span>)}</span>
                <span className="dash-muted">{l.date || '—'}</span>
                <span className="dash-actions">
                  <form action={deleteLeadAction}><input type="hidden" name="id" value={l.id ?? ''} /><button type="submit" className="dash-del">Delete</button></form>
                </span>
              </div>
              {hasDetail ? (
                <details className="dash-lead-more">
                  <summary>{hasAnswers ? 'View audit answers' : 'View details'}</summary>
                  <div className="dash-lead-detail">
                    {p.profile ? (
                      <span><b>Website / Instagram:</b> {profileUrl ? <a href={profileUrl} target="_blank" rel="noopener noreferrer">{p.profile}</a> : p.profile}</span>
                    ) : null}
                    {!hasAnswers && p.message ? <p>{p.message}</p> : null}
                    {hasAnswers ? (
                      <dl className="dash-lead-answers">
                        {p.answers.map((a, n) => (
                          <div key={a.id || n}><dt>{a.question}</dt><dd>{a.answer}</dd></div>
                        ))}
                      </dl>
                    ) : null}
                  </div>
                </details>
              ) : null}
            </div>
          );
        })}
        {leads.length === 0 && !loadError ? <div className="dash-empty">No leads yet.</div> : null}
      </div>
    </div>
  );
}
