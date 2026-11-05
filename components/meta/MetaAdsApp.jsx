'use client';
import { useMemo } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  resolveRange,
  previousRange,
  buildOptions,
  filterAds,
  filterLeads,
  inRange,
  todayInZone,
} from '../../lib/metaFilters';
import { dateTimeInZone } from '../../lib/metaFormat';
import { TZ } from './config';
import { useMetaData } from './useMetaData';
import FilterBar from './FilterBar';
import OverviewTab from './tabs/OverviewTab';
import CampaignsTab from './tabs/CampaignsTab';
import AdsTab from './tabs/AdsTab';
import LeadsTab from './tabs/LeadsTab';
import DailyDataTab from './tabs/DailyDataTab';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'campaigns', label: 'Campaigns' },
  { key: 'ads', label: 'Ads' },
  { key: 'leads', label: 'Leads' },
  { key: 'daily', label: 'Daily Data' },
];

export default function MetaAdsApp() {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const { data, loading, error, refreshing, reload, refresh } = useMetaData();

  // ── filter state lives in the URL ──────────────────────────────────────────
  const tab = sp.get('tab') || 'overview';
  const preset = sp.get('preset') || 'last7';
  const start = sp.get('start') || '';
  const end = sp.get('end') || '';
  const compare = sp.get('cmp') !== '0';
  const selection = {
    campaigns: sp.getAll('c'),
    adSets: sp.getAll('s'),
    ads: sp.getAll('a'),
  };

  const setQuery = (patch) => {
    const params = new URLSearchParams(Array.from(sp.entries()));
    for (const [k, v] of Object.entries(patch)) {
      params.delete(k);
      if (v === undefined || v === null || v === '') continue;
      if (Array.isArray(v)) v.forEach((x) => x !== '' && params.append(k, x));
      else params.set(k, v);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // ── derive the working data sets ───────────────────────────────────────────
  const ads = data?.ads || [];
  const leads = data?.leads || [];

  const range = useMemo(() => resolveRange(preset, TZ, start, end), [preset, start, end]);
  const prevRange = useMemo(() => (compare ? previousRange(range) : null), [compare, range]);
  const options = useMemo(() => buildOptions(ads, selection), [ads, selection.campaigns, selection.adSets, selection.ads]); // eslint-disable-line react-hooks/exhaustive-deps
  const filteredAds = useMemo(() => filterAds(ads, range, selection), [ads, range, selection.campaigns, selection.adSets, selection.ads]); // eslint-disable-line react-hooks/exhaustive-deps
  const prevAds = useMemo(() => (prevRange ? filterAds(ads, prevRange, selection) : []), [ads, prevRange, selection.campaigns, selection.adSets, selection.ads]); // eslint-disable-line react-hooks/exhaustive-deps
  const filteredLeads = useMemo(() => filterLeads(leads, range, selection), [leads, range, selection.campaigns, selection.adSets, selection.ads]); // eslint-disable-line react-hooks/exhaustive-deps

  const includesToday = inRange(todayInZone(TZ), range);

  // ── render ─────────────────────────────────────────────────────────────────
  return (
    <div className="meta-page">
      <header className="meta-header">
        <div className="meta-header__top">
          <div>
            <h1 className="meta-title">Meta Ads</h1>
            <p className="meta-updated">
              {data ? `Last updated: ${dateTimeInZone(data.fetchedAt, TZ)} (PKT)` : 'Loading…'}
            </p>
          </div>
          <button
            type="button"
            className="meta-refresh"
            onClick={refresh}
            disabled={refreshing || loading}
          >
            <span className={`meta-refresh__spin${refreshing ? ' is-spin' : ''}`}>↻</span>
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </div>

        <FilterBar
          preset={preset}
          start={start}
          end={end}
          compare={compare}
          options={options}
          selection={selection}
          onPreset={(v) => setQuery({ preset: v, ...(v !== 'custom' ? { start: undefined, end: undefined } : {}) })}
          onCustom={(s, e) => setQuery({ preset: 'custom', start: s || undefined, end: e || undefined })}
          onCompare={(b) => setQuery({ cmp: b ? undefined : '0' })}
          onSelection={(patch) => {
            if ('campaigns' in patch) setQuery({ c: patch.campaigns, s: undefined, a: undefined });
            else if ('adSets' in patch) setQuery({ s: patch.adSets, a: undefined });
            else if ('ads' in patch) setQuery({ a: patch.ads });
          }}
        />

        {includesToday && (
          <p className="meta-note">ℹ️ Ad stats update daily at 8 AM; leads update instantly.</p>
        )}

        <nav className="meta-tabs">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={`meta-tab${tab === t.key ? ' is-active' : ''}`}
              onClick={() => setQuery({ tab: t.key })}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      <div className="meta-body">
        {error ? (
          <ErrorBanner message={error} onRetry={reload} />
        ) : loading && !data ? (
          <Skeleton />
        ) : (
          <>
            {tab === 'overview' && (
              <OverviewTab ads={filteredAds} prevAds={prevAds} leads={filteredLeads} compare={compare} />
            )}
            {tab === 'campaigns' && <CampaignsTab ads={filteredAds} />}
            {tab === 'ads' && <AdsTab ads={filteredAds} />}
            {tab === 'leads' && <LeadsTab leads={filteredLeads} />}
            {tab === 'daily' && <DailyDataTab ads={filteredAds} />}
          </>
        )}
      </div>
    </div>
  );
}

function ErrorBanner({ message, onRetry }) {
  return (
    <div className="meta-error">
      <div className="meta-error__icon">⚠️</div>
      <div className="meta-error__body">
        <strong>Couldn’t load Meta Ads data.</strong>
        <p>{message}</p>
      </div>
      <button type="button" className="meta-btn-primary" onClick={onRetry}>Try again</button>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="meta-skel">
      <div className="meta-kpis">
        {Array.from({ length: 10 }).map((_, i) => <div className="meta-skel__kpi" key={i} />)}
      </div>
      <div className="meta-grid2">
        <div className="meta-skel__panel" />
        <div className="meta-skel__panel" />
      </div>
    </div>
  );
}
