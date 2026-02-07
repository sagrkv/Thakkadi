'use client';

import { useState, useCallback } from 'react';
import type { SuitTypeDefinition } from '@/types/court-fee';
import CurrencyInput from '@/components/ui/CurrencyInput';
import SectionBadge from '@/components/ui/SectionBadge';
import { validateSuitInputs } from '@/lib/court-fee/utils/validation';

interface ValueInputFormProps {
  readonly suitType: SuitTypeDefinition;
  readonly values: Record<string, number>;
  readonly onChangeField: (field: string, value: number) => void;
  readonly onCalculate: () => void;
  readonly onBack: () => void;
  readonly error: string | null;
}

export default function ValueInputForm({
  suitType,
  values,
  onChangeField,
  onCalculate,
  onBack,
  error,
}: ValueInputFormProps) {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // For fixed/exempt suits with no input fields, just calculate
      if (suitType.inputFields.length === 0) {
        onCalculate();
        return;
      }

      const validationError = validateSuitInputs(values, suitType.inputFields);
      if (validationError) {
        setLocalError(validationError);
        return;
      }

      setLocalError(null);
      onCalculate();
    },
    [suitType, values, onCalculate]
  );

  const displayError = localError ?? error;
  const hasNoInputs = suitType.inputFields.length === 0;

  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'var(--color-teal-700)', fontWeight: 600 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to suit types
      </button>

      <div className="flex items-start gap-3 mb-4">
        <div className="flex-1">
          <h2
            className="text-lg font-semibold mb-0.5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-800)' }}
          >
            {suitType.label}
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <SectionBadge section={suitType.section} />
            <span className="text-xs" style={{ color: 'var(--color-ink-400)' }}>
              {suitType.valueBasis}
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {hasNoInputs ? (
          <div
            className="text-center py-8 rounded-lg mb-4"
            style={{
              background: 'linear-gradient(135deg, var(--color-parchment-50), var(--color-parchment-100))',
              border: '1px solid var(--color-parchment-200)',
            }}
          >
            <div
              className="w-10 h-10 rounded-lg mx-auto mb-3 flex items-center justify-center text-lg"
              style={{
                background: suitType.feeMethod === 'exempt' ? 'var(--color-teal-50)' : 'var(--color-amber-50)',
                color: suitType.feeMethod === 'exempt' ? 'var(--color-teal-600)' : 'var(--color-amber-600)',
              }}
            >
              {suitType.feeMethod === 'exempt' ? '\u2713' : '\u20B9'}
            </div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-ink-700)' }}>
              {suitType.feeMethod === 'exempt'
                ? 'This petition is exempt from court fees.'
                : `Fixed fee: ${suitType.valueBasis}`}
            </p>
            <p className="text-xs mt-1.5" style={{ color: 'var(--color-ink-400)' }}>
              No additional input required — click below to view details
            </p>
          </div>
        ) : (
          suitType.inputFields.map((field) => (
            <CurrencyInput
              key={field.id}
              id={field.id}
              label={field.label}
              placeholder={field.placeholder}
              helpText={field.helpText}
              value={values[field.id]}
              onChange={(val) => onChangeField(field.id, val)}
            />
          ))
        )}

        {displayError && (
          <div className="form-error mb-3">{displayError}</div>
        )}

        <button type="submit" className="btn btn-primary w-full mt-2">
          Calculate Court Fee
        </button>
      </form>
    </div>
  );
}
