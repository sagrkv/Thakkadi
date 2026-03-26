import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description:
    'Thakkadi terms of use. Calculations are indicative and not legal advice.',
  alternates: { canonical: 'https://thakkadi.in/terms' },
};

function RuleDivider() {
  return <div className="rule-divider" style={{ margin: '2.5rem 0' }} />;
}

function SectionHeading({ children }: { readonly children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.35rem',
        fontWeight: 700,
        color: 'var(--color-accent)',
        letterSpacing: '-0.01em',
        marginBottom: '0.75rem',
      }}
    >
      {children}
    </h2>
  );
}

function TermsSection({
  heading,
  children,
}: {
  readonly heading: string;
  readonly children: React.ReactNode;
}) {
  return (
    <section>
      <SectionHeading>{heading}</SectionHeading>
      <div
        style={{
          fontSize: '0.9rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.8,
        }}
      >
        {children}
      </div>
    </section>
  );
}

const GOVERNING_ACTS = [
  'Limitation Act, 1963',
  'Code of Civil Procedure, 1908',
  'Karnataka Court Fees & Suits Valuation Act, 1958',
  'Karnataka Stamp Act, 1957',
  'Registration Act, 1908',
  'Code of Criminal Procedure, 1973 / Bharatiya Nagarik Suraksha Sanhita, 2023',
] as const;

export default function TermsPage() {
  return (
    <div className="py-8 px-4 md:py-16 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Use' },
          ]}
        />

        {/* Hero */}
        <div className="text-center mb-10 animate-fade-in">
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
              marginBottom: '0.75rem',
            }}
          >
            Terms of Use
          </h1>
          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '36rem',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            By using Thakkadi, you agree to the following terms.
          </p>
        </div>

        <RuleDivider />

        {/* Prominent disclaimer */}
        <div
          className="alert alert-warning"
          style={{ marginBottom: '2rem' }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ flexShrink: 0 }}
            aria-hidden="true"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <div>
            <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.25rem' }}>
              Not Legal Advice
            </strong>
            All calculations provided by Thakkadi are indicative, based on
            general provisions of law. They are NOT legal advice. Always consult
            a qualified legal professional before relying on any calculation.
          </div>
        </div>

        <TermsSection heading="No Warranty">
          <p>
            Thakkadi is provided &ldquo;as is&rdquo; without warranty of any
            kind, express or implied. While we strive for accuracy and base all
            calculations on the text of enacted legislation, results should
            always be verified independently by a qualified legal professional.
          </p>
        </TermsSection>

        <RuleDivider />

        <TermsSection heading="Governing Acts">
          <p style={{ marginBottom: '1rem' }}>
            Calculations are based on the following enacted legislation.
            Amendments, notifications, or judicial interpretation not yet
            reflected in the source code may affect the accuracy of results.
          </p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
            }}
          >
            {GOVERNING_ACTS.map((act) => (
              <li
                key={act}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.625rem 0.875rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '3px solid var(--color-accent-hover)',
                  borderRadius: '0 0.375rem 0.375rem 0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                }}
              >
                {act}
              </li>
            ))}
          </ul>
        </TermsSection>

        <RuleDivider />

        <TermsSection heading="Accuracy">
          <p>
            We base all calculations on the text of enacted legislation,
            verified against official sources including India Code, PRS India,
            and official state gazette notifications. If you find a discrepancy
            between a Thakkadi calculation and the governing statute, please{' '}
            <a
              href="https://github.com/sagrkv/Thakkadi/issues"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-accent)',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px dashed var(--color-accent)',
              }}
            >
              report it on GitHub
            </a>
            .
          </p>
        </TermsSection>

        <RuleDivider />

        <TermsSection heading="Open Source License">
          <p>
            Thakkadi is released under the{' '}
            <strong style={{ color: 'var(--color-text-primary)' }}>
              MIT License
            </strong>
            . You are free to use, copy, modify, merge, publish, distribute,
            sublicense, and sell copies of the software, subject to the
            conditions of the MIT License.
          </p>
        </TermsSection>

        <RuleDivider />

        <TermsSection heading="Limitation of Liability">
          <p>
            In no event shall the authors, contributors, or copyright holders of
            Thakkadi be liable for any claim, damages, or other liability,
            whether in an action of contract, tort, or otherwise, arising from,
            out of, or in connection with the software or the use or other
            dealings in the software. This includes, but is not limited to, any
            losses arising from reliance on calculation results without
            independent professional verification.
          </p>
        </TermsSection>

        <RuleDivider />

        <p
          style={{
            fontSize: '0.8rem',
            color: 'var(--color-text-tertiary)',
            textAlign: 'center',
          }}
        >
          Last updated: February 2026
        </p>

        {/* Back */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-sm font-medium"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {'\u2190'} Back to calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
