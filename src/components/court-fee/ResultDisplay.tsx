'use client';

import type { FeeResult } from '@/types/court-fee';
import { formatIndianCurrency, formatInWords } from '@/lib/court-fee/utils/format-currency';
import PrintButton from '@/components/ui/PrintButton';

interface ResultDisplayProps {
  readonly result: FeeResult;
  readonly onReset: () => void;
  readonly onBack: () => void;
}

export default function ResultDisplay({
  result,
  onReset,
  onBack,
}: ResultDisplayProps) {
  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity no-print"
        style={{ color: 'var(--color-teal-700)', fontWeight: 600 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Change values
      </button>

      {/* Print header - only visible when printing */}
      <div className="print-only mb-4">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
          Karnataka Court Fee Calculation
        </h1>
        <p className="text-xs" style={{ color: 'var(--color-ink-500)' }}>
          Under the Karnataka Court Fees &amp; Suits Valuation Act, 1958
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-ink-400)' }}>
          Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="result-card">
        {/* Fee amount header */}
        <div className="result-header">
          {result.isExempt ? (
            <div className="animate-fee">
              <div className="result-fee-label">Court Fee</div>
              <div className="result-exempt">Exempt</div>
              <p className="text-sm mt-1" style={{ color: 'var(--color-teal-200)' }}>
                No court fee is payable
              </p>
            </div>
          ) : (
            <div className="animate-fee">
              <div className="result-fee-label">Court Fee Payable</div>
              <div className="result-fee">{formatIndianCurrency(result.fee)}</div>
              {result.fee >= 1000 && (
                <p className="text-sm mt-1" style={{ color: 'var(--color-teal-200)' }}>
                  ({formatInWords(result.fee)})
                </p>
              )}
            </div>
          )}
        </div>

        {/* Breakdown table */}
        <div className="p-1">
          <table className="breakdown-table">
            <tbody>
              {result.breakdown.map((step, i) => {
                const isHighlight = step.label === 'Court Fee';
                return (
                  <tr
                    key={i}
                    className={`breakdown-row ${isHighlight ? 'breakdown-row-highlight' : ''}`}
                  >
                    <td className="breakdown-label">{step.label}</td>
                    <td className="breakdown-value">{step.value}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-4 no-print">
        <button
          type="button"
          onClick={onReset}
          className="btn btn-ghost btn-sm"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
          </svg>
          New Calculation
        </button>
        <PrintButton />
      </div>
    </div>
  );
}
