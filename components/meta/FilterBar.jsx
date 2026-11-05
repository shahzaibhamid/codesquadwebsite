'use client';
import { PRESETS } from '../../lib/metaFilters';
import MultiSelect from './MultiSelect';

// The global filter row: date preset (+ custom pickers), cascading campaign/ad-set/ad
// multi-selects, and the "compare to previous period" toggle. All state is lifted to
// MetaAdsApp, which persists it in the URL query string.
export default function FilterBar({
  preset,
  start,
  end,
  compare,
  options,
  selection,
  onPreset,
  onCustom,
  onCompare,
  onSelection,
}) {
  return (
    <div className="meta-filters">
      <label className="meta-field">
        <span className="meta-field__label">Date range</span>
        <select
          className="meta-select"
          value={preset}
          onChange={(e) => onPreset(e.target.value)}
        >
          {PRESETS.map((p) => (
            <option key={p.key} value={p.key}>{p.label}</option>
          ))}
        </select>
      </label>

      {preset === 'custom' && (
        <div className="meta-custom">
          <input
            type="date"
            className="meta-select"
            value={start || ''}
            max={end || undefined}
            onChange={(e) => onCustom(e.target.value, end)}
            aria-label="Start date"
          />
          <span className="meta-custom__dash">→</span>
          <input
            type="date"
            className="meta-select"
            value={end || ''}
            min={start || undefined}
            onChange={(e) => onCustom(start, e.target.value)}
            aria-label="End date"
          />
        </div>
      )}

      <MultiSelect
        label="Campaign"
        options={options.campaigns}
        selected={selection.campaigns}
        onChange={(v) => onSelection({ campaigns: v })}
      />
      <MultiSelect
        label="Ad Set"
        options={options.adSets}
        selected={selection.adSets}
        onChange={(v) => onSelection({ adSets: v })}
      />
      <MultiSelect
        label="Ad"
        options={options.ads}
        selected={selection.ads}
        onChange={(v) => onSelection({ ads: v })}
      />

      <label className="meta-toggle" title="Compare each metric to the previous period of equal length">
        <input
          type="checkbox"
          checked={compare}
          onChange={(e) => onCompare(e.target.checked)}
        />
        <span>Compare to previous</span>
      </label>
    </div>
  );
}
