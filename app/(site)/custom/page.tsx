import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { site } from '@/data/site';
import { customOffer } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Custom AI Implementation',
  description: customOffer.description,
};

const included = [
  'Bespoke AI agents and custom integrations',
  'Industry-specific systems for any vertical',
  'Project-based pricing, scoped to your needs',
];

export default function CustomPage() {
  return (
    <>
      <section className="cs-section cs-pricing-hero">
        <div className="cs-container cs-pricing-hero__inner">
          <span className="cs-eyebrow">Custom</span>
          <h1>{customOffer.name}</h1>
          <p className="cs-hero__sub">{customOffer.description}</p>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-custom-offer">
            <span className="cs-custom-offer__badge">{customOffer.badge}</span>
            <div className="cs-custom-offer__body">
              <h3>{customOffer.name}</h3>
              <p className="cs-custom-offer__price">
                {customOffer.price}
                <span>{customOffer.priceNote}</span>
              </p>
              <p className="cs-custom-offer__desc">{customOffer.description}</p>
            </div>
            <Button href={`${site.calendly}?plan=custom`} variant="primary" external className="cs-custom-offer__cta">
              {customOffer.cta}
            </Button>
          </div>

          <ul className="cs-bullets cs-custom-included">
            {included.map((point) => (
              <li key={point}><Icon name="check" />{point}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cs-ready">
        <div className="cs-container cs-ready__inner">
          <h2>Looking for a monthly plan instead?</h2>
          <p>See the Attract / Respond / Recover offers priced as ongoing plans.</p>
          <Button href="/offers" variant="primary">See offers</Button>
        </div>
      </section>
    </>
  );
}
