import { getImageProps } from 'next/image';
import { canOptimizeImage } from './image-config.mjs';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Server-rendered HTML sections use native <img> elements with the same responsive
// URLs as next/image. Unknown dashboard image providers retain their original URL.
export function imageAttrs(src, { width, height, sizes }) {
  if (!canOptimizeImage(src)) return `src="${esc(src || '')}"`;
  const { props } = getImageProps({ src, alt: '', width, height, sizes, quality: 75 });
  return `width="${width}" height="${height}" sizes="${esc(props.sizes || sizes)}" srcset="${esc(props.srcSet)}" src="${esc(props.src)}"`;
}
