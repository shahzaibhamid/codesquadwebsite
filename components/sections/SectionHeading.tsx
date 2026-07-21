interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
}

/** Section heading — ported from cs_section_heading(). */
export default function SectionHeading({ eyebrow, title, sub, center = true }: SectionHeadingProps) {
  return (
    <div className={center ? 'cs-heading cs-heading--center' : 'cs-heading'}>
      {eyebrow && <span className="cs-eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}
