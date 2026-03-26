import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FAQSection from '@/components/shared/FAQSection';
import { buildWebApplicationSchema, buildFAQSchema } from '@/lib/seo/json-ld';
import { COURT_FEE_FAQS } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Karnataka Court Fee Calculator — 50+ Suit Types, Ad Valorem & Fixed Fees',
  description:
    'Compute court fees under the Karnataka Court Fees & Suits Valuation Act, 1958. Supports 50+ suit types across 9 categories including property suits, money suits, appeals, execution, and matrimonial petitions. Includes refund estimator.',
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
            'Compute court fees under the Karnataka Court Fees & Suits Valuation Act, 1958 for 50+ suit types.',
        })}
      />
      <JsonLd data={buildFAQSchema([...COURT_FEE_FAQS])} />
      <div className="max-w-3xl mx-auto px-4">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Court Fee Calculator' },
            ]}
          />
        </div>
      </div>
      {children}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <FAQSection items={[...COURT_FEE_FAQS]} />
      </div>
    </>
  );
}
