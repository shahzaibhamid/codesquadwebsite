'use client';
import { useEffect, useMemo, useState } from 'react';
import { computeMetrics, groupBy } from '../../../lib/metaMetrics';
import { money, count, percent } from '../../../lib/metaFormat';
import { CURRENCY } from '../config';
import { downloadCsv } from '../csv';

const LS_KEY = 'meta-ads:campaign-hidden-cols';

// Metric columns (the first "name" column is always shown).
const COLUMNS = [
  { key: 'spend', label: 'Spend', get: (n) => n.m.spend, fmt: (v) => money(v, CURRENCY), num: true },
  { key: 'impressions', label: 'Impressions', get: (n) => n.m.impressions, fmt: count, num: true },
  { key: 'reach', label: 'Reach', get: (n) => n.m.reach, fmt: count, num: true },
  { key: 'linkClicks', label: 'Link Clicks', get: (n) => n.m.linkClicks, fmt: count, num: true },
  { key: 'linkCtr', label: 'Link CTR', get: (n) => n.m.linkCtr, fmt: (v) => percent(v), num: true },
  { key: 'cpc', label: 'CPC', get: (n) => n.m.cpc, fmt: (v) => money(v, CURRENCY), num: true },
  { key: 'cpm', label: 'CPM', get: (n) => n.m.cpm, fmt: (v) => money(v, CURRENCY), num: true },
  { key: 'leads', label: 'Leads', get: (n) => n.m.leads, fmt: count, num: true },
  { key: 'costPerLead', label: 'CPL', get: (n) => n.m.costPerLead, fmt: (v) => money(v, CURRENCY), num: true },
  { key: 'daysActive', label: 'Days active', get: (n) => n.daysActive, fmt: count, num: true },
];

function node(key, label, level, rows, children) {
  return {
    key,
    label,
    level,
    m: computeMetrics(rows),
    daysActive: new Set(rows.map((r) => r.date)).size,
    children,
  };
}

function buildTree(ads) {
  const out = [];
  for (const [campaign, cRows] of groupBy(ads, 'campaign')) {
    const sets = [];
    for (const [adSet, sRows] of groupBy(cRows, 'adSet')) {
      const adNodes = [];
      for (const [adId, aRows] of groupBy(sRows, 'adId')) {
        adNodes.push(node(`${campaign}|${adSet}|${adId}`, aRows[0].adName || '(unnamed ad)', 2, aRows, null));
      }
      sets.push(node(`${campaign}|${adSet}`, adSet || '(none)', 1, sRows, adNodes));
    }
    out.push(node(campaign, campaign || '(none)', 0, cRows, sets));
  }
  return out;
}

function matchesDeep(n, q) {
  if (!q) return true;
  if (n.label.toLowerCase().includes(q)) return true;
  return (n.children || []).some((c) => matchesDeep(c, q));
}

function sortNodes(nodes, col, dir) {
  if (!col) return nodes;
  const copy = [...nodes];
  copy.sort((a, b) => {
    const av = col.get(a);
    const bv = col.get(b);
    // Nulls always sink.
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    const cmp = col.num ? av - bv : String(av).localeCompare(String(bv));
    return dir === 'asc' ? cmp : -cmp;
  });
  return copy;
}

