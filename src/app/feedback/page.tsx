import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import FeedbackForm from '@/components/shared/FeedbackForm';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Send Feedback',
  description:
    'Report bugs, request features, or share feedback about Thakkadi legal calculators.',
  alternates: {
    canonical: '/feedback',
  },
};

export default function FeedbackPage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-lg mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Feedback' },
          ]}
        />

        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl mb-4 shadow-lg"
            style={{
              background: 'var(--color-accent)',
              color: 'var(--color-bg)',
            }}
          >
            {'\u{1F4EC}'}
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
            }}
          >
            Send Feedback
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
            Found an issue? Have a suggestion? Let us know.
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={null}>
          <FeedbackForm />
        </Suspense>

        {/* Developer link */}
        <div className="mt-6 text-center" style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
          <p>
            Developer?{' '}
            <a
              href="https://github.com/sagrkv/Thakkadi/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="feedback-dev-link"
            >
              Open an issue on GitHub
            </a>
          </p>
        </div>

        {/* Back */}
        <div className="mt-4 text-center">
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
