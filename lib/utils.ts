/** Small shared helpers. */

/** Join class names, skipping falsy values. */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Turn a title into a URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
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

/**
 * Turn plain pasted text into paragraph/heading HTML so admins don't need to
 * write raw tags. Rules:
 *  - Blank line = new paragraph.
 *  - A line starting with #, ##, or ### becomes an H1/H2/H3 heading.
 *  - **double asterisks** around text makes it bold.
 * If the text already contains HTML markup, it's left as-is.
 */
export function contentToHtml(input: string): string {
  const text = input.trim();
  if (!text) return '';
  if (/<[a-z][\s\S]*>/i.test(text)) return text;

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const inline = (s: string) => escape(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

  return text
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const heading = block.match(/^(#{1,3})\s+(.+)$/);
      if (heading) {
        const level = heading[1].length;
        return `<h${level}>${inline(heading[2])}</h${level}>`;
      }
      return `<p>${inline(block).replace(/\n/g, '<br />')}</p>`;
    })
    .join('\n');
}
