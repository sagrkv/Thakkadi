import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Thakkadi privacy policy. No data collection, no cookies, no accounts. 100% client-side processing.',
  alternates: { canonical: 'https://thakkadi.in/privacy' },
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

function PolicySection({
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

export default function PrivacyPage() {
  return (
    <div className="content-page reading-page">
      <div className="max-w-3xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' },
          ]}
        />

        {/* Hero */}
        <div className="content-heading">
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
            Privacy Policy
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
            Your privacy is not just respected — it is structurally guaranteed.
          </p>
        </div>



        {/* TL;DR */}
        <div
          className="disclaimer"
          style={{ marginBottom: '2rem' }}
        >
          <strong>TL;DR</strong> — Thakkadi collects no personal data, stores no
          cookies, and requires no accounts. Every calculation runs in your
          browser. We cannot see your inputs even if we wanted to.
        </div>

        <PolicySection heading="No Data Collection">
          <p>
            Thakkadi is 100% client-side. All calculations execute entirely
            within your browser using JavaScript. No personal data is processed
            on any server. No inputs are transmitted, logged, or stored anywhere
            outside your device.
          </p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="No Cookies">
          <p>
            Thakkadi does not set any cookies — no tracking cookies, no session
            cookies, no cookies of any kind. Cloudflare Web Analytics and
            Umami operate without cookies.
          </p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="No Accounts">
          <p>
            There is no registration, no login, and no user accounts. We do not
            collect names, email addresses, or any personal information.
          </p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="URL Sharing">
          <p>
            When you share a calculator result, the calculation parameters are
            encoded in the URL. Anyone with the link can see those parameters.
            This is by design — it allows you to share results with colleagues.
            No data beyond what is visible in the URL is transmitted.
          </p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="Feedback on GitHub">
          <p>The feedback form prepares an issue draft in your browser. Opening the draft sends its contents to GitHub. A GitHub account is required to submit, and submitted issues are public. Do not include personal information or confidential case details.</p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="Third-Party Services">
          <p>
            We use Cloudflare Web Analytics to measure page visits and site
            performance without cookies. Umami also measures page visits during
            the transition to Cloudflare. Calculator inputs and results are not
            included in analytics events. Your browser loads the analytics
            scripts and sends usage metrics to these providers.
          </p>
        </PolicySection>

        <RuleDivider />

        <PolicySection heading="Open Source Verification">
          <p>
            Every privacy claim on this page can be independently verified by
            reading the source code. Thakkadi is fully open source.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <a
              href="https://github.com/sagrkv/Thakkadi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--color-accent)',
                fontWeight: 600,
                textDecoration: 'none',
                borderBottom: '1px dashed var(--color-accent)',
              }}
            >
              View source on GitHub
            </a>
          </p>
        </PolicySection>

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
