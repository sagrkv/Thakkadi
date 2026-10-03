import type { ReactNode } from 'react';
import Breadcrumbs from './Breadcrumbs';
import FAQSection from './FAQSection';
import JsonLd from '@/components/seo/JsonLd';
import { buildFAQSchema } from '@/lib/seo/json-ld';
import { LIMITATION_FAQS, COURT_FEE_FAQS, STAMP_DUTY_FAQS } from '@/data/faqs';
const CONFIG = {
  limitation: { label: 'Limitation Calculator', faqs: LIMITATION_FAQS },
  'court-fee': { label: 'Court Fee Calculator', faqs: COURT_FEE_FAQS },
  'stamp-duty': { label: 'Stamp Duty Calculator', faqs: STAMP_DUTY_FAQS },
};
export default function CalculatorFrame({ kind, children }: { kind: keyof typeof CONFIG; children: ReactNode }) {
  const { label, faqs } = CONFIG[kind];
  return <><JsonLd data={buildFAQSchema([...faqs])} /><div className="calculator-breadcrumbs"><div className="pt-6"><Breadcrumbs items={[{ label: 'Home', href: '/' }, { label }]} /></div></div>{children}<div className="calculator-faq"><FAQSection items={[...faqs]} /></div></>;
}
