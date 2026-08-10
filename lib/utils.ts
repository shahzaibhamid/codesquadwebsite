/** Small shared helpers. */

/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Turn a title (or a manually-entered slug) into a single-segment, URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '-') // includes "/" — never allow multi-segment slugs
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Return a YouTube thumbnail URL from any YouTube link, else ''.
 * Ported from the WordPress cs_youtube_thumb() logic.
 * Supports watch?v=, youtu.be/, /embed/, /shorts/.
 */
export function youtubeId(url?: string): string {
  if (!url) return '';
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?(?:[^\s"']*&)?v=|embed\/|shorts\/|v\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/i,
  );
  return m ? m[1] : '';
}

export function youtubeThumb(url?: string): string {
  const id = youtubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const escapeAttr = (s: string) => escapeHtml(s).replace(/"/g, '&quot;');

function imageTag(src?: string): string {
  return src ? `<img class="cs-article__image" src="${escapeAttr(src)}" alt="" loading="lazy" />` : '';
}

/**
 * Turn plain pasted text into paragraph/heading HTML so admins don't need to
 * write raw tags. Rules:
 *  - Blank line = new paragraph.
 *  - A line starting with #, ##, or ### becomes an H1/H2/H3 heading.
 *  - **double asterisks** around text makes it bold.
 *  - A line containing only #IMAGE# is replaced, in order, by the next URL
 *    from `images` (upload the images and drop one #IMAGE# marker per spot).
 * If the text already contains HTML markup, it's left as-is (aside from
 * expanding any #IMAGE# markers).
 */
export function contentToHtml(input: string, images: string[] = []): string {
  const text = input.trim();
  if (!text) return '';

  let nextImage = 0;
  const takeImage = () => imageTag(images[nextImage++]);

  if (/<[a-z][\s\S]*>/i.test(text)) {
    return text.replace(/#IMAGE#/gi, () => takeImage());
  }

  const inline = (s: string) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (block.toUpperCase() === '#IMAGE#') return takeImage();
      const heading = block.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        return `<h${level}>${inline(heading[2])}</h${level}>`;
      }
      return `<p>${inline(block).replace(/\n/g, '<br />')}</p>`;
    })
    .filter(Boolean)
    .join('\n');
}
