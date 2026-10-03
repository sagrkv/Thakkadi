import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { buildWebApplicationSchema } from '@/lib/seo/json-ld';

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
      {children}
    </>
  );
}
