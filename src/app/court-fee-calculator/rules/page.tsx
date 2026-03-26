import type { Metadata } from 'next';
import Link from 'next/link';
import CourtFeeRulesView from '@/components/court-fee/RulesView';
import Disclaimer from '@/components/shared/Disclaimer';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Court Fee Rules Reference',
  description: 'Complete reference of Karnataka court fee slabs and suit type fee schedules under the Court Fees & Suits Valuation Act, 1958.',
  alternates: {
    canonical: '/court-fee-calculator/rules',
  },
};

export default function CourtFeeRulesPage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Court Fee Calculator', href: '/court-fee-calculator' },
            { label: 'Rules' },
          ]}
        />

        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
              style={{
                background: 'var(--color-accent)',
                color: 'var(--color-bg)',
              }}
            >
              {'\u20B9'}
            </div>
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Court Fee Rules Reference
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
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
        <div className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            <span className="font-medium">Source:</span> Karnataka Court Fees &amp; Suits Valuation Act, 1958 (Act 2 of 1993 amendment)
          </p>
        </div>
      </div>
    </div>
  );
}
