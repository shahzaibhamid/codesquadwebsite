'use client';
import { useMemo } from 'react';
import {
  computeMetrics,
  pctChange,
  directionFor,
  dailySeries,
  groupMetrics,
  adSummaries,
  topAd,
} from '../../../lib/metaMetrics';
import { money, moneyCompact, compact, percent, count } from '../../../lib/metaFormat';
import { CURRENCY, CHART } from '../config';
import KpiCard from '../KpiCard';
import { SpendLeadsChart, ClicksCtrChart } from '../charts';

const KPIS = [
  { key: 'spend', label: 'Spend', fmt: (m) => moneyCompact(m.spend, CURRENCY), val: (m) => m.spend },
  { key: 'leads', label: 'Leads', fmt: (m) => compact(m.leads), val: (m) => m.leads },
  { key: 'costPerLead', label: 'Cost per Lead', fmt: (m) => money(m.costPerLead, CURRENCY), val: (m) => m.costPerLead },
  { key: 'linkClicks', label: 'Link Clicks', fmt: (m) => compact(m.linkClicks), val: (m) => m.linkClicks },
  { key: 'linkCtr', label: 'Link CTR', fmt: (m) => percent(m.linkCtr), val: (m) => m.linkCtr },
  { key: 'cpc', label: 'CPC', fmt: (m) => money(m.cpc, CURRENCY), val: (m) => m.cpc },
  { key: 'cpm', label: 'CPM', fmt: (m) => money(m.cpm, CURRENCY), val: (m) => m.cpm },
  { key: 'reach', label: 'Reach', fmt: (m) => compact(m.reach), val: (m) => m.reach },
  { key: 'impressions', label: 'Impressions', fmt: (m) => compact(m.impressions), val: (m) => m.impressions },
  {
    key: 'frequencyApprox',
    label: 'Frequency (approx.)',
    fmt: (m) => (m.frequencyApprox === null ? '—' : m.frequencyApprox.toFixed(2)),
    val: (m) => m.frequencyApprox,
    neutral: true,
  },
];

export default function OverviewTab({ ads, prevAds, leads, compare }) {
  const m = useMemo(() => computeMetrics(ads), [ads]);
  const pm = useMemo(() => computeMetrics(prevAds), [prevAds]);
  const series = useMemo(() => dailySeries(ads), [ads]);
  const campaigns = useMemo(
    () => groupMetrics(ads, 'campaign').sort((a, b) => b.spend - a.spend),
    [ads],
  );
  const best = useMemo(() => topAd(adSummaries(ads)), [ads]);

  const leadsWithDetails = leads.length;
  const totalSpend = m.spend || 0;

  // Funnel steps.
  const imp = m.impressions;
  const lc = m.linkClicks;
  const ld = m.leads;
  const maxFunnel = Math.max(imp, 1);
  const clickRate = imp > 0 ? (lc / imp) * 100 : null;
  const leadRate = lc > 0 ? (ld / lc) * 100 : null;

  return (
    <div className="meta-overview">
      <div className="meta-kpis">
        {KPIS.map((k) => {
          const change = compare ? pctChange(k.val(m), k.val(pm)) : null;
          const dir = k.neutral ? 'neutral' : directionFor(k.key);
          return (
            <KpiCard
              key={k.key}
              label={k.label}
              value={k.fmt(m)}
              change={change}
              direction={dir}
              sub={k.key === 'leads' ? `${count(leadsWithDetails)} with details` : undefined}
            />
          );
        })}
      </div>

      <div className="meta-grid2">
        <section className="meta-panel">
          <h3 className="meta-panel__title">Daily spend &amp; leads</h3>
          {series.length ? <SpendLeadsChart data={series} /> : <Empty />}
        </section>
        <section className="meta-panel">
          <h3 className="meta-panel__title">Link clicks &amp; Link CTR</h3>
          {series.length ? <ClicksCtrChart data={series} /> : <Empty />}
        </section>
      </div>

      <div className="meta-grid2">
        <section className="meta-panel">
          <h3 className="meta-panel__title">Spend by campaign</h3>
          {campaigns.length ? (
            <div className="meta-splitbars">
              {campaigns.map((c, i) => {
                const share = totalSpend > 0 ? (c.spend / totalSpend) * 100 : 0;
                return (
                  <div className="meta-splitbar" key={c.key || i}>
                    <div className="meta-splitbar__top">
                      <span className="meta-splitbar__name" title={c.key}>{c.key || '(none)'}</span>
                      <span className="meta-splitbar__val">
                        {money(c.spend, CURRENCY)} · {share.toFixed(1)}%
                      </span>
                    </div>
                    <div className="meta-splitbar__track">
                      <div
                        className="meta-splitbar__fill"
                        style={{ width: `${share}%`, background: CHART.bars[i % CHART.bars.length] }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <Empty />
          )}
        </section>

        <section className="meta-panel">
          <h3 className="meta-panel__title">Funnel</h3>
          <div className="meta-funnel">
            <FunnelStep label="Impressions" value={count(imp)} width={100} />
            <FunnelGap rate={clickRate} caption="of impressions clicked" />
            <FunnelStep label="Link Clicks" value={count(lc)} width={imp > 0 ? (lc / maxFunnel) * 100 : 0} />
            <FunnelGap rate={leadRate} caption="of clicks became leads" />
            <FunnelStep label="Leads" value={count(ld)} width={imp > 0 ? (ld / maxFunnel) * 100 : 0} accent />
          </div>
        </section>
      </div>

      <section className="meta-panel">
        <h3 className="meta-panel__title">Top ad</h3>
        {best ? (
          <div className="meta-topad">
            <div className="meta-topad__badge">BEST</div>
            <div className="meta-topad__main">
              <div className="meta-topad__name">{best.adName || '(unnamed ad)'}</div>
              <div className="meta-topad__meta">{best.campaign} · {best.adSet}</div>
            </div>
            <div className="meta-topad__stats">
              <Stat label="Spend" value={money(best.spend, CURRENCY)} />
              <Stat label="Leads" value={count(best.leads)} />
              <Stat label="CPL" value={money(best.costPerLead, CURRENCY)} />
              <Stat label="Link CTR" value={percent(best.linkCtr)} />
            </div>
          </div>
        ) : (
          <p className="meta-muted">No ad qualifies yet (needs a lead, or ≥100 impressions).</p>
        )}
      </section>
    </div>
  );
}

function Empty() {
  return <p className="meta-muted meta-chart-empty">No data in this range.</p>;
}

function Stat({ label, value }) {
  return (
    <div className="meta-stat">
      <span className="meta-stat__label">{label}</span>
      <span className="meta-stat__value">{value}</span>
    </div>
  );
}

function FunnelStep({ label, value, width, accent }) {
  return (
    <div className="meta-funnel__row">
      <div className="meta-funnel__label">{label}</div>
      <div className="meta-funnel__barwrap">
        <div
          className={`meta-funnel__bar${accent ? ' is-accent' : ''}`}
          style={{ width: `${Math.max(width, 3)}%` }}
        >
          <span>{value}</span>
        </div>
      </div>
    </div>
  );
}

function FunnelGap({ rate, caption }) {
  return (
    <div className="meta-funnel__gap">
      <span className="meta-funnel__rate">{rate === null ? '—' : `${rate.toFixed(2)}%`}</span>
      <span className="meta-funnel__caption">{caption}</span>
    </div>
  );
}
