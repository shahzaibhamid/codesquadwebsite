import type { Metadata } from 'next';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import Faq from '@/components/sections/Faq';
import { site } from '@/data/site';
import { pricingHero, pricingTiers, pricingComparison, pricingFaq } from '@/data/pricing';

export const metadata: Metadata = {
  title: 'Pricing',
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
          <p className="cs-pricing-note">{pricingHero.note}</p>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-pricing-grid">
            {pricingTiers.map((tier) => (
              <div className={`cs-pricing-card${tier.badge ? ' cs-pricing-card--popular' : ''}`} key={tier.name}>
                {tier.badge && <span className="cs-pricing-card__badge">{tier.badge}</span>}
                <h3>{tier.name}</h3>
                <div className="cs-pricing-card__price">{tier.price}</div>
                <p className="cs-pricing-card__desc">{tier.description}</p>
                <ul className="cs-bullets cs-pricing-card__features">
                  {tier.features.map((feature) => (
                    <li key={feature}><Icon name="check" />{feature}</li>
                  ))}
                </ul>
                <Button href={site.calendly} variant={tier.badge ? 'primary' : 'ghost'} external className="cs-pricing-card__cta">
                  Book a call
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <div className="cs-compare-table cs-pricing-table" role="table">
            <div className="cs-compare-table__row cs-compare-table__row--head cs-pricing-table__row" role="row">
              <span role="columnheader" />
              <span role="columnheader">Dashboard</span>
              <span role="columnheader">Growth</span>
              <span role="columnheader">Scale</span>
            </div>
            {pricingComparison.map((row) => (
              <div className="cs-compare-table__row cs-pricing-table__row" role="row" key={row.feature}>
                <span className="cs-compare-table__metric" role="rowheader">{row.feature}</span>
                <span role="cell" data-label="Dashboard">{row.dashboard ? <Icon name="check" /> : '—'}</span>
                <span role="cell" data-label="Growth">{row.growth ? <Icon name="check" /> : '—'}</span>
                <span role="cell" data-label="Scale">{row.scale ? <Icon name="check" /> : '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cs-section cs-section--tight">
        <div className="cs-container">
          <h2 className="cs-pricing-faq__title">Pricing FAQ</h2>
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
