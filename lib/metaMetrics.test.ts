// Unit tests for the Meta Ads math. Run with:  npm test
// (Uses Node's built-in test runner with native TypeScript type-stripping.)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  div,
  computeMetrics,
  pctChange,
  directionFor,
  dailySeries,
  groupMetrics,
  adSummaries,
  topAd,
} from './metaMetrics';
import type { AdRow } from './metaTypes';

function ad(partial: Partial<AdRow>): AdRow {
  return {
    date: '2026-11-01',
    campaign: 'C1',
    adSet: 'S1',
    adName: 'A1',
    adId: '1',
    spend: 0,
    currency: 'USD',
    impressions: 0,
    reach: 0,
    frequency: 0,
    clicksAll: 0,
    linkClicks: 0,
    ctr: 0,
    cpc: 0,
    cpm: 0,
    leads: 0,
    costPerLead: null,
    landingPageViews: 0,
    postEngagement: 0,
    videoPlays: 0,
    thruPlays: 0,
    video25: 0,
    video50: 0,
    video100: 0,
    qualityRanking: 'Not enough data',
    engagementRanking: 'Not enough data',
    ...partial,
  };
}

test('div guards against zero denominator', () => {
  assert.equal(div(10, 2), 5);
  assert.equal(div(10, 0), null);
  assert.equal(div(0, 0), null);
});

test('computeMetrics sums totals and derives rates from the totals', () => {
  const rows = [
    ad({ spend: 100, impressions: 1000, reach: 800, clicksAll: 60, linkClicks: 50, leads: 5 }),
    ad({ spend: 50, impressions: 1000, reach: 900, clicksAll: 40, linkClicks: 30, leads: 0 }),
  ];
  const m = computeMetrics(rows);
  assert.equal(m.spend, 150);
  assert.equal(m.impressions, 2000);
  assert.equal(m.linkClicks, 80);
  assert.equal(m.leads, 5);
  // Link CTR = 80 / 2000 * 100 = 4%, NOT the average of the daily CTRs.
  assert.equal(m.linkCtr, 4);
  // CTR (all) = 100 / 2000 * 100 = 5%.
  assert.equal(m.ctrAll, 5);
  // CPC = 150 / 80 = 1.875.
  assert.equal(m.cpc, 1.875);
  // CPM = 150 / 2000 * 1000 = 75.
  assert.equal(m.cpm, 75);
  // CPL = 150 / 5 = 30.
  assert.equal(m.costPerLead, 30);
  // Lead conversion = 5 / 80 * 100 = 6.25%.
  assert.equal(m.leadConversionRate, 6.25);
  // Frequency (approx) = 2000 / 1700.
  assert.ok(Math.abs((m.frequencyApprox as number) - 2000 / 1700) < 1e-9);
});

test('computeMetrics returns null (—) for zero-lead CPL and empty input', () => {
  const noLeads = computeMetrics([ad({ spend: 20, impressions: 500, linkClicks: 10 })]);
  assert.equal(noLeads.costPerLead, null);

  const empty = computeMetrics([]);
  assert.equal(empty.spend, 0);
  assert.equal(empty.linkCtr, null);
  assert.equal(empty.cpc, null);
  assert.equal(empty.frequencyApprox, null);
});

test('video rates compute from Video Plays', () => {
  const m = computeMetrics([ad({ videoPlays: 1000, video25: 400, thruPlays: 250 })]);
  assert.equal(m.videoHookRate, 40); // 400 / 1000 * 100
  assert.equal(m.thruPlayRate, 25); // 250 / 1000 * 100
});

test('pctChange handles baselines and zero', () => {
  assert.equal(pctChange(150, 100), 50);
  assert.equal(pctChange(50, 100), -50);
  assert.equal(pctChange(0, 0), 0);
  assert.equal(pctChange(10, 0), null);
  assert.equal(pctChange(null, 100), null);
});

test('directionFor marks cost metrics as down-good and spend neutral', () => {
  assert.equal(directionFor('cpc'), 'down-good');
  assert.equal(directionFor('cpm'), 'down-good');
  assert.equal(directionFor('costPerLead'), 'down-good');
  assert.equal(directionFor('spend'), 'neutral');
  assert.equal(directionFor('leads'), 'up-good');
});

test('dailySeries is one point per day, sorted ascending', () => {
  const rows = [
    ad({ date: '2026-11-03', spend: 30, leads: 1 }),
    ad({ date: '2026-11-01', spend: 10, leads: 0 }),
    ad({ date: '2026-11-01', spend: 5, leads: 2 }),
    ad({ date: '2026-11-02', spend: 20, leads: 1 }),
  ];
  const series = dailySeries(rows);
  assert.deepEqual(series.map((p) => p.date), ['2026-11-01', '2026-11-02', '2026-11-03']);
  assert.equal(series[0].spend, 15); // two rows on the 1st summed
  assert.equal(series[0].leads, 2);
});

test('groupMetrics aggregates per key and counts distinct active days', () => {
  const rows = [
    ad({ campaign: 'A', date: '2026-11-01', spend: 10 }),
    ad({ campaign: 'A', date: '2026-11-02', spend: 20 }),
    ad({ campaign: 'B', date: '2026-11-01', spend: 5 }),
  ];
  const groups = groupMetrics(rows, 'campaign');
  const a = groups.find((g) => g.key === 'A')!;
  assert.equal(a.spend, 30);
  assert.equal(a.daysActive, 2);
});

test('topAd prefers lowest CPL, falls back to highest CTR with >=100 impressions', () => {
  const rows = [
    ad({ adId: '1', adName: 'Cheap', spend: 30, leads: 3, linkClicks: 100, impressions: 5000 }),
    ad({ adId: '2', adName: 'Pricey', spend: 40, leads: 2, linkClicks: 80, impressions: 5000 }),
  ];
  const best = topAd(adSummaries(rows));
  assert.equal(best?.adId, '1'); // CPL 10 < 20

  const noLeads = [
    ad({ adId: '3', adName: 'LowCtr', linkClicks: 10, impressions: 5000 }),
    ad({ adId: '4', adName: 'HighCtr', linkClicks: 50, impressions: 1000 }),
    ad({ adId: '5', adName: 'TooFewImps', linkClicks: 50, impressions: 50 }),
  ];
  const best2 = topAd(adSummaries(noLeads));
  assert.equal(best2?.adId, '4'); // 5% CTR, and has >=100 impressions
});
