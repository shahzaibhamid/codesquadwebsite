'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Icon from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { site, nav } from '@/data/site';

/** Navbar — logo, links, Book a Free Call, mobile menu.
 *  The bar is pinned at the top on every page. On video-hero pages it starts
 *  transparent (white logo) over the dark hero, then turns into a solid white
 *  bar with the colored logo once you scroll past the hero. */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === '/';
  const hasVideoHero =
    isHome ||
    pathname === '/blog' ||
    pathname === '/services' ||
    pathname === '/ai-basecamp' ||
    pathname === '/ai-audit' ||
    pathname === '/contact';

  useEffect(() => {
    if (!hasVideoHero) {
      setScrolled(false);
      return;
    }

    // Keep the transparent navbar for the full video hero. Switch to the
    // white navbar only when the hero's lower edge passes behind the bar.
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>('#cs-main > section:first-child');
      const navHeight = 72;
      setScrolled(hero ? hero.getBoundingClientRect().bottom <= navHeight : window.scrollY > 24);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [hasVideoHero]);

  // Transparent (white-logo) look at the top of each cinematic video hero.
  const transparentHero = hasVideoHero && !scrolled && !open;

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={cn(
        'cs-nav',
        hasVideoHero && 'cs-nav--fixed',
        transparentHero && 'cs-nav--home',
        open && 'cs-nav--open',
      )}
    >
      <div className="cs-nav__inner">
        <Link className="cs-brand" href="/" aria-label="CodeSquad home">
          {/* Keep one logo image; on the dark hero CSS changes only the dark
              "Squad" and "AI SOLUTIONS" lettering to white. */}
          <span className={cn('cs-logo-swap', transparentHero && 'cs-logo-swap--light-text')}>
          <Image
            className="cs-logo"
            src={site.logo}
            alt="CodeSquad — AI Solutions"
            width={190}
            height={44}
            priority
          />
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="cs-nav__links">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {/* CTA shown inside the dropdown on mobile (hidden on desktop). */}
            <li className="cs-nav__cta-mobile">
              <a
                className="cs-btn cs-btn--primary"
                href={site.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                <Icon name="phone" /> Book a Free Call
              </a>
            </li>
          </ul>
        </nav>

        <div className="cs-nav__actions">
          <a
            className="cs-btn cs-btn--primary"
            href={site.calendly}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="phone" /> Book a Free Call
          </a>

          <button
            className="cs-nav__toggle"
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="cs-nav__hamburger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
