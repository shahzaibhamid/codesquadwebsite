'use client';
import { useMemo, useState } from 'react';
import { money, count, percent, prettyDate } from '../../../lib/metaFormat';
import { CURRENCY } from '../config';
import { downloadCsv } from '../csv';

const PAGE_SIZE = 50;

// Every parsed column of Sheet 1. `raw` is used for CSV; `fmt` for display.
const COLS = [
  { key: 'date', label: 'Date', fmt: (r) => prettyDate(r.date), raw: (r) => r.date, text: true },
  { key: 'campaign', label: 'Campaign', fmt: (r) => r.campaign, raw: (r) => r.campaign, text: true },
  { key: 'adSet', label: 'Ad Set', fmt: (r) => r.adSet, raw: (r) => r.adSet, text: true },
  { key: 'adName', label: 'Ad Name', fmt: (r) => r.adName, raw: (r) => r.adName, text: true },
  { key: 'adId', label: 'Ad ID', fmt: (r) => r.adId, raw: (r) => r.adId, text: true },
  { key: 'spend', label: 'Spend', fmt: (r) => money(r.spend, CURRENCY), raw: (r) => r.spend },
  { key: 'currency', label: 'Currency', fmt: (r) => r.currency, raw: (r) => r.currency, text: true },
  { key: 'impressions', label: 'Impressions', fmt: (r) => count(r.impressions), raw: (r) => r.impressions },
  { key: 'reach', label: 'Reach', fmt: (r) => count(r.reach), raw: (r) => r.reach },
  { key: 'frequency', label: 'Frequency', fmt: (r) => r.frequency.toFixed(2), raw: (r) => r.frequency },
  { key: 'clicksAll', label: 'Clicks (All)', fmt: (r) => count(r.clicksAll), raw: (r) => r.clicksAll },
  { key: 'linkClicks', label: 'Link Clicks', fmt: (r) => count(r.linkClicks), raw: (r) => r.linkClicks },
  { key: 'ctr', label: 'CTR (%)', fmt: (r) => percent(r.ctr), raw: (r) => r.ctr },
  { key: 'cpc', label: 'CPC', fmt: (r) => money(r.cpc, CURRENCY), raw: (r) => r.cpc },
  { key: 'cpm', label: 'CPM', fmt: (r) => money(r.cpm, CURRENCY), raw: (r) => r.cpm },
  { key: 'leads', label: 'Leads', fmt: (r) => count(r.leads), raw: (r) => r.leads },
  { key: 'costPerLead', label: 'Cost per Lead', fmt: (r) => (r.costPerLead === null ? '—' : money(r.costPerLead, CURRENCY)), raw: (r) => (r.costPerLead === null ? '' : r.costPerLead) },
  { key: 'landingPageViews', label: 'Landing Page Views', fmt: (r) => count(r.landingPageViews), raw: (r) => r.landingPageViews },
  { key: 'postEngagement', label: 'Post Engagement', fmt: (r) => count(r.postEngagement), raw: (r) => r.postEngagement },
  { key: 'videoPlays', label: 'Video Plays', fmt: (r) => count(r.videoPlays), raw: (r) => r.videoPlays },
  { key: 'thruPlays', label: 'ThruPlays', fmt: (r) => count(r.thruPlays), raw: (r) => r.thruPlays },
  { key: 'video25', label: 'Video 25%', fmt: (r) => count(r.video25), raw: (r) => r.video25 },
  { key: 'video50', label: 'Video 50%', fmt: (r) => count(r.video50), raw: (r) => r.video50 },
  { key: 'video100', label: 'Video 100%', fmt: (r) => count(r.video100), raw: (r) => r.video100 },
  { key: 'qualityRanking', label: 'Quality Ranking', fmt: (r) => r.qualityRanking, raw: (r) => r.qualityRanking, text: true },
  { key: 'engagementRanking', label: 'Engagement Ranking', fmt: (r) => r.engagementRanking, raw: (r) => r.engagementRanking, text: true },
];

export default function DailyDataTab({ ads }) {
  const [sortKey, setSortKey] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(0);

  const col = COLS.find((c) => c.key === sortKey) || COLS[0];

  const sorted = useMemo(() => {
    const copy = [...ads];
    copy.sort((a, b) => {
      const av = col.raw(a);
      const bv = col.raw(b);
      let cmp;
      if (col.text) cmp = String(av).localeCompare(String(bv));
      else cmp = (Number(av) || 0) - (Number(bv) || 0);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [ads, col, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount - 1);
  const pageRows = sorted.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE);

  const clickHeader = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir(key === 'date' ? 'desc' : 'desc'); }
    setPage(0);
  };

  const exportCsv = () => {
    const headers = COLS.map((c) => c.label);
    const rows = sorted.map((r) => COLS.map((c) => c.raw(r)));
    downloadCsv('meta-daily-data.csv', headers, rows);
  };

  if (ads.length === 0) {
    return <p className="meta-muted meta-pad">No rows in this range.</p>;
  }

  return (
    <div className="meta-daily">
      <div className="meta-tabletools">
        <span className="meta-muted">{count(sorted.length)} rows</span>
        <button type="button" className="meta-btn-ghost" onClick={exportCsv}>Export CSV</button>
      </div>

      <div className="meta-tablescroll meta-tablescroll--tall">
        <table className="meta-table meta-table--dense">
          <thead>
            <tr>
              {COLS.map((c) => (
                <th
                  key={c.key}
                  className={`${c.text ? '' : 'meta-th-num'}${sortKey === c.key ? ' is-sorted' : ''}`}
                  onClick={() => clickHeader(c.key)}
                >
                  {c.label}{sortKey === c.key ? <span className="meta-sort">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r, i) => (
              <tr key={`${r.adId}-${r.date}-${i}`}>
                {COLS.map((c) => (
                  <td key={c.key} className={c.text ? '' : 'meta-td-num'}>{c.fmt(r)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="meta-pager">
        <button type="button" className="meta-btn-ghost" disabled={safePage === 0} onClick={() => setPage(safePage - 1)}>← Prev</button>
        <span className="meta-muted">Page {safePage + 1} of {pageCount}</span>
        <button type="button" className="meta-btn-ghost" disabled={safePage >= pageCount - 1} onClick={() => setPage(safePage + 1)}>Next →</button>
      </div>
    </div>
  );
}
