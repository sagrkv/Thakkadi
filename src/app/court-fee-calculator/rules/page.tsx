import Link from 'next/link';
import CourtFeeRulesView from '@/components/court-fee/RulesView';
import Disclaimer from '@/components/shared/Disclaimer';

export const metadata = {
  title: 'Court Fee Rules Reference | Thakkadi',
  description: 'Complete reference of Karnataka court fee slabs and suit type fee schedules under the Court Fees & Suits Valuation Act, 1958.',
};

export default function CourtFeeRulesPage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back link */}
        <Link
          href="/court-fee-calculator"
          className="rules-link rules-link-teal mb-6 inline-flex"
        >
          {'\u2190'} Back to Calculator
        </Link>

        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
              style={{
                background: 'linear-gradient(135deg, var(--color-teal-600), var(--color-teal-700))',
                color: 'white',
              }}
            >
              {'\u20B9'}
            </div>
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-slate-900)',
                  letterSpacing: '-0.02em',
                }}
              >
                Court Fee Rules Reference
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-neutral-500)' }}>
                Karnataka Court Fees &amp; Suits Valuation Act, 1958
              </p>
            </div>
          </div>
        </div>

        {/* Rules content */}
        <div className="animate-in">
          <CourtFeeRulesView />
        </div>

        {/* Disclaimer */}
        <div className="mt-10">
          <Disclaimer />
        </div>

        {/* Source info */}
        <div className="text-center text-sm mt-6" style={{ color: 'var(--color-neutral-500)' }}>
          <p>
            <span className="font-medium">Source:</span> Karnataka Court Fees &amp; Suits Valuation Act, 1958 (Act 2 of 1993 amendment)
          </p>
        </div>
      </div>
    </div>
  );
}
