'use client';

import Link from 'next/link';
import StampDutyShell from '@/components/stamp-duty/StampDutyShell';
import Disclaimer from '@/components/shared/Disclaimer';

export default function StampDutyCalculatorPage() {
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
            {'\u{1F4C3}'}
          </div>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
          >
            Stamp Duty Calculator
          </h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            Under the Karnataka Stamp Act, 1957 &amp; Registration Act, 1908
          </p>
          <div className="flex gap-1.5">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--color-surface-muted)', color: 'var(--color-accent)', border: '1px solid var(--color-border)' }}
            >
              Karnataka
            </span>
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}
            >
              1957 Act
            </span>
          </div>
        </div>
      </div>

      {/* Intro */}
      <details className="intro-section no-print">
        <summary>About this tool</summary>
        <div className="intro-content">
          <p>
            This calculator computes stamp duty, registration fees, surcharge, and cess under the Karnataka Stamp Act,
            1957 and the Registration Act, 1908. Choose from 24 instrument types across 8 categories — conveyances
            (sale deeds), gift and release deeds, mortgages, leases, powers of attorney, partition deeds, trust
            settlements, and miscellaneous instruments like wills and adoption deeds.
          </p>
          <p>
            For sale deeds, the engine uses cumulative marginal rates (2%/3%/5%) as prescribed by the Act. Family
            instruments attract a fixed location-based duty. SC/ST members buying their first property are eligible for
            a 50% stamp duty rebate. Surcharge and cess are location-dependent (BBMP, BMRDA/Municipal, or Rural).
            Registration fee is 2% (effective August 2025). Everything runs in your browser — no data is stored.
          </p>
        </div>
      </details>

      <StampDutyShell />

      <div className="mt-8">
        <Disclaimer />
        <div className="mt-3 text-center">
          <Link
            href="/feedback?calculator=stamp-duty"
            className="feedback-issue-link"
          >
            {'\u{1F6A9}'} Report an issue with these rules
          </Link>
        </div>
      </div>
    </div>
  );
}
