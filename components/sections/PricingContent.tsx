'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { site } from '@/data/site';
import { pricingIndustries, customOffer } from '@/data/pricing';
import type { PricingIndustry } from '@/data/pricing';

export default function PricingContent() {
  const [industryKey, setIndustryKey] = useState<PricingIndustry['key']>('appointments');
  const industry = pricingIndustries.find((i) => i.key === industryKey) || pricingIndustries[0];

  return (
    <>
      <div className="cs-custom-offer" id="custom">
        <span className="cs-custom-offer__badge">{customOffer.badge}</span>
        <div className="cs-custom-offer__body">
          <h3>{customOffer.name}</h3>
          <p className="cs-custom-offer__price">
            {customOffer.price}
            <span>{customOffer.priceNote}</span>
          </p>
          <p className="cs-custom-offer__desc">{customOffer.description}</p>
        </div>
        <Button href={site.calendly} variant="primary" external className="cs-custom-offer__cta">
          {customOffer.cta}
        </Button>
      </div>

      <p className="cs-custom-offer__divider">Or choose a monthly growth plan below</p>

      <div className="cs-cats" role="list" aria-label="Choose your industry">
        {pricingIndustries.map((i) => (
          <button
            type="button"
            key={i.key}
            className={`cs-cat${industryKey === i.key ? ' cs-cat--active' : ''}`}
            role="listitem"
            onClick={() => setIndustryKey(i.key)}
          >
            {i.label}
          </button>
        ))}
      </div>

      <div className="cs-pricing-grid">
        {industry.tiers.map((tier) => (
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

      <div className="cs-compare-table cs-pricing-table" role="table">
        <div className="cs-compare-table__row cs-compare-table__row--head cs-pricing-table__row" role="row">
          <span role="columnheader" />
          <span role="columnheader">Dashboard</span>
          <span role="columnheader">Growth</span>
          <span role="columnheader">Scale</span>
        </div>
        {industry.comparison.map((row) => (
          <div className="cs-compare-table__row cs-pricing-table__row" role="row" key={row.feature}>
            <span className="cs-compare-table__metric" role="rowheader">{row.feature}</span>
            <span role="cell" data-label="Dashboard">{row.dashboard ? <Icon name="check" /> : '—'}</span>
            <span role="cell" data-label="Growth">{row.growth ? <Icon name="check" /> : '—'}</span>
            <span role="cell" data-label="Scale">{row.scale ? <Icon name="check" /> : '—'}</span>
          </div>
        ))}
      </div>

      <p className="cs-pricing-note">
        Need something that isn&apos;t covered above? <a href={site.calendly} target="_blank" rel="noopener noreferrer">Talk to us for a custom quote</a>.
      </p>
    </>
  );
}
