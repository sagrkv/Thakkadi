'use client';

import { useId } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  readonly items: FAQItem[];
  readonly heading?: string;
}

export default function FAQSection({
  items,
  heading = 'Frequently Asked Questions',
}: FAQSectionProps) {
  const headingId = useId();

  return (
    <section className="faq-section">
      <h2 id={headingId} className="faq-heading">{heading}</h2>
      <div className="faq-list" aria-labelledby={headingId}>
        {items.map((item, i) => (
          <details key={i} className="faq-item">
            <summary className="faq-question">{item.question}</summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
