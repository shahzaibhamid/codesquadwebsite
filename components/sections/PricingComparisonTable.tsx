import type { ComparisonGroup } from '@/data/pricing';

export default function PricingComparisonTable({ groups }: { groups: ComparisonGroup[] }) {
  if (!groups.length) return null;
  return (
    <div className="cs-compare-table cs-pricing-table" role="table" id="comparison">
      <div className="cs-compare-table__row cs-compare-table__row--head cs-pricing-table__row" role="row">
        <span role="columnheader" />
        <span role="columnheader">Essential</span>
        <span role="columnheader">Growth</span>
        <span role="columnheader">Scale</span>
      </div>
      {groups.map((group) => (
        <div className="cs-pricing-table__group" key={group.title}>
          <div className="cs-pricing-table__group-title" role="row">{group.title}</div>
          {group.rows.map((row) => (
            <div className="cs-compare-table__row cs-pricing-table__row" role="row" key={row.feature}>
              <span className="cs-compare-table__metric" role="rowheader">{row.feature}</span>
              <span role="cell" data-label="Essential">{row.essential}</span>
              <span role="cell" data-label="Growth">{row.growth}</span>
              <span role="cell" data-label="Scale">{row.scale}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
