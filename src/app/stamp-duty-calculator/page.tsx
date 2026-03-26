'use client';

import Link from 'next/link';
import StampDutyShell from '@/components/stamp-duty/StampDutyShell';
import Disclaimer from '@/components/shared/Disclaimer';

export default function StampDutyCalculatorPage() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-6">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}
        >
          Stamp Duty Calculator
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
          Under the <Link href="/laws/karnataka-stamp-act-1957" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Karnataka Stamp Act, 1957</Link> &amp;{' '}
          <Link href="/laws/registration-act-1908" style={{ color: 'var(--color-accent)', textDecoration: 'underline', textUnderlineOffset: '2px' }}>Registration Act, 1908</Link>
        </p>
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
