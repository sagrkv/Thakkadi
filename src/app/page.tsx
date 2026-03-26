import type { Metadata } from 'next';
import Link from 'next/link';
import ToolCard from '@/components/shared/ToolCard';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/lib/blog/parser';

export const metadata: Metadata = {
  title: {
    absolute: 'Thakkadi — Free Legal Calculators for Indian Lawyers',
  },
  description:
    'Free, open-source legal calculators for Indian lawyers and litigants. Calculate limitation periods, Karnataka court fees, and stamp duty. No login, no data stored, 100% client-side.',
  alternates: {
    canonical: 'https://thakkadi.in',
  },
};

const STATS = [
  { number: '13', label: 'Acts Archived' },
  { number: '50+', label: 'Suit Types' },
  { number: '11', label: 'Court Levels' },
  { number: '24', label: 'Stamp Instruments' },
] as const;

const STEPS = [
  { title: 'Select your case', desc: 'Choose the court, case type, and legal action from our structured options.' },
  { title: 'Enter details', desc: 'Provide the judgment date, suit value, or instrument type as needed.' },
  { title: 'Get your answer', desc: 'Instant results with exact legal provisions cited and linked for verification.' },
] as const;

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="homepage-hero">
        <div className="max-w-5xl mx-auto">
          <h1 className="homepage-title animate-fade-in">Thakkadi</h1>

          <p className="homepage-subtitle animate-fade-in">
            Simplifying Indian law, one calculator at a time
          </p>

          <p
            className="animate-fade-in"
            style={{
              fontSize: '1rem',
              color: 'var(--color-text-secondary)',
              maxWidth: '36rem',
              margin: '0 auto 1.5rem',
              lineHeight: '1.6',
              textAlign: 'center',
            }}
          >
            Law shouldn&apos;t require a lawyer to understand. We build free, open-source
            tools that make legal calculations accessible to everyone.
          </p>

          <div className="homepage-trust-line animate-fade-in">
            <span>100% client-side</span>
            <span className="homepage-trust-sep" aria-hidden="true" />
            <span>No login</span>
            <span className="homepage-trust-sep" aria-hidden="true" />
            <span>Open source</span>
          </div>
        </div>
      </section>

      {/* Calculators */}
      <section className="homepage-tools">
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-5"
            style={{ color: 'var(--color-accent)', letterSpacing: '0.08em' }}
          >
            Calculators
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <ToolCard
              href="/limitation-calculator"
              icon={'\u2696\uFE0F'}
              title="Limitation Period"
              attribution="Under the Limitation Act, 1963"
              description="Calculate appeal, revision & SLP deadlines across 11 court levels with automatic date computation."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/court-fee-calculator"
              icon={'\uD83D\uDCB0'}
              title="Court Fee"
              attribution="Under the Karnataka Court Fees Act, 1958"
              description="Compute court fees for 50+ suit types across 9 categories. Includes ad valorem slabs and refund estimation."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/stamp-duty-calculator"
              icon={'\uD83D\uDCC3'}
              title="Stamp Duty"
              attribution="Under the Karnataka Stamp Act, 1957"
              description="Calculate stamp duty, registration fees, surcharge & cess for 24 instrument types. SC/ST rebate supported."
              linkText="Open Calculator"
            />
          </div>
        </div>
      </section>

      {/* Legal Library Banner */}
      <section className="homepage-tools" style={{ paddingTop: 0 }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/laws" className="library-banner">
            <span style={{ fontSize: '2rem' }} aria-hidden="true">{'\uD83D\uDCDC'}</span>
            <div style={{ flex: 1 }}>
              <h3
                className="text-base font-bold mb-0.5"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Legal Reference Library
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                13 Acts archived with verified PDFs, SHA-256 hashes, and verbatim section text.
                Every provision our calculators cite is stored and cross-linked.
              </p>
            </div>
            <span
              className="text-sm font-semibold hidden sm:block"
              style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}
            >
              Browse Library &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ padding: '2.5rem 1.5rem' }}>
        <div className="max-w-5xl mx-auto">
          <div className="stats-bar">
            {STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ padding: '2rem 1.5rem 3rem' }}>
        <div className="max-w-5xl mx-auto">
          <h2
            className="text-xs font-bold uppercase tracking-wider mb-6 text-center"
            style={{ color: 'var(--color-accent)', letterSpacing: '0.08em' }}
          >
            How It Works
          </h2>
          <div className="steps-grid">
            {STEPS.map((step, i) => (
              <div key={step.title} className="step-item">
                <div className="step-number">{i + 1}</div>
                <p className="step-title">{step.title}</p>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      {latestPosts.length > 0 && (
        <section
          style={{
            padding: '2.5rem 1.5rem 3rem',
            background: 'var(--color-surface-muted)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-accent)', letterSpacing: '0.08em' }}
              >
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="text-sm font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
