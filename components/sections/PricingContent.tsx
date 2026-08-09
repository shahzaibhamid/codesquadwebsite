import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import OfferModules from '@/components/sections/OfferModules';
import PricingComparisonTable from '@/components/sections/PricingComparisonTable';
import { site } from '@/data/site';
import { offerModules, pricingTiers, comparisonGroups, adCostsNote, guaranteeBand, onboardingSteps } from '@/data/pricing';

/** Every CTA on this page carries the tier as a query param so bookings can
 *  be attributed to the plan the visitor clicked from. */
function calendlyHref(plan: string) {
  return `${site.calendly}?plan=${plan}`;
}

export default function PricingContent() {
  return (
    <>
      <OfferModules modules={offerModules} />

      <div className="cs-pricing-grid">
        {pricingTiers.map((tier) => (
          <div className={`cs-pricing-card${tier.badge ? ' cs-pricing-card--popular' : ''}`} key={tier.key}>
            {tier.badge && <span className="cs-pricing-card__badge">{tier.badge}</span>}
            <h3>{tier.name}</h3>
            <div className="cs-pricing-card__price">{tier.price}</div>
            <p className="cs-pricing-card__desc">{tier.tagline}</p>
            {tier.includesNote && <p className="cs-pricing-card__includes">{tier.includesNote}</p>}
            <ul className="cs-bullets cs-pricing-card__features">
              {tier.bullets.map((bullet) => (
                <li key={bullet}><Icon name="check" />{bullet}</li>
              ))}
            </ul>
            {tier.scopeNote && <p className="cs-pricing-card__scope-note">{tier.scopeNote}</p>}
            <a className="cs-pricing-card__more" href="#comparison">See full comparison</a>
            <Button href={calendlyHref(tier.key)} variant={tier.badge ? 'primary' : 'ghost'} external className="cs-pricing-card__cta">
              Book a call
            </Button>
          </div>
        ))}
      </div>

      <p className="cs-pricing-note">{adCostsNote}</p>

      <div className="cs-guarantee-band">
        <h3>{guaranteeBand.title}</h3>
        <p>{guaranteeBand.sub}</p>
      </div>

      <PricingComparisonTable groups={comparisonGroups} />

      <div className="cs-onboarding">
        <h3 className="cs-onboarding__title">Your first 30 days</h3>
        <div className="cs-onboarding__steps">
          {onboardingSteps.map((step) => (
            <div className="cs-onboarding__step" key={step.days}>
              <span>{step.days}</span>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="cs-pricing-note">
        Need something that isn&apos;t covered above? <a href={site.calendly} target="_blank" rel="noopener noreferrer">Talk to us for a custom quote</a>.
      </p>
    </>
  );
}
