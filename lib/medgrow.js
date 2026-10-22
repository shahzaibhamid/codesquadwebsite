// MedGrow is a CodeSquad product that lives on its own site; every link to it opens in a new tab.
// Product copy on the healthcare page is taken from MedGrow's own site (medgrow.codesquad.ai).

export const MEDGROW_URL = 'https://medgrow.codesquad.ai/';

export const medgrowLink = (label = 'Visit MedGrow ↗', cls = 'btn btn-blue') =>
  `<a class="${cls}" href="${MEDGROW_URL}" target="_blank" rel="noopener noreferrer">${label}</a>`;
