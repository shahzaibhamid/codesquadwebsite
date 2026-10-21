import { notFound } from 'next/navigation';
import { getCases, getCase } from '../../../lib/store';

export const revalidate = 30;
export const dynamicParams = true;

export async function generateStaticParams() {
  const cases = await getCases();
  return cases.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const p = await getCase(params.slug);
  if (!p) return { title: 'Case Study | CodeSquad' };
  return { title: `${p.name} — Case Study | CodeSquad`, description: p.tagline };
}

const CallArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" /></svg>
);

export default async function Page({ params }) {
  const item = await getCase(params.slug);
  const html = item?.body || '';
  if (!html) notFound();
  // Designed case studies store their full layout (<article class="cs-study">…). Bodies
  // copied from the old case_studies table are plain text sections, so wrap those in the
  // same hero + CTA layout instead of dropping them under the fixed header unstyled.
  const isDesigned = /class="cs-study"/.test(html);
  return (
    <main id="top" className="cs-body cs-reader cs-reader--study">
      {isDesigned ? <div dangerouslySetInnerHTML={{ __html: html }} /> : (
        <div>
          <article className="cs-study">
            <header className="cs-study-hero cs-study-hero--cover cs-study-hero--dark">
              {item.img ? <img className="cs-study-hero__image" src={item.img} alt={`${item.name} case study cover`} /> : null}
              <div className="cs-study-hero__contrast" />
              <div className="cs-container">
                <a className="cs-study-back" href="/case-studies">← All case studies</a>
                <p className="cs-study-label">{item.cat ? `${item.cat} · Case study` : 'Case study'}</p>
                <h1>{item.name}</h1>
                {item.tagline ? <p className="cs-study-kicker">{item.tagline}</p> : null}
              </div>
            </header>
            <section className="cs-study-section">
              <div className="cs-container">
                <div className="cs-article" dangerouslySetInnerHTML={{ __html: html }} />
              </div>
            </section>
            <section className="cs-study-cta">
              <div className="cs-container">
                <p>Have an idea worth building?</p>
                <h2>Let’s turn your workflow into a system that scales.</h2>
                <div className="cs-study-cta__actions">
                  <a className="cs-btn cs-btn--primary" href="https://calendly.com/code_squad/30min" target="_blank" rel="noopener">Book a call <CallArrow /></a>
                  <a className="cs-btn cs-btn--ghost" href="/inquiry">Send an inquiry</a>
                </div>
              </div>
            </section>
          </article>
        </div>
      )}
    </main>
  );
}
