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
  const caseStudies = await getPublishedCases();
  return (
    <main id="top">
      <section className="cs-section cs-case-section title-navy" style={{ paddingBottom: '44px' }}>
        <div className="cs-container">
          <div className="cs-heading cs-heading--center reveal">
            <span className="cs-eyebrow">Selected work</span>
            <h2>Case studies</h2>
            <p>Production systems built for healthcare, appointment-based and e-commerce teams.</p>
          </div>
          <div className="cs-cats" id="caseCats">
            {caseCats.map((c, i) => (
              <button key={c} className={'cs-cat' + (i === 0 ? ' cs-cat--active' : '')} data-cat={c}>{c}</button>
            ))}
          </div>
        </div>
      </section>
      <section className="cs-section cs-case-section" style={{ paddingTop: '48px' }}>
        <div className="cs-container">
          <div className="cs-case-grid" id="caseGrid">
            {caseStudies.map((c) => (
              <a className="cs-scard reveal" href={`/case-studies/${c.slug}`} key={c.slug} data-cat={c.filter}>
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
    </main>
  );
}
