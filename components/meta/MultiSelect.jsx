'use client';
import { useEffect, useRef, useState } from 'react';

// A compact checkbox dropdown used for the Campaign / Ad Set / Ad filters.
export default function MultiSelect({ label, options, selected, onChange, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const toggle = (opt) => {
    if (selected.includes(opt)) onChange(selected.filter((o) => o !== opt));
    else onChange([...selected, opt]);
  };

  const count = selected.length;
  const summary = count === 0 ? `All ${label.toLowerCase()}` : `${count} selected`;

  return (
    <div className="meta-ms" ref={ref}>
      <button
        type="button"
        className={`meta-ms__btn${count ? ' is-active' : ''}`}
        onClick={() => !disabled && setOpen((o) => !o)}
        disabled={disabled}
        aria-expanded={open}
      >
        <span className="meta-ms__label">{label}</span>
        <span className="meta-ms__summary">{summary}</span>
        <span className="meta-ms__caret" aria-hidden>▾</span>
      </button>
      {open && (
        <div className="meta-ms__menu" role="listbox">
          <div className="meta-ms__menu-head">
            <button type="button" onClick={() => onChange([])} disabled={!count}>Clear</button>
            <span>{options.length} options</span>
          </div>
          <div className="meta-ms__list">
            {options.length === 0 && <div className="meta-ms__empty">No options</div>}
            {options.map((opt) => (
              <label key={opt} className="meta-ms__opt" title={opt}>
                <input
                  type="checkbox"
                  checked={selected.includes(opt)}
                  onChange={() => toggle(opt)}
                />
                <span>{opt || '(blank)'}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
