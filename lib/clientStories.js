import stories from './data/client-stories.json';
import bundledCases from './data/case-studies.json';
import { imageAttrs } from './image-attrs';

// Published cases determine membership; story data supplies the curated order and reviews.
// New cases without review copy use their case-study summary, never an invented endorsement.
// Desktop hover or keyboard focus expands the card to reveal its case-study image.
export function getClientStories(cases = bundledCases) {
  const reviews = new Map(stories.map((s) => [s.slug, s]));
  const order = new Map(stories.map((s, i) => [s.slug, i]));
  return cases.filter((c) => c && c.slug && c.name && c.published !== false)
    .map((c) => ({ ...reviews.get(c.slug), ...c,
      tag: reviews.get(c.slug)?.tag || c.cat,
      headline: reviews.get(c.slug)?.headline || c.tagline || c.name,
      summary: reviews.get(c.slug)?.summary || c.tagline,
    }))
    .sort((a, b) => (order.get(a.slug) ?? stories.length) - (order.get(b.slug) ?? stories.length));
}

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const validVideo = (id) => typeof id === 'string' && /^[\w-]{11}$/.test(id);

const PERSON_IC = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 21c.7-4.4 4-7 8.2-7s7.5 2.6 8.2 7z"/></svg>';

function avatar(s, load) {
  if (validVideo(s.videoId)) {
    // A Shorts cover (maxresdefault, 16:9) holds the 9:16 design in its centre with blurred side bars;
    // .is-short crops to that centre strip. A CEO photo, if set, is used as-is instead.
    // "videoWide": true marks a regular landscape video: it plays in a 16:9 modal, and its 16:9 cover is cropped to the
    // narrow box. "thumbPos" (CSS object-position, e.g. "100% 50%") aims that crop at the client's face.
    const poster = s.ceoImg || `https://i.ytimg.com/vi/${s.videoId}/maxresdefault.jpg`;
    const fallback = `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`;
    const cls = s.ceoImg || s.videoWide ? '' : ' class="is-short"';
    const pos = s.videoWide && !s.ceoImg && /^[\w.% -]{1,40}$/.test(s.thumbPos || '') ? ` style="object-position:${esc(s.thumbPos)}"` : '';
    return `<button type="button" class="cst-av cst-av--video" data-video="${esc(s.videoId)}"${s.videoWide ? ' data-wide' : ''} aria-label="Watch ${esc(s.name)} video testimonial">
            <img${cls}${pos} ${imageAttrs(poster, { width: 400, height: 225, sizes: s.ceoImg ? '(max-width: 600px) 88px, 132px' : '420px' })} data-fallback-src="${esc(fallback)}" alt="" loading="${load}" decoding="async"/><span class="cst-play-ic" aria-hidden="true"></span>
          </button>`;
  }
  if (s.ceoImg) return `<div class="cst-av"><img ${imageAttrs(s.ceoImg, { width: 264, height: 336, sizes: '(max-width: 600px) 88px, 132px' })} alt="${esc(s.person || (s.role ? `${s.role} of ${s.name}` : s.name))}" loading="${load}" decoding="async"/></div>`;
  return `<div class="cst-av cst-av--empty">${PERSON_IC}</div>`;
}

// Star rating under the CEO photo. Only shown for a real client review (quote or video testimonial):
// on every card. Each client gets a rating from 4.5 to 4.9 (never a flat 5), picked from a hash of its slug so it
// never changes between renders; set "rating" (1-5, one decimal) in the JSON to override.
const STAR = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2.6l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-.9z"/></svg>';
function ratingFor(s) {
  const set = Number(s.rating);
  if (set) return Math.max(1, Math.min(5, Math.round(set * 10) / 10));
  let h = 0;
  for (const ch of String(s.slug)) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return (45 + (h % 5)) / 10;
}
function stars(s) {
  const n = ratingFor(s);
  // each star's gold fill = how much of that star the rating covers (0-100%)
  const fill = (k) => Math.round(Math.max(0, Math.min(1, n - k)) * 100);
  return `<p class="cst-stars" role="img" aria-label="Rated ${n.toFixed(1)} out of 5">${Array.from({ length: 5 }, (_, k) => `<i style="--f:${fill(k)}%">${STAR}${STAR}</i>`).join('')}<b>${n.toFixed(1)}</b></p>`;
}

