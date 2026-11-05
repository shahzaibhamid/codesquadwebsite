'use client';
import { useMemo, useState } from 'react';
import { adSummaries, topAd, dailySeries, groupBy } from '../../../lib/metaMetrics';
import { money, count, percent } from '../../../lib/metaFormat';
import { CURRENCY } from '../config';
import { Sparkline } from '../charts';

const SORTS = [
  { key: 'spend', label: 'Spend', get: (a) => a.spend, dir: -1 },
  { key: 'costPerLead', label: 'CPL', get: (a) => a.costPerLead, dir: 1 },
  { key: 'linkCtr', label: 'CTR', get: (a) => a.linkCtr, dir: -1 },
  { key: 'leads', label: 'Leads', get: (a) => a.leads, dir: -1 },
];

export default function AdsTab({ ads }) {
  const [sortKey, setSortKey] = useState('spend');

  const summaries = useMemo(() => adSummaries(ads), [ads]);
  const best = useMemo(() => topAd(summaries), [summaries]);
  const seriesByAd = useMemo(() => {
    const map = new Map();
    for (const [adId, rows] of groupBy(ads, 'adId')) map.set(adId, dailySeries(rows));
    return map;
  }, [ads]);

  const sort = SORTS.find((s) => s.key === sortKey) || SORTS[0];
  const sorted = useMemo(() => {
    const copy = [...summaries];
    copy.sort((a, b) => {
      const av = sort.get(a);
      const bv = sort.get(b);
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return (av - bv) * sort.dir;
    });
    return copy;
  }, [summaries, sort]);

  if (summaries.length === 0) {
    return <p className="meta-muted meta-pad">No ads in this range.</p>;
  }

  return (
    <div className="meta-ads-tab">
      <div className="meta-tabletools">
        <div />
        <label className="meta-field meta-field--inline">
          <span className="meta-field__label">Sort by</span>
          <select className="meta-select" value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
            {SORTS.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
          </select>
        </label>
      </div>

      <div className="meta-adgrid">
        {sorted.map((a) => {
          const isBest = best && best.adId === a.adId;
          const hasVideo = a.videoPlays > 0;
          return (
            <div className={`meta-adcard${isBest ? ' is-best' : ''}`} key={a.adId}>
              {isBest && <div className="meta-adcard__best">★ Best</div>}
              <div className="meta-adcard__head">
                <div className="meta-adcard__name" title={a.adName}>{a.adName || '(unnamed ad)'}</div>
                <div className="meta-adcard__sub" title={`${a.campaign} · ${a.adSet}`}>{a.campaign} · {a.adSet}</div>
              </div>

              <div className="meta-adcard__spark">
                <Sparkline data={seriesByAd.get(a.adId)} />
              </div>

              <div className="meta-adcard__stats">
                <Cell label="Spend" value={money(a.spend, CURRENCY)} />
                <Cell label="Link Clicks" value={count(a.linkClicks)} />
                <Cell label="Link CTR" value={percent(a.linkCtr)} />
                <Cell label="CPC" value={money(a.cpc, CURRENCY)} />
                <Cell label="Leads" value={count(a.leads)} />
                <Cell label="CPL" value={money(a.costPerLead, CURRENCY)} />
              </div>

              <div className="meta-adcard__rankings">
                <Rank label="Quality" value={a.qualityRanking} />
                <Rank label="Engagement" value={a.engagementRanking} />
              </div>

              {hasVideo && (
                <div className="meta-adcard__video">
                  <div className="meta-adcard__videohead">
                    <span>Video</span>
                    <span className="meta-muted">{count(a.videoPlays)} plays</span>
                  </div>
                  <div className="meta-adcard__videostats">
                    <Cell label="Hook rate" value={percent(a.videoHookRate)} />
                    <Cell label="ThruPlay rate" value={percent(a.thruPlayRate)} />
                  </div>
                  <Retention plays={a.videoPlays} v25={a.video25} v50={a.video50} v100={a.video100} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Cell({ label, value }) {
  return (
    <div className="meta-cell">
      <span className="meta-cell__label">{label}</span>
      <span className="meta-cell__value">{value}</span>
    </div>
  );
}

function Rank({ label, value }) {
  return (
    <div className="meta-rank">
      <span className="meta-rank__label">{label}</span>
      <span className="meta-rank__value">{value}</span>
    </div>
  );
}

function Retention({ plays, v25, v50, v100 }) {
  const pct = (v) => (plays > 0 ? Math.min(100, (v / plays) * 100) : 0);
  const bars = [
    { label: '25%', w: pct(v25) },
    { label: '50%', w: pct(v50) },
    { label: '100%', w: pct(v100) },
  ];
  return (
    <div className="meta-retention">
      {bars.map((b) => (
        <div className="meta-retention__row" key={b.label}>
          <span className="meta-retention__label">{b.label}</span>
          <div className="meta-retention__track">
            <div className="meta-retention__fill" style={{ width: `${b.w}%` }} />
          </div>
          <span className="meta-retention__pct">{b.w.toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}
