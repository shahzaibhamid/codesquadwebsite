import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/Icon';
import FlagIcon from '@/components/ui/FlagIcon';
import PlatformIcon from '@/components/ui/PlatformIcon';
import { site, nav, offices, platforms } from '@/data/site';
import { services } from '@/data/services';

/** Footer — ported from footer.php. */
export default function Footer() {
  return (
    <footer className="cs-footer">
      <div className="cs-container">
        <div className="cs-footer__grid">
          <div className="cs-footer__about">
            <Link className="cs-brand" href="/">
              <Image className="cs-logo" src={site.logoDark} alt="CodeSquad — AI Solutions" width={190} height={44} />
            </Link>
            <p>{site.description}</p>
            <a className="cs-btn cs-btn--primary" href={site.calendly} target="_blank" rel="noopener noreferrer">
              <Icon name="phone" /> Book a Free Call
            </a>
          </div>

          <div>
            <h4>Pages</h4>
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Services</h4>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.title}>
                  <Link href="/services">{s.title}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`tel:${site.phoneTel}`}>
                  <Icon name="phone" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>
                  <Icon name="mail" /> {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4>Offices</h4>
            <ul className="cs-footer__offices">
              {offices.map((o) => (
                <li key={o.country}>
                  <span className="cs-office__flag">
                    <FlagIcon code={o.code} />
                  </span>
                  <span>
                    <b>{o.country}</b>
                    {o.map ? (
                      <a
                        className="cs-office__addr"
                        href={o.map}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {o.lines.map((line) => (
                          <span key={line}>{line}</span>
                        ))}
                      </a>
                    ) : (
                      o.lines.map((line) => <span key={line}>{line}</span>)
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tools & platforms we work with */}
        <div className="cs-footer__tools">
          <p className="cs-footer__tools-label">Tools &amp; platforms we work with</p>
          <ul className="cs-footer__tools-list">
            {platforms.map((p) => (
              <li key={p.code}>
                <span className="cs-platform__badge">
                  <PlatformIcon code={p.code} />
                </span>
                <span className="cs-platform__name">{p.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="cs-footer__bottom">
          <span>&copy; {new Date().getFullYear()} CodeSquad. All rights reserved.</span>
          <span>Built for scale — AI automation &amp; custom software.</span>
        </div>
      </div>
    </footer>
  );
}
