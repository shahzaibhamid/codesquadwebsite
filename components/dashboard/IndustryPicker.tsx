'use client';

import { useState } from 'react';

const NEW_OPTION = '__new__';

export default function IndustryPicker({ industries, defaultValue }: { industries: string[]; defaultValue?: string }) {
  const startsAsNew = !!defaultValue && !industries.includes(defaultValue);
  const [mode, setMode] = useState<'select' | 'new'>(startsAsNew ? 'new' : 'select');
  const [value, setValue] = useState(defaultValue || '');

  if (mode === 'new') {
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          name="vertical"
          className="cs-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="New industry name"
          required
        />
        <button
          type="button"
          className="cs-btn cs-btn--ghost"
          onClick={() => { setMode('select'); setValue(''); }}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <select
      name="vertical"
      className="cs-input"
      value={industries.includes(value) ? value : ''}
      onChange={(event) => {
        if (event.target.value === NEW_OPTION) { setMode('new'); setValue(''); }
        else setValue(event.target.value);
      }}
    >
      <option value="">— None (shown under &quot;All&quot; only) —</option>
      {industries.map((industry) => (
        <option key={industry} value={industry}>{industry}</option>
      ))}
      <option value={NEW_OPTION}>+ Add new industry…</option>
    </select>
  );
}
