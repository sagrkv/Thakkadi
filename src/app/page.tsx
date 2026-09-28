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

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="homepage-hero">
        <div className="max-w-5xl mx-auto">
          <h1 className="homepage-title animate-fade-in">Thakkadi</h1>
          <p className="homepage-subtitle animate-fade-in">
            Free legal calculators for Indian lawyers
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
          <div className="grid md:grid-cols-3 gap-6">
            <ToolCard
              href="/limitation-calculator"
              title="Limitation Period"
              attribution="Limitation Act, 1963"
              description="Appeal, revision & SLP deadlines across 11 court levels."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/court-fee-calculator"
              title="Court Fee"
              attribution="Karnataka Court Fees Act, 1958"
              description="Ad valorem & fixed fees for 50+ suit types in 9 categories."
              linkText="Open Calculator"
            />
            <ToolCard
              href="/stamp-duty-calculator"
              title="Stamp Duty"
              attribution="Karnataka Stamp Act, 1957"
              description="Duty, registration, surcharge & cess for 24 instruments."
              linkText="Open Calculator"
            />
          </div>
        </div>
      </section>

      {/* Legal Library Banner */}
      <section className="homepage-tools" style={{ paddingTop: 0 }}>
        <div className="max-w-5xl mx-auto">
          <Link href="/laws" className="library-banner">
            <div style={{ flex: 1 }}>
              <h3
                className="text-sm font-bold"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
              >
                Legal Reference Library
              </h3>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                13 acts archived with verified PDFs and verbatim section text.
              </p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}
            >
              Browse &rarr;
            </span>
          </Link>
        </div>
      </section>

      {/* Blog Preview */}
      {latestPosts.length > 0 && (
        <section
          style={{
            padding: '2rem 1.5rem',
            background: 'var(--color-surface-muted)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: 'var(--color-text-tertiary)', letterSpacing: '0.08em' }}
              >
                From the Blog
              </h2>
              <Link
                href="/blog"
                className="text-xs font-semibold"
                style={{ color: 'var(--color-accent)' }}
              >
                All posts &rarr;
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {latestPosts.map((post) => (
                <BlogCard key={post.slug} post={post} compact />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
