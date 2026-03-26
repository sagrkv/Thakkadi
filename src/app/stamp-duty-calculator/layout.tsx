import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FAQSection from '@/components/shared/FAQSection';
import { buildWebApplicationSchema, buildFAQSchema } from '@/lib/seo/json-ld';
import { STAMP_DUTY_FAQS } from '@/data/faqs';

export const metadata: Metadata = {
  title: 'Karnataka Stamp Duty Calculator — Sale Deed, Gift, Mortgage & More',
  description:
    'Calculate stamp duty, registration fees, surcharge & cess under the Karnataka Stamp Act, 1957. Covers 24 instrument types including sale deeds, gift deeds, mortgages, leases, and powers of attorney. SC/ST rebate supported.',
  alternates: {
    canonical: '/stamp-duty-calculator',
  },
};

export default function StampDutyCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={buildWebApplicationSchema({
          name: 'Karnataka Stamp Duty Calculator',
          url: '/stamp-duty-calculator',
          description:
            'Calculate stamp duty, registration fees, surcharge & cess under the Karnataka Stamp Act, 1957 for 24 instrument types.',
        })}
      />
      <JsonLd data={buildFAQSchema([...STAMP_DUTY_FAQS])} />
      <div className="max-w-3xl mx-auto px-4">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Stamp Duty Calculator' },
            ]}
          />
        </div>
      </div>
      {children}
      <div className="max-w-3xl mx-auto px-4 pb-8">
        <FAQSection items={[...STAMP_DUTY_FAQS]} />
      </div>
    </>
  );
}
