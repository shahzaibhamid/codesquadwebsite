import Button from '@/components/ui/Button';
import { site } from '@/data/site';

interface CTAProps {
  heading?: string;
  text?: string;
}

/** Final CTA banner — ported from cs_render_cta(). */
export default function CTA({
  heading = 'Ready to automate what slows you down?',
  text = 'Book a free 30-minute call. We will map one workflow you can automate and show you exactly what it takes.',
}: CTAProps) {
  return (
    <section className="cs-section">
      <div className="cs-container">
        <div className="cs-cta">
          <h2>{heading}</h2>
          <p>{text}</p>
          <div className="cs-hero__cta">
            <Button href={site.calendly} variant="primary" icon="phone" external>
              Book a Free Call
            </Button>
            <Button href="/services" variant="ghost">
              Explore Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
