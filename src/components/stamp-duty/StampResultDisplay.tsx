'use client';

import type { StampDutyResult } from '@/types/stamp-duty';
import { formatIndianCurrency, formatInWords } from '@/lib/court-fee/utils/format-currency';
import PrintButton from '@/components/ui/PrintButton';
import ShareButton from '@/components/shared/ShareButton';

interface StampResultDisplayProps {
  readonly result: StampDutyResult;
  readonly onReset: () => void;
  readonly onBack: () => void;
}

export default function StampResultDisplay({
  result,
  onReset,
  onBack,
}: StampResultDisplayProps) {
  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity no-print"
        style={{ color: 'var(--color-accent)', fontWeight: 600 }}
        aria-label="Go back to change values"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Change values
      </button>

      {/* Print header */}
      <div className="print-only mb-4">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>
          Karnataka Stamp Duty Calculation
        </h1>
        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Under the Karnataka Stamp Act, 1957 &amp; Registration Act, 1908
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-tertiary)' }}>
          Generated on {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      <div className="stamp-result-card">
        {/* Total payable header */}
        <div className="stamp-result-header">
          {result.isNilDuty ? (
            <div className="animate-fee">
              <div className="stamp-result-fee-label">Stamp Duty</div>
              <div className="stamp-result-exempt">Nil</div>
              <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                No stamp duty payable for {result.instrumentLabel}
              </p>
            </div>
          ) : (
            <div className="animate-fee">
              <div className="stamp-result-fee-label">Total Payable</div>
              <div className="stamp-result-fee">{formatIndianCurrency(result.totalPayable)}</div>
              {result.totalPayable >= 1000 && (
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                  ({formatInWords(result.totalPayable)})
                </p>
              )}
            </div>
          )}
        </div>

        {/* Instrument info */}
        <div
          className="px-4 py-2.5 flex items-center justify-between text-xs"
          style={{
            background: 'var(--color-surface-muted)',
            borderBottom: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span className="font-semibold">{result.instrumentLabel}</span>
          <span
            className="px-2 py-0.5 rounded font-semibold"
            style={{
              background: 'var(--color-surface-muted)',
              color: 'var(--color-accent)',
            }}
          >
            {result.section}
          </span>
        </div>

        {/* Breakdown table */}
        <div className="p-1">
          <table className="breakdown-table">
            <tbody>
              {result.breakdown.map((step, i) => (
                <tr
                  key={i}
                  className={`breakdown-row ${step.isHighlight ? 'stamp-breakdown-highlight' : ''} ${step.isSubtotal ? 'breakdown-row-subtotal' : ''}`}
                >
                  <td className="breakdown-label">{step.label}</td>
                  <td className="breakdown-value">{step.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Registration fee note */}
        <div
          className="mx-4 mb-4 rounded-lg px-3 py-2 text-xs"
          style={{
            background: 'var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Registration fee rate of 2% effective from 1 August 2025 (previously 1%).
        </div>
      </div>

      {/* SC/ST rebate note */}
      {result.scstRebate > 0 && (
        <div
          className="mt-3 rounded-lg px-4 py-3 text-sm"
          style={{
            background: 'var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <strong>SC/ST Rebate Applied:</strong> {formatIndianCurrency(result.scstRebate)} (50% of stamp duty) deducted as first property purchase rebate.
        </div>
      )}

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
        <div className="flex items-center gap-2">
          <ShareButton title="Stamp Duty Calculation" text="Check out my stamp duty calculation on Thakkadi" />
          <PrintButton />
        </div>
      </div>
    </div>
  );
}
