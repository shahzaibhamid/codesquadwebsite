// Keep the optimizer limited to the site's image providers, including dashboard uploads.
export const remoteImagePatterns = [
  { protocol: 'https', hostname: 'qqxqwcnkyafwflxipmyn.supabase.co', pathname: '/storage/v1/object/public/**' },
  { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
  { protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' },
];

export function canOptimizeImage(src) {
  if (typeof src !== 'string' || !src) return false;
  if (src.startsWith('/') && !src.startsWith('//')) return !/\.svg(?:\?|$)/i.test(src);
  try {
    const url = new URL(src);
    return !/\.svg(?:\?|$)/i.test(src) && remoteImagePatterns.some((p) =>
      url.protocol === `${p.protocol}:` && url.hostname === p.hostname && !url.port &&
      url.pathname.startsWith(p.pathname.replace(/\*\*$/, '')));
  } catch { return false; }
}
