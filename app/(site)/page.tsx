import Image from 'next/image';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Link from 'next/link';
import SectionHeading from '@/components/sections/SectionHeading';
import HeroVideo from '@/components/layout/HeroVideo';
import { site } from '@/data/site';
import { hero, partners, founder, howWeWork } from '@/data/home';
import { getCaseStudies } from '@/lib/caseStudies';

export default async function HomePage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      {/* HERO */}
      <section className="cs-hero cs-home-hero">
        <HeroVideo />
        <div className="cs-home-hero__overlay" aria-hidden="true" />
        <div className="cs-container cs-hero__inner">
          <span className="cs-eyebrow">{hero.badge}</span>
          <h1>
            Build <span className="cs-gradient-text">Automation Engines</span>
          </h1>
          <p className="cs-hero__sub">{hero.sub}</p>

          <div className="cs-tags">
            {hero.tags.map((t) => (
              <span className="cs-tag" key={t}>
                {t}
              </span>
            ))}
          </div>

          <div className="cs-hero__cta">
            <Button href={site.calendly} variant="primary" icon="phone" external>
              {hero.ctaLabel}
            </Button>
          </div>
        </div>

        <div className="cs-home-proof cs-proof" aria-label="Trusted partners">
          <p className="cs-proof__label">Trusted by</p>
          <div className="cs-logo-rail">
            <div className="cs-logo-rail__track">
              {[...partners, ...partners].map((p, i) => (
                <a
                  className={`cs-partner${
                    p.name === 'Modern Law'
                      ? ' cs-partner--modern-law'
                      : p.name === 'Harmony Med Spa'
                        ? ' cs-partner--harmony'
                        : p.name === 'Debate Partners'
                          ? ' cs-partner--debate'
                        : ''
                  }`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={`${p.name}-${i}`}
                  aria-label={p.name}
                >
                  <span className="cs-partner__logo">
                    <Image src={p.logo} alt="" width={112} height={40} sizes="112px" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="cs-section cs-case-section" id="case-studies">
        <div className="cs-container">
          <SectionHeading
            eyebrow="Selected work"
            title="Case studies"
            sub="Production systems built for healthcare, legal, and e-commerce teams designed around their needs."
          />
          <div className="cs-case-grid">
            {caseStudies.map((c) => (
              <Link className="cs-case" href={`/case-studies/${c.slug}`} key={c.name}>
                <div className="cs-case__brand">{c.name}</div>
                <h3>{c.desc}</h3>
                <div className="cs-case__bottom">
                  <div className="cs-case__pills"><span>{c.category}</span><span>{c.services}</span></div>
                  <div className="cs-case__visit"><span>Read case study</span><Icon name="arrow" /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="cs-section cs-founder-section">
        <div className="cs-container">
          <div className="cs-founder">
            <div className="cs-founder__aside">
              <Image
                className="cs-founder__photo"
                src={founder.photo}
                alt={founder.name}
                width={416}
                height={416}
                sizes="(max-width: 768px) 288px, (max-width: 1024px) 352px, 416px"
                priority
              />
            </div>
            <div className="cs-founder__bio">
              <p className="cs-founder__eyebrow">{founder.eyebrow}</p>
              <h2 className="cs-founder__name">{founder.name}</h2>
              <p className="cs-founder__role">{founder.role}</p>
              <div className="cs-founder__copy">
              {founder.bio.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
              </div>
              <a className="cs-founder__linkedin" href="https://www.linkedin.com/in/shahzaibhamid/" target="_blank" rel="noopener noreferrer" aria-label="Shahzaib Hamid on LinkedIn">in</a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="cs-section cs-process-section">
        <div className="cs-container">
          <SectionHeading eyebrow="Our process" title="How we work" />
          <ol className="cs-process-list">
            {howWeWork.map((s) => (
              <li key={s.step}>
                <span className="cs-step__num">{s.step}</span>
                <div><h3>{s.title}</h3><p>{s.desc}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cs-ready">
        <div className="cs-container cs-ready__inner">
          <h2>Ready to build?</h2>
          <p>
            Most clients keep us on after launch as their ongoing AI partner. Monthly strategy sessions,
            evolving systems, and continued support as the business grows.
          </p>
          <Button href={site.calendly} variant="primary" icon="phone" external>
            Free audit call
          </Button>
        </div>
      </section>

    </>
  );
}
