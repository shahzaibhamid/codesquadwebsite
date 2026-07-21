import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="cs-hero">
      <div className="cs-container cs-hero__inner">
        <span className="cs-eyebrow">404</span>
        <h1>
          This page took an <span className="cs-gradient-text">unplanned detour</span>
        </h1>
        <p className="cs-hero__sub">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="cs-hero__cta">
          <Button href="/" variant="primary" icon="arrow">
            Back to home
          </Button>
          <Button href="/services" variant="ghost">
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}
