import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Faq from '@/components/sections/Faq';
import PricingContent from '@/components/sections/PricingContent';
import { site } from '@/data/site';
import { pricingHero, pricingFaq } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Offers',
  description: pricingHero.sub,
};

export default function PricingPage() {
  return (
    <>
      <section className="cs-section cs-pricing-hero">
        <div className="cs-container cs-pricing-hero__inner">
          <span className="cs-eyebrow">{pricingHero.eyebrow}</span>
          <h1>{pricingHero.title}</h1>
          <p className="cs-hero__sub">{pricingHero.sub}</p>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <PricingContent />
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <h2 className="cs-pricing-faq__title">Offers FAQ</h2>
          <Faq items={pricingFaq} />
        </div>
      </section>

      <section className="cs-ready">
        <div className="cs-container cs-ready__inner">
          <h2>Not sure which plan fits?</h2>
          <p>Book a free call and we&apos;ll recommend the right tier for where your business is today.</p>
          <Button href={site.calendly} variant="primary" icon="phone" external>Book a Free Call</Button>
        </div>
      </section>
    </>
  );
}
