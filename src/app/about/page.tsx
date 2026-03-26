import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Thakkadi — free, open-source legal calculators for Indian lawyers. 100% client-side, no data stored.',
  alternates: { canonical: 'https://thakkadi.in/about' },
};

function RuleDivider() {
  return <div className="rule-divider" style={{ margin: '2.5rem 0' }} />;
}

function SectionHeading({ children }: { readonly children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-accent)',
        letterSpacing: '-0.01em',
        marginBottom: '1rem',
      }}
    >
      {children}
    </h2>
  );
}

function PhilosophyItem({
  icon,
  title,
  description,
}: {
  readonly icon: string;
  readonly title: string;
  readonly description: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '0.5rem',
          background: 'var(--color-surface-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.1rem',
          color: 'var(--color-accent)',
          border: '1px solid var(--color-border)',
        }}
      >
        {icon}
      </span>
      <div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: '0.25rem',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

const GOVERNING_LAWS = [
  { name: 'Limitation Act, 1963', scope: 'All India' },
  { name: 'Code of Civil Procedure, 1908', scope: 'All India' },
  { name: 'Karnataka Court Fees & Suits Valuation Act, 1958', scope: 'Karnataka' },
  { name: 'Karnataka Stamp Act, 1957', scope: 'Karnataka' },
  { name: 'Registration Act, 1908', scope: 'All India' },
  { name: 'CrPC 1973 / BNSS 2023', scope: 'All India' },
] as const;

export default function AboutPage() {
  return (
    <div className="py-8 px-4 md:py-16 md:px-8">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'About' },
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
            About Thakkadi
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
            Free, open-source legal tools for the Indian legal community.
          </p>
        </div>

        <RuleDivider />

        {/* Mission */}
        <section>
          <SectionHeading>Mission</SectionHeading>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
            }}
          >
            Every calculation on Thakkadi is deterministic — no AI, no
            hallucinations, just statute-based computation. We build pure
            rule-based engines that compute directly from the text of enacted
            legislation, so every result is verifiable and reproducible.
          </p>
        </section>

        <RuleDivider />

        {/* Philosophy */}
        <section>
          <SectionHeading>Philosophy</SectionHeading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <PhilosophyItem
              icon={'\u{1F6E1}'}
              title="100% Client-Side"
              description="Every calculation runs entirely in your browser. No server calls, no round-trips, no latency. Your inputs never leave your device."
            />
            <PhilosophyItem
              icon={'\u{1F6AB}'}
              title="No Data Collection"
              description="Zero cookies, zero tracking accounts, zero personal data stored. We don't know who you are, and we prefer it that way."
            />
            <PhilosophyItem
              icon={'\u{1F4DC}'}
              title="Open Source"
              description="Every formula, every slab table, every calculation path is open for inspection. Verify every result against the source code and the governing statute."
            />
          </div>
        </section>

        <RuleDivider />

        {/* Governing Laws */}
        <section>
          <SectionHeading>Governing Laws</SectionHeading>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              marginBottom: '1.25rem',
            }}
          >
            All calculators are based on the following enacted legislation:
          </p>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {GOVERNING_LAWS.map((law) => (
              <div
                key={law.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '0.75rem 1rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderLeft: '3px solid var(--color-accent-hover)',
                  borderRadius: '0 0.375rem 0.375rem 0',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {law.name}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--color-accent)',
                    background: 'var(--color-accent-light)',
                    border: '1px solid var(--color-accent-muted)',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '999px',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.03em',
                  }}
                >
                  {law.scope}
                </span>
              </div>
            ))}
          </div>
        </section>

        <RuleDivider />

        {/* Open Source */}
        <section>
          <SectionHeading>Open Source</SectionHeading>
          <p
            style={{
              fontSize: '0.95rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              marginBottom: '1.25rem',
            }}
          >
            Thakkadi is released under the MIT license. You are free to use,
            modify, and distribute the code. Found a discrepancy? Open an issue
            or submit a pull request.
          </p>
          <a
            href="https://github.com/sagrkv/Thakkadi"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ textDecoration: 'none' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </section>

        {/* Back */}
        <div className="mt-10 text-center">
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
