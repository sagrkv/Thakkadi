'use client';

import { useState, useCallback } from 'react';
import type { RefundScenario } from '@/types/court-fee';
import { calculateRefund, REFUND_SCENARIOS } from '@/lib/court-fee/fee-engine/refund';
import { formatIndianCurrency } from '@/lib/court-fee/utils/format-currency';
import CurrencyInput from '@/components/ui/CurrencyInput';

export default function RefundCalculator() {
  const [scenario, setScenario] = useState<RefundScenario | ''>('');
  const [feesPaid, setFeesPaid] = useState<number>(0);
  const [result, setResult] = useState<{
    refundAmount: number;
    refundPercentage: number;
    description: string;
    legalBasis: string;
  } | null>(null);

  const handleCalculate = useCallback(() => {
    if (!scenario || feesPaid <= 0) return;

    const refundResult = calculateRefund({
      scenario: scenario as RefundScenario,
      feesPaid,
    });
    setResult(refundResult);
  }, [scenario, feesPaid]);

  const handleReset = useCallback(() => {
    setScenario('');
    setFeesPaid(0);
    setResult(null);
  }, []);

  return (
    <div className="refund-section no-print" style={{ background: 'var(--color-neutral-50)', borderRadius: '0.75rem', padding: '1.5rem', marginTop: '2rem' }}>
      <div className="flex items-center gap-2 mb-1">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: 'var(--color-teal-600)' }}
        >
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        <h3
          className="text-base font-semibold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-800)' }}
        >
          Refund Estimator
        </h3>
      </div>
      <p className="text-xs mb-4" style={{ color: 'var(--color-ink-400)' }}>
        Estimate court fee refund based on applicable scenario
      </p>

      <div className="card p-4">
        <div className="form-group">
          <label htmlFor="refund-scenario" className="form-label">
            Refund Scenario
          </label>
          <select
            id="refund-scenario"
            className="form-select"
            value={scenario}
            onChange={(e) => {
              setScenario(e.target.value as RefundScenario | '');
              setResult(null);
            }}
          >
            <option value="">Select a scenario...</option>
            {REFUND_SCENARIOS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {scenario && (
          <>
            <CurrencyInput
              id="refund-fees-paid"
              label="Court Fees Paid (Rs.)"
              placeholder="Enter the amount of court fees paid"
              value={feesPaid || undefined}
              onChange={setFeesPaid}
            />

            <div className="flex gap-2">
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={handleCalculate}
                disabled={feesPaid <= 0}
              >
                Estimate Refund
              </button>
              {result && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleReset}
                >
                  Clear
                </button>
              )}
            </div>
          </>
        )}

        {result && (
          <div
            className="mt-4 p-4 rounded-lg animate-in"
            style={{
              background: 'var(--color-teal-50)',
              border: '1px solid var(--color-teal-200)',
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: 'var(--color-ink-600)' }}>
                Estimated Refund
              </span>
              <span className="refund-badge">
                {formatIndianCurrency(result.refundAmount)}
              </span>
            </div>
            <div className="text-xs space-y-1" style={{ color: 'var(--color-ink-500)' }}>
              <p>Refund: {result.refundPercentage}% of fees paid</p>
              <p>{result.description}</p>
              <p className="italic">Basis: {result.legalBasis}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
