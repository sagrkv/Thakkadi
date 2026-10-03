import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { buildWebApplicationSchema } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Karnataka Court Fee Calculator — 48 Suit Types, Ad Valorem & Fixed Fees',
  description:
    'Compute court fees under the Karnataka Court Fees & Suits Valuation Act, 1958. Supports 48 suit types across 9 categories including property suits, money suits, appeals, execution, and matrimonial petitions. Includes refund estimator.',
  alternates: {
    canonical: '/court-fee-calculator',
  },
};

export default function CourtFeeCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={buildWebApplicationSchema({
          name: 'Karnataka Court Fee Calculator',
          url: '/court-fee-calculator',
          description:
            'Compute court fees under the Karnataka Court Fees & Suits Valuation Act, 1958 for 48 suit types.',
        })}
      />
      {children}
    </>
  );
}
