'use client';

import { useState } from 'react';
import Link from 'next/link';
import CalculatorShell from '@/components/court-fee/CalculatorShell';
import RefundCalculator from '@/components/court-fee/RefundCalculator';
import Disclaimer from '@/components/shared/Disclaimer';

type CalculatorMode = 'calculator' | 'refund';

const TAB_STYLE_ACTIVE = {
  background: 'white',
  color: 'var(--color-teal-700)',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
} as const;

const TAB_STYLE_INACTIVE = {
  background: 'transparent',
  color: 'var(--color-neutral-500)',
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
              background: 'linear-gradient(135deg, var(--color-teal-600), var(--color-teal-700))',
              color: 'white',
            }}
          >
            {'\u20B9'}
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-slate-900)', letterSpacing: '-0.01em' }}
          >
            Karnataka Court Fee Calculator
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
            Under the Karnataka Court Fees &amp; Suits Valuation Act, 1958
          </p>
          <div className="flex gap-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--color-teal-50)', color: 'var(--color-teal-700)', border: '1px solid var(--color-teal-200)' }}
            >
              Karnataka
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--color-amber-50)', color: 'var(--color-amber-700)', border: '1px solid var(--color-amber-200)' }}
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

      {/* Calculator / Refund toggle */}
      <div
        role="tablist"
        className="flex rounded-xl p-1 mb-5 gap-1"
        style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}
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
