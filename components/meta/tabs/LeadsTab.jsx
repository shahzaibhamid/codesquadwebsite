'use client';
import { useMemo, useState } from 'react';
import { count, maskPhone, maskEmail, digitsOnly } from '../../../lib/metaFormat';
import { todayInZone } from '../../../lib/metaFilters';
import { TZ, CHART } from '../config';
import { downloadCsv } from '../csv';
import LeadDrawer from '../LeadDrawer';

export default function LeadsTab({ leads }) {
  const [search, setSearch] = useState('');
  const [campaign, setCampaign] = useState('');
  const [adName, setAdName] = useState('');
  const [reveal, setReveal] = useState(false);
  const [active, setActive] = useState(null);

  const today = todayInZone(TZ);

  const campaignOptions = useMemo(
    () => Array.from(new Set(leads.map((l) => l.campaign).filter(Boolean))).sort(),
    [leads],
  );
  const adOptions = useMemo(
    () => Array.from(new Set(leads.filter((l) => !campaign || l.campaign === campaign).map((l) => l.adName).filter(Boolean))).sort(),
    [leads, campaign],
  );

  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (campaign && l.campaign !== campaign) return false;
      if (adName && l.adName !== adName) return false;
      if (q) {
        const hay = `${l.fullName} ${l.phone} ${l.email}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [leads, campaign, adName, q]);

  const leadsToday = useMemo(() => filtered.filter((l) => l.date === today).length, [filtered, today]);

  const byCampaign = useMemo(() => {
    const map = new Map();
    for (const l of filtered) map.set(l.campaign || '(none)', (map.get(l.campaign || '(none)') || 0) + 1);
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [filtered]);

  const perDay = useMemo(() => {
    const map = new Map();
    for (const l of filtered) map.set(l.date, (map.get(l.date) || 0) + 1);
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);
  const perDayMax = Math.max(1, ...perDay.map(([, n]) => n));
  const byCampaignMax = Math.max(1, ...byCampaign.map(([, n]) => n));

  const exportCsv = () => {
    const headers = ['Date & Time', 'Full Name', 'Phone', 'Email', 'City', 'Campaign', 'Ad Set', 'Ad Name', 'Platform', 'Organic?', 'Form ID', 'Lead ID', 'Ad ID'];
    const rows = filtered.map((l) => [l.dateTime, l.fullName, l.phone, l.email, l.city, l.campaign, l.adSet, l.adName, l.platform, l.organic, l.formId, l.leadId, l.adId]);
    downloadCsv('meta-leads.csv', headers, rows);
  };

  if (leads.length === 0) {
    return (
      <div className="meta-emptystate">
        <div className="meta-emptystate__icon">📭</div>
        <p>No leads yet. New Facebook form leads will appear here automatically within a minute of being submitted.</p>
      </div>
    );
  }

  return (
    <div className="meta-leads">
      <div className="meta-leadsummary">
        <div className="meta-leadsummary__stat">
          <span className="meta-leadsummary__num">{count(filtered.length)}</span>
          <span className="meta-leadsummary__lbl">Leads in range</span>
        </div>
        <div className="meta-leadsummary__stat">
          <span className="meta-leadsummary__num">{count(leadsToday)}</span>
          <span className="meta-leadsummary__lbl">Leads today</span>
        </div>
        <div className="meta-leadsummary__mini">
          <span className="meta-leadsummary__lbl">Leads by campaign</span>
          <div className="meta-minibars">
            {byCampaign.slice(0, 5).map(([name, n]) => (
              <div className="meta-minibar" key={name} title={`${name}: ${n}`}>
                <span className="meta-minibar__name">{name}</span>
                <div className="meta-minibar__track"><div className="meta-minibar__fill" style={{ width: `${(n / byCampaignMax) * 100}%` }} /></div>
                <span className="meta-minibar__n">{n}</span>
              </div>
            ))}
            {byCampaign.length === 0 && <span className="meta-muted">—</span>}
          </div>
        </div>
        <div className="meta-leadsummary__mini">
          <span className="meta-leadsummary__lbl">Leads per day</span>
          <div className="meta-sparkcols">
            {perDay.length === 0 && <span className="meta-muted">—</span>}
            {perDay.map(([d, n]) => (
              <div className="meta-sparkcol" key={d} title={`${d}: ${n}`}>
                <div className="meta-sparkcol__bar" style={{ height: `${(n / perDayMax) * 100}%`, background: CHART.leads }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="meta-tabletools">
        <input className="meta-search" placeholder="Search name, phone, or email…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="meta-tabletools__right">
          <select className="meta-select" value={campaign} onChange={(e) => { setCampaign(e.target.value); setAdName(''); }}>
            <option value="">All campaigns</option>
            {campaignOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="meta-select" value={adName} onChange={(e) => setAdName(e.target.value)}>
            <option value="">All ads</option>
            {adOptions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
          <button type="button" className="meta-btn-ghost" onClick={() => setReveal((r) => !r)}>
            {reveal ? '🙈 Hide' : '👁 Reveal'}
          </button>
          <button type="button" className="meta-btn-ghost" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="meta-muted meta-pad">No leads match your search.</p>
      ) : (
        <div className="meta-tablescroll">
          <table className="meta-table meta-table--leads">
            <thead>
              <tr>
                <th>Date &amp; Time</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>City</th>
                <th>Campaign</th>
                <th>Ad Name</th>
                <th>Platform</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => {
                const wa = digitsOnly(l.phone);
                return (
                  <tr key={l.leadId || i} className="meta-leadrow" onClick={() => setActive(l)}>
                    <td className="meta-nowrap">{l.dateTime}</td>
                    <td>{l.fullName || '—'}</td>
                    <td className="meta-nowrap">{l.phone ? (reveal ? l.phone : maskPhone(l.phone)) : '—'}</td>
                    <td>{l.email ? (reveal ? l.email : maskEmail(l.email)) : '—'}</td>
                    <td>{l.city || '—'}</td>
                    <td title={l.campaign}>{l.campaign || '—'}</td>
                    <td title={l.adName}>{l.adName || '—'}</td>
                    <td>{l.platform || '—'}</td>
                    <td className="meta-rowactions" onClick={(e) => e.stopPropagation()}>
                      {wa && <a className="meta-ico" href={`tel:${wa}`} title="Call">📞</a>}
                      {wa && <a className="meta-ico" href={`https://wa.me/${wa}`} target="_blank" rel="noopener" title="WhatsApp">💬</a>}
                      {l.email && <a className="meta-ico" href={`mailto:${l.email}`} title="Email">✉</a>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {active && <LeadDrawer lead={active} onClose={() => setActive(null)} />}
    </div>
  );
}
