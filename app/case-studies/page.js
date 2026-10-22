import { caseCats } from '../../lib/posts';
import { getPublishedCases } from '../../lib/store';
export const revalidate = 30;
export const metadata = {
  title: 'Case Studies | CodeSquad',
  description: 'Production systems built for healthcare, physical appointment-based businesses, and e-commerce teams — designed around their needs.'
};

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

export default async function Page() {
  const healthcareFilter = 'Healthcare & Wellness';
  const healthcareOrder = [
    'harmony-medspa-patient-growth-automation',
    'careinn-dental-clinic',
    'rtm-kinetics',
    'energybits',
    'gengyveusa',
  ];
  const caseStudies = (await getPublishedCases()).map((c) =>
    c.slug === 'gengyveusa' ? { ...c, filter: healthcareFilter } : c
  ).sort((a, b) => {
    const aIndex = healthcareOrder.indexOf(a.slug);
    const bIndex = healthcareOrder.indexOf(b.slug);
    if (aIndex === -1) return bIndex === -1 ? 0 : 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
  return (
    <main id="top">
      <section className="cs-section cs-case-section title-navy" style={{ paddingBottom: '44px' }}>
        <div className="cs-container">
          <div className="cs-heading cs-heading--center reveal">
            <h2>Case studies</h2>
            <p>Production systems built for healthcare, appointment-based and e-commerce teams.</p>
          </div>
          <div className="cs-cats" id="caseCats" role="group" aria-label="Filter case studies by category">
            {caseCats.map((c, i) => (
              <button
                type="button"
                key={c}
                className={'cs-cat' + (i === 0 ? ' cs-cat--active' : '')}
                data-cat={c}
                aria-pressed={i === 0}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="cs-section cs-case-section" style={{ paddingTop: '48px' }}>
        <div className="cs-container">
          <div className="cs-case-grid" id="caseGrid">
            {caseStudies.map((c) => (
              <a
                className="cs-scard reveal"
                href={`/case-studies/${c.slug}`}
                key={c.slug}
                data-cat={c.filter}
                style={caseCats[0] === 'All' || c.filter === caseCats[0] ? undefined : { display: 'none' }}
              >
                <div className="cs-scard__thumb"><img src={c.img} alt={c.name} loading="lazy" /></div>
                <div className="cs-scard__body">
                  <span className="cs-scard__tag">{c.cat}</span>
                  <h3>{c.tagline}</h3>
                  <p className="cs-scard__client">{c.name}</p>
                  <div className="cs-scard__visit"><span>Read case study</span><Arrow /></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="sec mg-banner" aria-label="MedGrow healthcare growth system">
        <div className="cs-container">
          <div className="svc-mid reveal">
            <div>
              <span className="mg-tag">A product of CodeSquad</span>
              <h2>MedGrow — Found. Chosen. Booked.</h2>
              <p>Our specialist patient growth system for med spas, clinics, dental practices and plastic surgeons.</p>
            </div>
            <div className="mg-actions">
              <a className="btn btn-blue" href="https://medgrow.codesquad.ai/case-studies" target="_blank" rel="noopener noreferrer">Explore MedGrow case studies ↗</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
