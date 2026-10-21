// MedGrow is a CodeSquad product that lives on its own site; every link to it opens in a new tab.
// Description copy is MedGrow's own wording (tagline + what it does), from the site itself.

export const MEDGROW_URL = 'https://medgrow.codesquad.ai/';

export function medgrowBand() {
  return `<section class="sec creambg sec--slim-band" id="medgrow">
  <div class="wrap">
    <div class="svc-engage reveal">
      <div>
        <span class="eyebrow">A product of CodeSquad</span>
        <h2 class="display">MedGrow — Found. Chosen. Booked.</h2>
        <p>A patient growth service for medical practices that combines search visibility, website conversion, and fast follow-up so more enquiries turn into appointments.</p>
      </div>
      <a class="btn btn-blue" href="${MEDGROW_URL}" target="_blank" rel="noopener noreferrer">Visit MedGrow ↗</a>
    </div>
  </div>
</section>`;
}
