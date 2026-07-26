export interface CaseStudyMockupProps {
  eyebrow: string;
  title: string;
  stats: Array<{ value: string; label: string }>;
  rows: string[];
  accent?: string;
  /** Smaller layout for card thumbnails — drops the checklist rows. */
  compact?: boolean;
}

/** Abstract, illustrative "what the system does" mockup — original artwork
 *  describing the delivered system, not a screenshot of the client's
 *  product or site (no third-party imagery/branding involved). */
export default function CaseStudyMockup({ eyebrow, title, stats, rows, accent = '#4a90d9', compact = false }: CaseStudyMockupProps) {
  return (
    <div className={`cs-mockup${compact ? ' cs-mockup--compact' : ''}`} style={{ ['--cs-mockup-accent' as string]: accent }}>
      <div className="cs-mockup__bar">
        <span /><span /><span />
      </div>
      <div className="cs-mockup__body">
        <p className="cs-mockup__eyebrow">{eyebrow}</p>
        <h3 className="cs-mockup__title">{title}</h3>
        {!compact && (
          <div className="cs-mockup__stats">
            {stats.map((stat) => (
              <div className="cs-mockup__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
        {!compact && (
          <ul className="cs-mockup__rows">
            {rows.map((row) => (
              <li key={row}>
                <span className="cs-mockup__check" aria-hidden="true" />
                {row}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
