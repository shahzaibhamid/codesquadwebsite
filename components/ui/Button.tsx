import Link from 'next/link';
import type { ReactNode } from 'react';
import Icon from './Icon';
import type { IconName } from '@/types';
import { cn } from '@/lib/utils';

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  icon?: IconName;
  external?: boolean;
  className?: string;
}

/** Shared CTA button. Renders a Next <Link> for internal routes and a plain
 *  <a target="_blank"> for external links (Calendly, partner sites). */
export default function Button({
  href,
  children,
  variant = 'primary',
  icon,
  external = false,
  className,
}: ButtonProps) {
  const classes = cn('cs-btn', variant === 'primary' ? 'cs-btn--primary' : 'cs-btn--ghost', className);
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {children}
    </>
  );

  if (external || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) {
    return (
      <a className={classes} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {content}
    </Link>
  );
}
