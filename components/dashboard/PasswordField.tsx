'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

interface PasswordFieldProps {
  id: string;
  name: string;
  placeholder?: string;
  autoFocus?: boolean;
}

/** Password input with a show/hide toggle button. */
export default function PasswordField({ id, name, placeholder, autoFocus }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="cs-pwd">
      <input
        id={id}
        name={name}
        type={visible ? 'text' : 'password'}
        className="cs-input"
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      <button
        type="button"
        className="cs-pwd__toggle"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onClick={() => setVisible((v) => !v)}
      >
        <Icon name={visible ? 'eye-off' : 'eye'} />
      </button>
    </div>
  );
}
