import type { PlatformCode } from '@/data/site';

/** Simplified, monochrome platform glyphs for the footer "tools we work with"
 *  row. Drawn with currentColor so they follow the muted footer text color.
 *  These are stylized marks, not official brand assets. */

interface Props {
  code: PlatformCode;
  size?: number;
}

export default function PlatformIcon({ code, size = 22 }: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (code) {
    case 'openai': // hexagonal knot (simplified)
      return (
        <svg {...common}>
          <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
          <path d="M12 8v8M8.5 6.2l7 3.6M15.5 6.2l-7 3.6" strokeWidth={1.1} />
        </svg>
      );
    case 'make': // radiating "M" burst
      return (
        <svg {...common}>
          <path d="M4 18L8 6l4 8 4-8 4 12" />
        </svg>
      );
    case 'hubspot': // hub-and-spoke sprocket
      return (
        <svg {...common}>
          <circle cx="10.5" cy="14" r="4" />
          <path d="M14 11.5l3-2.5" />
          <circle cx="18" cy="8" r="1.9" />
          <path d="M17 6V3" />
        </svg>
      );
    case 'google': // "G"
      return (
        <svg {...common}>
          <path d="M20 12a8 8 0 1 1-2.3-5.6" />
          <path d="M20 12h-6.5" />
        </svg>
      );
    case 'meta': // infinity ribbon
      return (
        <svg {...common}>
          <path d="M4 12c0-3.3 2-5 4-5s3.5 2.2 4 5c.5 2.8 2 5 4 5s4-1.7 4-5-2-5-4-5-3.5 2.2-4 5c-.5 2.8-2 5-4 5s-4-1.7-4-5z" />
        </svg>
      );
    case 'salesforce': // cloud
      return (
        <svg {...common}>
          <path d="M7.5 17a3.5 3.5 0 0 1-.4-7 4.5 4.5 0 0 1 8.5-1.2A3.3 3.3 0 0 1 17 17H7.5z" />
        </svg>
      );
    case 'apollo': // orbiting triangle
      return (
        <svg {...common}>
          <path d="M12 5l7 13H5l7-13z" />
          <circle cx="12" cy="14" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'zapier': // six-spoke burst
      return (
        <svg {...common}>
          <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
        </svg>
      );
    default:
      return null;
  }
}
