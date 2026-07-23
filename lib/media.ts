import { youtubeId } from '@/lib/utils';

/**
 * Case-study media classification. Pure and synchronous (besides the Vimeo
 * oEmbed lookup) — never throws, so a bad/unknown URL always degrades to a
 * safe link card instead of crashing the page.
 */
export type MediaKind =
  | { kind: 'youtube'; id: string; url: string }
  | { kind: 'vimeo'; id: string; url: string }
  | { kind: 'video'; url: string }
  | { kind: 'image'; url: string }
  | { kind: 'link'; url: string };

export function getVimeoId(url: string): string {
  const match = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/i);
  return match ? match[1] : '';
}

export function getYouTubeEmbedUrl(id: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
}

export function getVimeoEmbedUrl(id: string): string {
  return `https://player.vimeo.com/video/${encodeURIComponent(id)}?autoplay=1`;
}

export function classifyMedia(url: string): MediaKind {
  const youtube = youtubeId(url);
  if (youtube) return { kind: 'youtube', id: youtube, url };
  const vimeo = getVimeoId(url);
  if (vimeo) return { kind: 'vimeo', id: vimeo, url };
  const clean = url.split(/[?#]/)[0].toLowerCase();
  if (/\.(mp4|webm|ogg)$/.test(clean)) return { kind: 'video', url };
  if (/\.(png|jpe?g|webp|gif|svg|avif)$/.test(clean)) return { kind: 'image', url };
  return { kind: 'link', url };
}

export function mediaHost(url: string): string {
  try {
    return new URL(url, 'https://codesquad.ai').hostname.replace(/^www\./, '') || 'Project resource';
  } catch {
    return 'Project resource';
  }
}

/**
 * Vimeo has no predictable thumbnail URL pattern, so it's fetched via oEmbed.
 * Server-only call — wrapped so a slow/failed request degrades to the
 * fallback video card instead of breaking the page.
 */
export async function fetchVimeoThumbnail(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`, {
      next: { revalidate: 3600 },
    });
    if (!response.ok) return undefined;
    const data = (await response.json()) as { thumbnail_url?: unknown };
    return typeof data.thumbnail_url === 'string' ? data.thumbnail_url : undefined;
  } catch {
    return undefined;
  }
}
