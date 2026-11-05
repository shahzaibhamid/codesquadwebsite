'use client';
import { useState } from 'react';
import { digitsOnly } from '../../lib/metaFormat';

// Slide-in panel showing every field of one lead, with a "Copy details" button.
export default function LeadDrawer({ lead, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!lead) return null;

  const rows = [
    ['Date & Time', lead.dateTime],
    ['Full Name', lead.fullName],
    ['First Name', lead.firstName],
    ['Last Name', lead.lastName],
    ['Phone', lead.phone],
    ['Email', lead.email],
    ['City', lead.city],
    ['Campaign', lead.campaign],
    ['Ad Set', lead.adSet],
    ['Ad Name', lead.adName],
    ['Platform', lead.platform],
    ['Organic?', lead.organic],
    ['Form ID', lead.formId],
    ['Lead ID', lead.leadId],
    ['Ad ID', lead.adId],
  ];

  const copy = async () => {
    const text = rows.map(([k, v]) => `${k}: ${v || '—'}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const wa = digitsOnly(lead.phone);

  return (
    <div className="meta-drawer-overlay" onClick={onClose}>
      <aside className="meta-drawer" onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Lead details">
        <div className="meta-drawer__head">
          <div>
            <div className="meta-drawer__name">{lead.fullName || '(no name)'}</div>
            <div className="meta-muted">{lead.dateTime || '—'}</div>
          </div>
          <button type="button" className="meta-drawer__close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="meta-drawer__actions">
          {wa && <a className="meta-pill-btn" href={`tel:${wa}`}>Call</a>}
          {wa && <a className="meta-pill-btn meta-pill-btn--wa" href={`https://wa.me/${wa}`} target="_blank" rel="noopener">WhatsApp</a>}
          {lead.email && <a className="meta-pill-btn" href={`mailto:${lead.email}`}>Email</a>}
        </div>

        <dl className="meta-drawer__fields">
          {rows.map(([k, v]) => (
            <div className="meta-drawer__field" key={k}>
              <dt>{k}</dt>
              <dd>{v || '—'}</dd>
            </div>
          ))}
        </dl>

        <button type="button" className="meta-btn-primary meta-drawer__copy" onClick={copy}>
          {copied ? 'Copied ✓' : 'Copy details'}
        </button>
      </aside>
    </div>
  );
}
