import type { IconName } from '@/types';

/** Inline SVG icon set — ported 1:1 from the WordPress cs_icon() helper.
 *  Uses currentColor so it inherits text color. */
const PATHS: Record<IconName, string> = {
  bolt: 'M13 2 3 14h7l-1 8 10-12h-7l1-8z',
  robot: 'M4 8h16v12H4zM12 8V4M8 2h8M9 14h.01M15 14h.01',
  reply: 'M3 12h13a4 4 0 0 1 4 4v2M3 12l5-5M3 12l5 5',
  chart: 'M3 3v18h18M8 15v3M13 10v8M18 6v12',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zm10 17-4.3-4.3',
  code: 'm8 6-6 6 6 6M16 6l6 6-6 6',
  target: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2z',
  headset:
    'M4 14v-2a8 8 0 0 1 16 0v2M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM18 16v1a4 4 0 0 1-4 4h-2',
  layers: 'm12 2 9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5',
  workflow: 'M3 3h7v7H3zM14 14h7v7h-7zM10 6h6a2 2 0 0 1 2 2v6',
  shield: 'M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4zm-3 10 2 2 4-4',
  rocket:
    'M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 12l6-6a5 5 0 0 1 4-1 5 5 0 0 1-1 4l-6 6M9 12l3 3M9 12H6l3-3M12 15v3l3-3',
  check: 'M20 6 9 17l-5-5',
  x: 'M18 6 6 18M6 6l12 12',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  'arrow-ur': 'M7 17 17 7M8 7h9v9',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z',
  phone:
    'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 3a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c1 .3 2 .6 3 .7a2 2 0 0 1 1.7 2z',
  mail: 'M3 5h18v14H3zM3 7l9 6 9-6',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',
  'eye-off':
    'M3 3l18 18M10.6 10.6a3 3 0 0 0 4.24 4.24M9.4 5.3A10.4 10.4 0 0 1 12 5c6.5 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.2M6.5 6.6C4 8.3 2 12 2 12a17.4 17.4 0 0 0 5 5.6c1.4 1 3 1.6 5 1.6a10 10 0 0 0 2.6-.34',
};

interface IconProps {
  name: IconName;
  className?: string;
}

export default function Icon({ name, className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={PATHS[name] ?? PATHS.bolt} />
    </svg>
  );
}
