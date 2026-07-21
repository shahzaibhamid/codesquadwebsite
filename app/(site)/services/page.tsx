import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import HeroVideo from '@/components/layout/HeroVideo';
import { site } from '@/data/site';
import { services } from '@/data/services';

export const metadata: Metadata = {
  title: 'AI Automation Services',
  description: 'AI-powered growth, marketing, support, and operations services from CodeSquad.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="cs-hero cs-services-hero">
        <HeroVideo className="cs-services-hero__video" src="/videos/services.mp4" poster="" />
        <div className="cs-services-hero__overlay" aria-hidden="true" />
        <div className="cs-container cs-hero__inner">
          <div className="cs-services-hero__copy">
            <span className="cs-eyebrow">Built for ambitious teams</span>
            <h1>
              Turn busywork into <span>business growth.</span>
            </h1>
            <p className="cs-services-hero__sub">
              Smarter systems for attracting customers, scaling content, and running your business.
            </p>
            <div className="cs-services-hero__highlights" aria-label="Service outcomes">
              <span>Win more leads</span>
              <span>Move faster</span>
              <span>Scale smarter</span>
            </div>
            <div className="cs-hero__cta">
              <Button href={site.calendly} variant="primary" icon="phone" external>
                Build Your AI Engine
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-grid cs-grid--2">
            {services.map((service) => (
              <article className="cs-card" key={service.title}>
                <div className="cs-icon">
                  <Icon name={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
