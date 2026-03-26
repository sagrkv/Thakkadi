'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorShell from '@/components/court-fee/CalculatorShell';
import RefundCalculator from '@/components/court-fee/RefundCalculator';
import Disclaimer from '@/components/shared/Disclaimer';

type CalculatorMode = 'calculator' | 'refund';

const TAB_STYLE_ACTIVE = {
  background: 'var(--color-surface-muted)',
  color: 'var(--color-accent)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
} as const;

const TAB_STYLE_INACTIVE = {
  background: 'transparent',
  color: 'var(--color-text-tertiary)',
} as const;

export default function CourtFeeCalculatorPage() {
  const [mode, setMode] = useState<CalculatorMode>('calculator');

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
            style={{
              background: 'var(--color-surface-muted)',
              color: 'var(--color-accent)',
            }}
          >
            {'\u20B9'}
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
          >
            Karnataka Court Fee Calculator
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            Under the Karnataka Court Fees &amp; Suits Valuation Act, 1958
          </p>
          <div className="flex gap-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-accent)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
            >
              Karnataka
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'rgba(212, 175, 55, 0.1)', color: 'var(--color-accent)', border: '1px solid rgba(212, 175, 55, 0.2)' }}
            >
              1958 Act
            </span>
          </div>
        </div>
        <div className="mt-3">
          <Link href="/court-fee-calculator/rules" className="rules-link rules-link-teal">
            {'\u{1F4CB}'} View All Rules
          </Link>
        </div>
      </div>

      {/* Intro */}
      <details className="intro-section no-print">
        <summary>About this tool</summary>
        <div className="intro-content">
          <p>
            This calculator computes court fees payable under the Karnataka Court Fees and Suits Valuation Act, 1958
            (as amended by Act 2 of 1993). Select from over 50 suit types across 9 categories — property suits, money
            suits, matrimonial petitions, succession matters, appeals, execution applications, and more.
          </p>
          <p>
            The engine applies the 14-tier ad valorem slab table for value-based suits and fixed-fee schedules for
            specific petition types. It also includes a Refund Estimator that calculates refund amounts based on the
            stage at which a suit is settled or withdrawn. All calculations are deterministic and run entirely in your
            browser — this tool is specific to Karnataka courts.
          </p>
        </div>
      </details>

      {/* Calculator / Refund toggle */}
      <div
        role="tablist"
        className="flex rounded-xl p-1 mb-5 gap-1"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'calculator'}
          aria-controls="panel-calculator"
          onClick={() => setMode('calculator')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
          style={mode === 'calculator' ? TAB_STYLE_ACTIVE : TAB_STYLE_INACTIVE}
        >
          <span>{'\u20B9'}</span>
          <span>Fee Calculator</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'refund'}
          aria-controls="panel-refund"
          onClick={() => setMode('refund')}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-200"
          style={mode === 'refund' ? TAB_STYLE_ACTIVE : TAB_STYLE_INACTIVE}
        >
          <span>{'\u21A9'}</span>
          <span>Refund Estimator</span>
        </button>
      </div>

      <div role="tabpanel" id="panel-calculator">
        {mode === 'calculator' && <CalculatorShell />}
      </div>
      <div role="tabpanel" id="panel-refund">
        {mode === 'refund' && <RefundCalculator />}
      </div>

      <div className="mt-8">
        <Disclaimer />
        <div className="mt-3 text-center">
          <Link
            href="/feedback?calculator=court-fee"
            className="feedback-issue-link"
          >
            {'\u{1F6A9}'} Report an issue with these rules
          </Link>
        </div>
      </div>
    </div>
  );
}
