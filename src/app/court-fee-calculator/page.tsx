'use client';

import Link from 'next/link';
import CalculatorShell from '@/components/court-fee/CalculatorShell';
import RefundCalculator from '@/components/court-fee/RefundCalculator';
import Disclaimer from '@/components/shared/Disclaimer';

export default function CourtFeeCalculatorPage() {
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

      <CalculatorShell />
      <RefundCalculator />

      <div className="mt-8">
        <Disclaimer />
      </div>
    </div>
  );
}
