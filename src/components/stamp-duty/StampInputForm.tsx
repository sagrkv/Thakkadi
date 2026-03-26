'use client';

import { useCallback } from 'react';
import type { InstrumentDefinition, StampDutyInput, LocationType } from '@/types/stamp-duty';
import CurrencyInput from '@/components/ui/CurrencyInput';
import { LOCATION_LABELS } from '@/lib/stamp-duty/constants/rates';

interface StampInputFormProps {
  readonly instrument: InstrumentDefinition;
  readonly input: StampDutyInput;
  readonly onChangeInput: (partial: Partial<StampDutyInput>) => void;
  readonly onCalculate: () => void;
  readonly onBack: () => void;
  readonly error: string | null;
}

const LOCATION_OPTIONS: readonly { id: LocationType; label: string }[] = [
  { id: 'bbmp', label: LOCATION_LABELS.bbmp },
  { id: 'municipal', label: LOCATION_LABELS.municipal },
  { id: 'rural', label: LOCATION_LABELS.rural },
];

export default function StampInputForm({
  instrument,
  input,
  onChangeInput,
  onCalculate,
  onBack,
  error,
}: StampInputFormProps) {
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onCalculate();
    },
    [onCalculate],
  );

  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'var(--color-accent)', fontWeight: 600 }}
        aria-label="Go back to instruments"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to instruments
      </button>

      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {instrument.label}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        {instrument.description}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Property Value */}
        {instrument.requiresValue && (
          <CurrencyInput
            id="propertyValue"
            label="Property / Consideration Value"
            placeholder="e.g. 50,00,000"
            helpText="Enter the market value or consideration amount"
            value={input.propertyValue}
            onChange={(val) => onChangeInput({ propertyValue: val })}
          />
        )}

        {/* Location */}
        {instrument.requiresLocation && (
          <div className="form-group">
            <label className="form-label">Property Location</label>
            <div className="flex flex-col gap-2">
              {LOCATION_OPTIONS.map((opt) => (
                <label
                  key={opt.id}
                  className={`stamp-location-option ${input.location === opt.id ? 'selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="location"
                    value={opt.id}
                    checked={input.location === opt.id}
                    onChange={() => onChangeInput({ location: opt.id })}
                    className="sr-only"
                  />
                  <span
                    className="stamp-location-radio"
                    aria-hidden="true"
                  >
                    {input.location === opt.id && (
                      <span
                        style={{
                          width: '0.375rem',
                          height: '0.375rem',
                          background: 'white',
                          borderRadius: '50%',
                          display: 'block',
                        }}
                      />
                    )}
                  </span>
                  <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Family Distinction */}
        {instrument.hasFamilyDistinction && (
          <div className="form-group">
            <label className="form-label">Relationship</label>
            <div className="flex gap-3">
              <label
                className={`stamp-toggle-option ${input.isFamilyRelation === true ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="familyRelation"
                  checked={input.isFamilyRelation === true}
                  onChange={() => onChangeInput({ isFamilyRelation: true })}
                  className="sr-only"
                />
                <span className="stamp-toggle-dot" />
                <span>Family Member</span>
              </label>
              <label
                className={`stamp-toggle-option ${input.isFamilyRelation === false ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name="familyRelation"
                  checked={input.isFamilyRelation === false}
                  onChange={() => onChangeInput({ isFamilyRelation: false })}
                  className="sr-only"
                />
                <span className="stamp-toggle-dot" />
                <span>Non-Family</span>
              </label>
            </div>
            <p className="form-help">
              Family includes spouse, children, grandchildren, parents, siblings
            </p>
          </div>
        )}

        {/* Lease Terms */}
        {instrument.requiresLeaseTerms && (
          <div className="form-group">
            <label htmlFor="leaseTermYears" className="form-label">
              Lease Term (years)
            </label>
            <input
              id="leaseTermYears"
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 15"
              value={input.leaseTermYears ?? ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChangeInput({ leaseTermYears: isNaN(val) ? undefined : val });
              }}
            />
          </div>
        )}

        {/* Share Count */}
        {instrument.requiresShareCount && (
          <div className="form-group">
            <label htmlFor="shareCount" className="form-label">
              Number of Shares / Parties
            </label>
            <input
              id="shareCount"
              type="number"
              min="1"
              className="form-input"
              placeholder="e.g. 3"
              value={input.shareCount ?? ''}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10);
                onChangeInput({ shareCount: isNaN(val) ? undefined : val });
              }}
            />
          </div>
        )}

        {/* SC/ST Rebate */}
        {instrument.scstRebateEligible && (
          <div
            className="rounded-lg p-4"
            style={{
              background: 'var(--color-surface-muted)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="scstRebate"
                checked={input.isScSt === true}
                onChange={(e) =>
                  onChangeInput({
                    isScSt: e.target.checked,
                    isFirstProperty: e.target.checked ? input.isFirstProperty : false,
                  })
                }
                className="mt-1"
                style={{ accentColor: 'var(--color-accent)' }}
              />
              <div>
                <label htmlFor="scstRebate" className="text-sm font-semibold cursor-pointer" style={{ color: 'var(--color-text-primary)' }}>
                  SC/ST Category
                </label>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  50% rebate on stamp duty for first property purchase
                </p>
              </div>
            </div>

            {input.isScSt && (
              <div className="mt-3 ml-7 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="firstProperty"
                  checked={input.isFirstProperty === true}
                  onChange={(e) => onChangeInput({ isFirstProperty: e.target.checked })}
                  className="mt-1"
                  style={{ accentColor: 'var(--color-accent)' }}
                />
                <label htmlFor="firstProperty" className="text-sm cursor-pointer" style={{ color: 'var(--color-text-secondary)' }}>
                  This is the first property purchase
                </label>
              </div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="alert-danger">
            {error}
          </div>
        )}

        {/* Submit */}
        <button type="submit" className="btn btn-stamp-primary w-full">
          Calculate Stamp Duty &amp; Fees
        </button>
      </form>
    </div>
  );
}
