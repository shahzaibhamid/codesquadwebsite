import type { Metadata } from 'next';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/sections/SectionHeading';
import HeroVideo from '@/components/layout/HeroVideo';
import { audit } from '@/data/programs';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'AI Growth & Automation Audit — CodeSquad',
  description:
    'A structured 20-Day AI Growth & Automation Audit. We map your business processes, rank the highest-impact automation opportunities, and hand you a build-ready roadmap.',
};

export default function AIAuditPage() {
  return (
    <>
      {/* HERO — calm two-column layout, one clear CTA */}
      <section className="cs-section cs-program-hero cs-program-hero--audit">
        <HeroVideo
          className="cs-program-hero__video"
          src="/videos/programs-hero.mp4"
          poster="/videos/programs-hero-poster.jpg"
        />
        <div className="cs-program-hero__overlay" aria-hidden="true" />
        <div className="cs-container">
          <div className="cs-audit-hero">
            <div className="cs-audit-hero__col">
              <span className="cs-eyebrow">{audit.eyebrow} · 20-Day Program</span>
              <h1 className="cs-audit-hero__h1">{audit.hero.headline}</h1>
              <p className="cs-audit-hero__sub">{audit.hero.sub}</p>
              <div className="cs-hero__cta" style={{ justifyContent: 'flex-start' }}>
                <Button href={site.calendly} variant="primary" icon="arrow" external>
                  {audit.ctaLabel}
                </Button>
              </div>
              <a className="cs-audit-hero__secondary" href={audit.hero.secondaryHref}>
                {audit.hero.secondaryLink}
              </a>
              <p className="cs-audit-hero__micro">{audit.microcopy}</p>
            </div>

            <div className="cs-card cs-roadmap-card">
              <div className="cs-roadmap">
                {audit.process.map((p, i) => (
                  <div className="cs-roadmap__step" key={p.phase}>
                    <span className="cs-roadmap__dot">{String(i + 1).padStart(2, '0')}</span>
                    <div className="cs-roadmap__body">
                      <b>{p.days}</b>
                      <span>{p.phase}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST & VALUE BAR */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-trustbar">
            {audit.trustBar.map((t) => (
              <div className="cs-trustbar__item" key={t.label}>
                <Icon name={t.icon} />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE EVALUATE */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading
            eyebrow="What We Evaluate"
            title="A full picture of where your business stands"
            sub="Eight areas we assess to find your highest-value automation opportunities."
          />
          <div className="cs-grid cs-grid--4">
            {audit.evaluation.map((e) => (
              <article className="cs-card" key={e.title}>
                <div className="cs-icon">
                  <Icon name={e.icon} />
                </div>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 20-DAY PROCESS & DELIVERABLES */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <SectionHeading
            eyebrow="The 20-Day Process"
            title="A sequenced roadmap, phase by phase"
            sub="Every phase has a clear input, a clear output, and a deliverable you can act on."
          />
          <div className="cs-grid cs-grid--3">
            {audit.process.map((p) => (
              <article className="cs-card" key={p.phase}>
                <div className="cs-icon">
                  <Icon name={p.icon} />
                </div>
                <div className="cs-phase__days">{p.days}</div>
                <h3>{p.phase}</h3>
                <p>{p.whatHappens}</p>
                <div className="cs-phase__label">
                  Client deliverable
                  <span>{p.deliverable}</span>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Button href={site.calendly} variant="primary" icon="arrow" external>
              {audit.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* WHY START WITH AN AUDIT */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading eyebrow="Why an Audit" title="Why start with an audit?" />
          <p className="cs-audit-why__copy">{audit.why.copy}</p>
          <div className="cs-grid cs-grid--2">
            <article className="cs-card">
              <h3>Without a Structured Audit</h3>
              <ul className="cs-compare__list cs-compare__list--against">
                {audit.why.pairs.map((pair) => (
                  <li key={pair.without}>
                    <Icon name="x" />
                    <span>{pair.without}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="cs-card">
              <h3>With the CodeSquad Audit</h3>
              <ul className="cs-compare__list cs-compare__list--for">
                {audit.why.pairs.map((pair) => (
                  <li key={pair.with}>
                    <Icon name="check" />
                    <span>{pair.with}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* WHO THIS AUDIT IS FOR */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <SectionHeading eyebrow="Fit Check" title="Who this audit is for" />
          <div className="cs-grid cs-grid--2">
            <article className="cs-card">
              <h3>A Good Fit</h3>
              <ul className="cs-bullets">
                {audit.fit.good.map((f) => (
                  <li key={f}>
                    <Icon name="check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="cs-card">
              <h3>Not the Right Fit</h3>
              <ul className="cs-compare__list cs-compare__list--against">
                {audit.fit.not.map((f) => (
                  <li key={f}>
                    <Icon name="x" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS AFTER THE AUDIT */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading eyebrow="After the Audit" title="What happens after the audit?" sub={audit.after.copy} />
          <div className="cs-grid cs-grid--2">
            {audit.after.paths.map((p, i) => (
              <article className="cs-card" key={p.title}>
                <div className="cs-icon">
                  <Icon name={p.icon} />
                </div>
                <div className="cs-phase__days">Path {i + 1}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="cs-section">
        <div className="cs-container">
          <div className="cs-cta">
            <h2>{audit.finalCta.heading}</h2>
            <p>{audit.finalCta.text}</p>
            <div className="cs-hero__cta">
              <Button href={site.calendly} variant="primary" icon="arrow" external>
                {audit.ctaLabel}
              </Button>
            </div>
            <p className="cs-audit-hero__micro" style={{ marginTop: 18 }}>
              {audit.finalCta.microcopy}
            </p>
          </div>
        </div>
      </section>

      {/* SECONDARY COMMUNITY CTA */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-card cs-community">
            <p>{audit.community.copy}</p>
            <Button href={audit.community.href} variant="ghost" icon="arrow">
              {audit.community.ctaLabel}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
