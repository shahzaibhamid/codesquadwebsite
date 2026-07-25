export interface BeforeAfterRow {
  metric: string;
  before: string;
  after: string;
}

export default function BeforeAfterTable({ rows }: { rows: BeforeAfterRow[] }) {
  if (!rows.length) return null;
  return (
    <div className="cs-compare-table" role="table">
      <div className="cs-compare-table__row cs-compare-table__row--head" role="row">
        <span role="columnheader" />
        <span role="columnheader">Before</span>
        <span role="columnheader">After</span>
      </div>
      {rows.map((row) => (
        <div className="cs-compare-table__row" role="row" key={row.metric}>
          <span className="cs-compare-table__metric" role="rowheader">{row.metric}</span>
          <span className="cs-compare-table__before" role="cell">{row.before}</span>
          <span className="cs-compare-table__after" role="cell">{row.after}</span>
        </div>
      ))}
    </div>
  );
}
