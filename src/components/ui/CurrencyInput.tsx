'use client';

import { useCallback } from 'react';

interface CurrencyInputProps {
  readonly id: string;
  readonly label: string;
  readonly placeholder: string;
  readonly helpText?: string;
  readonly value: number | undefined;
  readonly onChange: (value: number) => void;
  readonly error?: string;
}

export default function CurrencyInput({
  id,
  label,
  placeholder,
  helpText,
  value,
  onChange,
  error,
}: CurrencyInputProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9]/g, '');
      const num = parseInt(raw, 10);
      if (!isNaN(num) && num >= 0) {
        onChange(num);
      } else if (raw === '') {
        onChange(0);
      }
    },
    [onChange]
  );

  const displayValue = value && value > 0
    ? value.toLocaleString('en-IN')
    : '';

  return (
    <div className="form-group">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className="relative">
        <span className="form-input-prefix">Rs.</span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          className="form-input"
          placeholder={placeholder}
          value={displayValue}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
      {helpText && <p className="form-help">{helpText}</p>}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}