export default function CampaignsTab({ ads }) {
  const [expanded, setExpanded] = useState(() => new Set());
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('spend');
  const [sortDir, setSortDir] = useState('desc');
  const [hidden, setHidden] = useState(() => new Set());
  const [showCols, setShowCols] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setHidden(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const persistHidden = (next) => {
    setHidden(next);
    try { localStorage.setItem(LS_KEY, JSON.stringify([...next])); } catch {}
  };

  const tree = useMemo(() => buildTree(ads), [ads]);
  const q = search.trim().toLowerCase();
  const filtered = useMemo(() => tree.filter((n) => matchesDeep(n, q)), [tree, q]);

  const sortCol = COLUMNS.find((c) => c.key === sortKey) || null;
  const visibleCols = COLUMNS.filter((c) => !hidden.has(c.key));
  const topLevel = sortNodes(filtered, sortCol, sortDir);

  const totals = useMemo(() => computeMetrics(ads), [ads]);
  const totalDays = useMemo(() => new Set(ads.map((r) => r.date)).size, [ads]);
  const totalsNode = { m: totals, daysActive: totalDays };

  const toggleExpand = (key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const clickHeader = (key) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('desc'); }
  };

  const isOpen = (key) => q !== '' || expanded.has(key); // searching auto-expands

  const exportCsv = () => {
    const headers = ['Level', 'Name', ...visibleCols.map((c) => c.label)];
    const rows = [];
    const walk = (nodes) => {
      for (const n of sortNodes(nodes.filter((x) => matchesDeep(x, q)), sortCol, sortDir)) {
        const levelName = n.level === 0 ? 'Campaign' : n.level === 1 ? 'Ad Set' : 'Ad';
        rows.push([levelName, n.label, ...visibleCols.map((c) => {
          const v = c.get(n);
          return v === null ? '' : v;
        })]);
        if (n.children) walk(n.children);
      }
    };
    walk(filtered);
    downloadCsv('meta-campaigns.csv', headers, rows);
  };

  const renderRow = (n) => {
    const hasChildren = n.children && n.children.length > 0;
    const open = isOpen(n.key);
    return (
      <tbody key={n.key}>
        <tr className={`meta-row meta-row--l${n.level}`}>
          <td className="meta-td-name">
            <span style={{ paddingLeft: `${n.level * 18}px` }} className="meta-name-cell">
              {hasChildren ? (
                <button type="button" className="meta-caret" onClick={() => toggleExpand(n.key)} aria-label={open ? 'Collapse' : 'Expand'}>
                  {open ? '▾' : '▸'}
                </button>
              ) : (
                <span className="meta-caret meta-caret--leaf" />
              )}
              <span className="meta-name-text" title={n.label}>{n.label}</span>
            </span>
          </td>
          {visibleCols.map((c) => (
            <td key={c.key} className="meta-td-num">{c.fmt(c.get(n))}</td>
          ))}
        </tr>
        {open && hasChildren && sortNodes(n.children, sortCol, sortDir).map((child) => renderRow(child))}
      </tbody>
    );
  };

  return (
    <div className="meta-campaigns">
      <div className="meta-tabletools">
        <input
          className="meta-search"
          placeholder="Search campaign, ad set, or ad…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="meta-tabletools__right">
          <div className="meta-colpicker">
            <button type="button" className="meta-btn-ghost" onClick={() => setShowCols((s) => !s)}>
              Columns ▾
            </button>
            {showCols && (
              <div className="meta-colpicker__menu">
                {COLUMNS.map((c) => (
                  <label key={c.key} className="meta-colpicker__opt">
                    <input
                      type="checkbox"
                      checked={!hidden.has(c.key)}
                      onChange={() => {
                        const next = new Set(hidden);
                        next.has(c.key) ? next.delete(c.key) : next.add(c.key);
                        persistHidden(next);
                      }}
                    />
                    <span>{c.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <button type="button" className="meta-btn-ghost" onClick={exportCsv}>Export CSV</button>
        </div>
      </div>

      <div className="meta-tablescroll">
        <table className="meta-table">
          <thead>
            <tr>
              <th className="meta-th-name">Campaign / Ad Set / Ad</th>
              {visibleCols.map((c) => (
                <th
                  key={c.key}
                  className={`meta-th-num${sortKey === c.key ? ' is-sorted' : ''}`}
                  onClick={() => clickHeader(c.key)}
                >
                  {c.label}
                  {sortKey === c.key ? <span className="meta-sort">{sortDir === 'asc' ? ' ▲' : ' ▼'}</span> : null}
                </th>
              ))}
            </tr>
          </thead>
          {topLevel.map((n) => renderRow(n))}
          <tfoot>
            <tr className="meta-row meta-row--total">
              <td className="meta-td-name"><span className="meta-name-cell"><span className="meta-caret meta-caret--leaf" />Totals</span></td>
              {visibleCols.map((c) => (
                <td key={c.key} className="meta-td-num">{c.fmt(c.get(totalsNode))}</td>
              ))}
            </tr>
          </tfoot>
        </table>
        {topLevel.length === 0 && <p className="meta-muted meta-pad">No campaigns match.</p>}
      </div>
    </div>
  );
}
