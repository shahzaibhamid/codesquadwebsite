import type { Config } from 'tailwindcss';

/**
 * Tailwind is available for future work, but PREFLIGHT IS DISABLED on purpose:
 * the exact visual design lives in `app/globals.css` (ported 1:1 from the
 * WordPress theme). Disabling preflight prevents Tailwind's CSS reset from
 * fighting that design system, so the clone stays pixel-faithful. The brand
 * tokens below mirror the CSS variables so you can also use utilities like
 * `text-cs-cyan` when adding new UI.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        'cs-bg': '#05060c',
        'cs-panel': 'rgba(255,255,255,0.04)',
        'cs-text': '#e7ebf5',
        'cs-heading': '#ffffff',
        'cs-muted': '#94a1bd',
        'cs-cyan': '#22d3ee',
        'cs-blue': '#3b82f6',
        'cs-purple': '#a855f7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-grotesk)', 'var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
