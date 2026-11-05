'use client';
import { signedPercent } from '../../lib/metaFormat';

// One KPI tile: big value + % change vs previous period, coloured by whether the
// change is good. `direction` decides the sign→colour mapping:
//   up-good   → higher is better (leads, CTR, reach…)
//   down-good → lower is better  (CPC, CPM, CPL)
//   neutral   → always grey      (spend)
function toneFor(change, direction) {
  if (direction === 'neutral' || change === null || change === undefined || change === 0) {
    return 'neutral';
  }
  const improved = direction === 'up-good' ? change > 0 : change < 0;
  return improved ? 'good' : 'bad';
}

export default function KpiCard({ label, value, change, direction = 'up-good', sub }) {
  const tone = toneFor(change, direction);
  const arrow = change === null || change === undefined || change === 0 ? '' : change > 0 ? '↑' : '↓';
  const showChange = change !== null && change !== undefined;

  return (
    <div className="meta-kpi">
      <div className="meta-kpi__label">{label}</div>
      <div className="meta-kpi__value">{value}</div>
      <div className="meta-kpi__foot">
        {showChange ? (
          <span className={`meta-kpi__chg meta-kpi__chg--${tone}`}>
            {arrow} {signedPercent(change)}
          </span>
        ) : (
          <span className="meta-kpi__chg meta-kpi__chg--neutral">—</span>
        )}
        {sub ? <span className="meta-kpi__sub">{sub}</span> : null}
      </div>
    </div>
  );
}
