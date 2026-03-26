import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import FAQSection from '@/components/shared/FAQSection';
import { buildWebApplicationSchema, buildFAQSchema } from '@/lib/seo/json-ld';
import { LIMITATION_FAQS } from '@/data/faqs';

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
      <JsonLd data={buildFAQSchema([...LIMITATION_FAQS])} />
      <div className="max-w-4xl mx-auto px-4">
        <div className="pt-6">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Limitation Calculator' },
            ]}
          />
        </div>
      </div>
      {children}
      <div className="max-w-4xl mx-auto px-4 pb-8">
        <FAQSection items={[...LIMITATION_FAQS]} />
      </div>
    </>
  );
}
