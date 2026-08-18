import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { site } from '@/data/site';
import { offerPackages, guaranteeBand, onboardingSteps } from '@/data/pricing';

/** Every CTA on this page carries the package as a query param so bookings
 *  can be attributed to the package the visitor clicked from. */
function calendlyHref(plan: string) {
  return `${site.calendly}?plan=${plan}`;
}

export default function PricingContent() {
  return (
    <>
      <div className="cs-pricing-grid">
        {offerPackages.map((pkg) => (
          <div className="cs-pricing-card" key={pkg.key}>
            <span className="cs-pricing-card__icon"><Icon name={pkg.icon} /></span>
            <h3>{pkg.name}</h3>
            <p className="cs-pricing-card__desc">{pkg.tagline}</p>
            {pkg.groups.map((group) => (
              <div className="cs-pricing-card__group" key={group.label}>
                <h4 className="cs-pricing-card__group-label">{group.label}</h4>
                <ul className="cs-bullets cs-pricing-card__features">
                  {group.points.map((point) => (
                    <li key={point}><Icon name="check" />{point}</li>
                  ))}
                </ul>
              </div>
            ))}
            {pkg.footnote && <p className="cs-pricing-card__scope-note">{pkg.footnote}</p>}
            <Button href={calendlyHref(pkg.key)} variant="primary" external className="cs-pricing-card__cta">
              Book a call
            </Button>
          </div>
        ))}
      </div>

      <div className="cs-guarantee-band">
        <h3>{guaranteeBand.title}</h3>
        <p>{guaranteeBand.sub}</p>
      </div>

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