function card(s, i) {
  const load = 'lazy'; // The entire rail is below the hero; prioritize above-fold content.
  const industry = String(s.tag || '').split('·')[0].trim();
  const num = String(i + 1).padStart(2, '0');
  const brand = s.logo
    ? `<img class="cst-logo" src="${esc(s.logo)}" alt="${esc(s.name)}" loading="${load}" decoding="async"/>`
    : `<span class="cst-wordmark">${esc(s.name)}</span>`;
  const who = s.person ? `<p class="cst-who"><strong>${esc(s.person)}</strong><span>${esc([s.role, s.name].filter(Boolean).join(', '))}</span></p>`
    : `<p class="cst-who"><strong>${esc(s.name)}</strong>${s.location ? `<span>${esc(s.location)}</span>` : ''}</p>`;
  const label = s.quoteStatus === 'research' ? '<span class="cst-label">Research summary</span>'
    : validVideo(s.videoId) ? '<span class="cst-label">Watch testimonial</span>' : '';
  const voice = s.quote
    ? `${label}<blockquote class="cst-quote"><p>“${esc(s.quote)}”</p></blockquote>`
    : `${label || '<span class="cst-label">Case study summary</span>'}<p class="cst-sum">${esc(s.summary)}</p>`;
  return `<article class="cst-card" role="listitem" aria-label="${esc(s.name)}">
      <div class="cst-top">
        <div class="cst-main">
          <p class="cst-meta"><span class="cst-idx">${num}</span>${industry ? `<span class="cst-ind">${esc(industry)}</span>` : ''}</p>
          <h3 class="cst-hl"><a href="/case-studies/${esc(s.slug)}">${esc(s.headline || s.summary)}</a></h3>
          <div class="cst-brand"><a href="/case-studies/${esc(s.slug)}" aria-label="Read the ${esc(s.name)} case study">${brand}</a></div>
        </div>
        <a class="cst-peek" href="/case-studies/${esc(s.slug)}" aria-label="View the ${esc(s.name)} case study">
          <img ${imageAttrs(s.img, { width: 800, height: 480, sizes: '(max-width: 600px) calc(100vw - 82px), (max-width: 1023px) 406px, 200px' })} alt="" loading="lazy" decoding="async"/>
          <span class="cst-peek-btn">View case study</span>
        </a>
      </div>
      <div class="cst-bottom">
        <div class="cst-side">${avatar(s, load)}${stars(s)}</div>
        ${who}
        <div class="cst-voice">${voice}</div>
      </div>
    </article>`;
}

export function renderClientStories(cases = bundledCases) {
  const list = getClientStories(cases);
  if (!list.length) return '';
  return `<!-- CLIENT STORIES: one card per client = result + case study + testimonial (lib/data/client-stories.json) -->
<section class="sec creambg cst" id="work" data-cst>
  <div class="wrap cst-head reveal">
    <div class="cst-title">
      <span class="eyebrow">Proof, not promises</span>
      <h2 class="display">Client success <em>stories.</em></h2>
      <p class="cst-lede">Real businesses, real systems, real numbers. Open any card to see exactly how we built it.</p>
    </div>
    <div class="cst-actions">
      <span class="cst-count" aria-hidden="true"><b data-cst-cur>01</b> / ${String(list.length).padStart(2, '0')}</span>
      <a class="cst-allbtn" href="/case-studies">All case studies</a>
      <button type="button" class="cst-arrow" data-dir="-1" aria-label="Previous client stories"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
      <button type="button" class="cst-arrow" data-dir="1" aria-label="Next client stories"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    </div>
  </div>
  <div class="cst-box reveal">
    <div class="cst-rail" role="list" aria-label="Client stories" tabindex="0">
    ${list.map(card).join('\n    ')}
    </div>
    <div class="wrap"><div class="cst-progress" aria-hidden="true"><span></span></div></div>
    <dialog class="cst-modal" aria-label="Video testimonial">
      <button type="button" class="cst-modal-x" aria-label="Close video">×</button>
      <div class="cst-modal-frame"></div>
    </dialog>
  </div>
</section>`;
}
