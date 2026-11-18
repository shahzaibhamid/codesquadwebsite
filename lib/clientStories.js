import stories from './data/client-stories.json';

// Homepage "Client stories": a rail of wide cards, one per client. Top: result headline, tags and
// client name/logo; bottom: testimonial (video, CEO photo or placeholder + quote). On hover (desktop)
// the card widens to reveal the case-study image with a "View case study" link; on touch screens
// that image is shown as a banner instead.
// Content lives in lib/data/client-stories.json (order = card order). Optional per client:
// videoId (YouTube), ceoImg, logo, quote/person/role. A card with no quote shows its summary.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const validVideo = (id) => typeof id === 'string' && /^[\w-]{11}$/.test(id);

const PERSON_IC = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="8" r="4.2"/><path d="M3.8 21c.7-4.4 4-7 8.2-7s7.5 2.6 8.2 7z"/></svg>';

function avatar(s, load) {
  if (validVideo(s.videoId)) {
    // A Shorts cover (maxresdefault, 16:9) holds the 9:16 design in its centre with blurred side bars;
    // .is-short crops to that centre strip. A CEO photo, if set, is used as-is instead.
    const poster = s.ceoImg || `https://i.ytimg.com/vi/${s.videoId}/maxresdefault.jpg`;
    const fallback = `https://i.ytimg.com/vi/${s.videoId}/hqdefault.jpg`;
    const cls = s.ceoImg ? '' : ' class="is-short"';
    return `<button type="button" class="cst-av cst-av--video" data-video="${esc(s.videoId)}" aria-label="Watch ${esc(s.name)} video testimonial">
            <img${cls} src="${esc(poster)}" data-fallback-src="${esc(fallback)}" alt="" loading="${load}" decoding="async"/><span class="cst-play-ic" aria-hidden="true"></span>
          </button>`;
  }
  if (s.ceoImg) return `<div class="cst-av"><img src="${esc(s.ceoImg)}" alt="${esc(s.person || (s.role ? `${s.role} of ${s.name}` : s.name))}" loading="${load}" decoding="async"/></div>`;
  return `<div class="cst-av cst-av--empty">${PERSON_IC}</div>`;
}

function card(s, i) {
  const load = i < 3 ? 'eager' : 'lazy';
  const tags = String(s.tag || '').split('·').map((t) => t.trim()).filter(Boolean);
  const brand = s.logo
    ? `<img class="cst-logo" src="${esc(s.logo)}" alt="${esc(s.name)}" loading="${load}" decoding="async"/>`
    : `<span class="cst-wordmark">${esc(s.name)}</span>`;
  // caption for a photo on a card without a quote, e.g. "CEO, Eight Orbit Urban Farms"
  const whoLine = `<p class="cst-who"><strong>${esc(s.person || s.role || s.name)}</strong>${s.person || s.role ? `<span>${esc(s.person ? [s.role, s.name].filter(Boolean).join(', ') : s.name)}</span>` : ''}</p>`;
  const who = s.person ? `<p class="cst-who"><strong>${esc(s.person)}</strong><span>${esc([s.role, s.name].filter(Boolean).join(', '))}</span></p>`
    : `<p class="cst-who"><strong>${esc(s.name)}</strong>${s.location ? `<span>${esc(s.location)}</span>` : ''}</p>`;
  const label = validVideo(s.videoId) ? '<span class="cst-label">Watch testimonial</span>' : '';
  const voice = s.quote
    ? `${label}<blockquote class="cst-quote"><p>“${esc(s.quote)}”</p></blockquote>${who}`
    : `${label || '<span class="cst-label">The result</span>'}<p class="cst-sum">${esc(s.summary)}</p>${s.ceoImg || s.person ? whoLine : ''}`;
  return `<article class="cst-card" role="listitem" aria-label="${esc(s.name)}">
      <div class="cst-top">
        <div class="cst-main">
          <h3 class="cst-hl">${esc(s.headline || s.summary)}</h3>
          <ul class="cst-tags">${tags.map((t, k) => `<li${k ? '' : ' class="is-ind"'}>${esc(t)}</li>`).join('')}</ul>
          <div class="cst-brand">${brand}</div>
        </div>
        <a class="cst-peek" href="/case-studies/${esc(s.slug)}">
          <img src="${esc(s.img)}" alt="" loading="lazy" decoding="async"/>
          <span class="cst-peek-btn">View case study <i aria-hidden="true">↗</i></span>
        </a>
      </div>
      <div class="cst-bottom">
        ${avatar(s, load)}
        <div class="cst-voice">${voice}</div>
      </div>
    </article>`;
}

export function renderClientStories() {
  const list = stories.filter((s) => s && s.slug && s.name);
  if (!list.length) return '';
  return `<!-- CLIENT STORIES: one card per client = result + case study + testimonial (lib/data/client-stories.json) -->
<section class="sec creambg cst" id="work" data-cst>
  <div class="wrap cst-head reveal">
    <div class="cst-title">
      <h2 class="display">Client success stories.</h2>
    </div>
    <div class="cst-actions">
      <a class="cst-allbtn" href="/case-studies">All case studies</a>
      <button type="button" class="cst-arrow" data-dir="-1" aria-label="Previous client stories"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>
      <button type="button" class="cst-arrow" data-dir="1" aria-label="Next client stories"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
    </div>
  </div>
  <div class="cst-box reveal">
    <div class="cst-rail" role="list" aria-label="Client stories" tabindex="0">
    ${list.map(card).join('\n    ')}
    </div>
    <dialog class="cst-modal" aria-label="Video testimonial">
      <button type="button" class="cst-modal-x" aria-label="Close video">×</button>
      <div class="cst-modal-frame"></div>
    </dialog>
  </div>
</section>`;
}
