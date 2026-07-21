import type { Metadata } from 'next';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/sections/SectionHeading';
import GrowthClubForm from '@/components/sections/GrowthClubForm';
import HeroVideo from '@/components/layout/HeroVideo';
import { growthClub } from '@/data/programs';

export const metadata: Metadata = {
  title: 'Base Camp — Free community for SME owners | CodeSquad',
  description:
    'Base Camp is a free, application-only community for SME owners who want practical AI, automation, lead generation, and business systems — not more AI content.',
};

export default function GrowthClubPage() {
  return (
    <>
      {/* 1. HERO */}
      <section className="cs-hero cs-program-hero">
        <HeroVideo
          className="cs-program-hero__video"
          src="/videos/programs-hero.mp4"
          poster="/videos/programs-hero-poster.jpg"
        />
        <div className="cs-program-hero__overlay" aria-hidden="true" />
        <div className="cs-container cs-hero__inner">
          <span className="cs-eyebrow">{growthClub.eyebrow}</span>
          <h1>
            Stop Guessing. Start Building Systems That{' '}
            <span className="cs-gradient-text">Actually Grow Your Business.</span>
          </h1>
          <p className="cs-hero__sub">{growthClub.hero.sub}</p>
          <div className="cs-hero__cta">
            <a className="cs-btn cs-btn--primary" href="#apply">
              <Icon name="arrow" /> {growthClub.ctaLabel}
            </a>
            <Button href={growthClub.hero.secondaryHref} variant="ghost">
              {growthClub.hero.secondaryLabel}
            </Button>
          </div>
        </div>
      </section>

      {/* 2. WHY BASE CAMP EXISTS */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <SectionHeading eyebrow="Why It Exists" title={growthClub.why.title} />
          <p className="cs-audit-why__copy">{growthClub.why.copy}</p>
        </div>
      </section>

      {/* 3. WHAT YOU'LL GET */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading
            eyebrow="What You'll Get"
            title="Systems and support, not more content"
            sub="Everything in Base Camp is practical and built to use inside a real business."
          />
          <div className="cs-grid cs-grid--3">
            {growthClub.whatYouGet.map((f) => (
              <article className="cs-card" key={f.title}>
                <div className="cs-icon">
                  <Icon name={f.icon} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHO THIS COMMUNITY IS FOR */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <SectionHeading eyebrow="Who It's For" title="Who this community is for" sub={growthClub.who.forText} />
          <div className="cs-grid cs-grid--2">
            <article className="cs-card">
              <h3>A Good Fit</h3>
              <ul className="cs-bullets">
                {growthClub.who.good.map((g) => (
                  <li key={g}>
                    <Icon name="check" />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article className="cs-card">
              <h3>Not the Right Fit</h3>
              <ul className="cs-compare__list cs-compare__list--against">
                {growthClub.who.not.map((n) => (
                  <li key={n}>
                    <Icon name="x" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 5. INSIDE BASE CAMP */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading
            eyebrow="Inside Base Camp"
            title="What's inside the community"
            sub="Organized so you can find what you need and start applying it fast."
          />
          <div className="cs-grid cs-grid--3">
            {growthClub.inside.map((f) => (
              <article className="cs-card" key={f.title}>
                <div className="cs-icon">
                  <Icon name={f.icon} />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WEEKLY BUSINESS GROWTH SESSIONS */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-grid cs-grid--2">
            <div>
              <SectionHeading eyebrow="Every Week" title={growthClub.sessions.title} center={false} />
              <p style={{ color: 'var(--cs-muted)', fontSize: 17 }}>{growthClub.sessions.copy}</p>
            </div>
            <article className="cs-card">
              <ul className="cs-bullets">
                {growthClub.sessions.points.map((p) => (
                  <li key={p}>
                    <Icon name="check" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* 7. FREE COMMUNITY */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <article className="cs-card cs-community">
            <div className="cs-icon" style={{ margin: '0 auto 18px' }}>
              <Icon name="check" />
            </div>
            <h3>{growthClub.free.title}</h3>
            <p>{growthClub.free.copy}</p>
          </article>
        </div>
      </section>

      {/* 8. HOW TO JOIN */}
      <section className="cs-section">
        <div className="cs-container">
          <SectionHeading eyebrow="How to Join" title="Three simple steps" />
          <div className="cs-grid cs-grid--3">
            {growthClub.how.map((s) => (
              <article className="cs-card" key={s.step}>
                <div className="cs-icon">
                  <Icon name={s.icon} />
                </div>
                <div className="cs-phase__days">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. APPLICATION FORM */}
      <section className="cs-section cs-section--tight" id="apply">
        <div className="cs-container">
          <div className="cs-contact-grid">
            <div className="cs-card">
              <h3 style={{ marginBottom: 18 }}>{growthClub.form.title}</h3>
              <GrowthClubForm
                submitLabel={growthClub.ctaLabel}
                note={growthClub.form.note}
                roleOptions={growthClub.form.roleOptions}
              />
            </div>
            <div className="cs-card">
              <div className="cs-icon">
                <Icon name="shield" />
              </div>
              <h3>Application only — on purpose</h3>
              <p>
                Entry is application-based purely to keep the quality high. There&apos;s no cost and no catch —
                just a quick manual review so every member is a serious SME owner.
              </p>
              <ul className="cs-bullets" style={{ marginTop: 8 }}>
                <li>
                  <Icon name="check" />
                  <span>Completely free to join</span>
                </li>
                <li>
                  <Icon name="check" />
                  <span>Reviewed manually within 24–48 hours</span>
                </li>
                <li>
                  <Icon name="check" />
                  <span>Built exclusively for SME owners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 10. READY TO GO FURTHER? (AUDIT CTA) */}
      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <article className="cs-card cs-community">
            <div className="cs-icon" style={{ margin: '0 auto 18px' }}>
              <Icon name="target" />
            </div>
            <h3>{growthClub.audit.title}</h3>
            <p>{growthClub.audit.copy}</p>
            <Button href={growthClub.audit.href} variant="ghost" icon="arrow">
              {growthClub.audit.ctaLabel}
            </Button>
          </article>
        </div>
      </section>

      {/* 11. FINAL CTA */}
      <section className="cs-section">
        <div className="cs-container">
          <div className="cs-cta">
            <h2>{growthClub.finalCta.heading}</h2>
            <div className="cs-hero__cta">
              <a className="cs-btn cs-btn--primary" href="#apply">
                <Icon name="arrow" /> {growthClub.finalCta.ctaLabel}
              </a>
            </div>
            <p className="cs-audit-hero__micro" style={{ marginTop: 18 }}>
              {growthClub.finalCta.microcopy}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
