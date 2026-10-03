import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import { buildWebApplicationSchema } from '@/lib/seo/json-ld';

export const metadata: Metadata = {
  title: 'Limitation Period Calculator — Indian Appeals, SLP & Execution Deadlines',
  description:
    'Calculate post-judgment limitation periods under the Limitation Act, 1963. Covers appeals, review, SLP, curative petitions, and execution deadlines across all Indian court levels — from subordinate courts to the Supreme Court.',
  alternates: {
    canonical: '/limitation-calculator',
  },
};

export default function LimitationCalculatorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <JsonLd
        data={buildWebApplicationSchema({
          name: 'Limitation Period Calculator',
          url: '/limitation-calculator',
          description:
            'Calculate post-judgment limitation periods under the Limitation Act, 1963 for appeals, SLP, review, and execution.',
        })}
      />
      {children}
    </>
  );
}
