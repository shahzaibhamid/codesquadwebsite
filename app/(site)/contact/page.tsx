import type { Metadata } from 'next';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import ContactForm from '@/components/sections/ContactForm';
import HeroVideo from '@/components/layout/HeroVideo';
import { site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Contact CodeSquad | AI Automation & Software Development',
  description:
    'Get in touch with CodeSquad to automate workflows, speed up lead response, or build custom AI-powered software. Book a free call or send us a message.',
};

export default function ContactPage() {
  return (
    <>
      <section className="cs-hero cs-program-hero">
        <HeroVideo
          className="cs-program-hero__video"
          src="/videos/contact-hero.mp4"
          poster="/videos/contact-hero-poster.jpg"
        />
        <div className="cs-program-hero__overlay" aria-hidden="true" />
        <div className="cs-container cs-hero__inner">
          <span className="cs-eyebrow">Contact</span>
          <h1>
            Let&apos;s build something <span className="cs-gradient-text">that scales</span>
          </h1>
          <p className="cs-hero__sub">
            Tell us what you want to automate or build. We&apos;ll reply quickly — or book a free 30-minute call
            and we&apos;ll map it out together.
          </p>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-contact-grid">
            <div className="cs-card">
              <h3 style={{ marginBottom: 18 }}>Send us a message</h3>
              <ContactForm />
            </div>

            <div className="cs-card">
              <div className="cs-icon">
                <Icon name="headset" />
              </div>
              <h3>Talk to us directly</h3>
              <p>
                Prefer email or a quick call? Reach the team directly, or grab a time on the calendar and
                we&apos;ll dig into your workflow.
              </p>
              <ul className="cs-contact-list">
                <li>
                  <a href={`mailto:${site.email}`}>
                    <Icon name="mail" /> {site.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${site.phoneTel}`}>
                    <Icon name="phone" /> {site.phone}
                  </a>
                </li>
              </ul>
              <div style={{ marginTop: 24 }}>
                <Button href={site.calendly} variant="primary" icon="phone" external>
                  Book a Free Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
