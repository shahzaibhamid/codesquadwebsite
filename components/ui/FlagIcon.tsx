/** Small circular flag badges (USA / Pakistan) for the footer offices list.
 *  Inline SVG so they render identically on every OS — Windows doesn't draw
 *  flag emoji, so 🇺🇸/🇵🇰 would otherwise show as "US"/"PK" text. */

type FlagCode = 'us' | 'pk';

function UsFlag() {
  // 13 stripes over 24px → 1.846px each; red on even indices.
  const reds = [0, 2, 4, 6, 8, 10, 12];
  return (
    <>
      <rect width="24" height="24" fill="#fff" />
      {reds.map((i) => (
        <rect key={i} y={i * 1.846} width="24" height="1.846" fill="#b22234" />
      ))}
      {/* Blue canton over the top 7 stripes */}
      <rect width="10.5" height={7 * 1.846} fill="#3c3b6e" />
      {/* Simplified star field */}
      <g fill="#fff">
        {[2.2, 5.4, 8.6].map((y) =>
          [1.6, 4, 6.4, 8.8].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.7" />),
        )}
      </g>
    </>
  );
}

function PkFlag() {
  return (
    <>
      <rect width="24" height="24" fill="#01411c" />
      {/* White hoist band (~1/4) */}
      <rect width="6" height="24" fill="#fff" />
      {/* Crescent: white disc with a green disc offset over it */}
      <circle cx="14.6" cy="12" r="4.3" fill="#fff" />
      <circle cx="16.1" cy="11.1" r="3.6" fill="#01411c" />
      {/* Five-pointed star */}
      <path
        fill="#fff"
        d="M17.7 12.1l1.02.62-.28-1.16.9-.78-1.19-.1-.45-1.1-.45 1.1-1.19.1.9.78-.28 1.16z"
      />
    </>
  );
}

export default function FlagIcon({ code, size = 22 }: { code: FlagCode; size?: number }) {
  const label = code === 'us' ? 'USA flag' : 'Pakistan flag';
  const clipId = `flag-clip-${code}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role="img"
      aria-label={label}
      style={{ display: 'block', borderRadius: '50%', flex: '0 0 auto' }}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{code === 'us' ? <UsFlag /> : <PkFlag />}</g>
      {/* Subtle ring so light flags stay defined on dark footers */}
      <circle cx="12" cy="12" r="11.5" fill="none" stroke="rgba(0,0,0,.12)" strokeWidth="1" />
    </svg>
  );
}
