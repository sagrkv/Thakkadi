import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import FeedbackForm from '@/components/shared/FeedbackForm';

export const metadata: Metadata = {
  title: 'Send Feedback',
  description:
    'Report bugs, request features, or share feedback about Thakkadi legal calculators.',
};

export default function FeedbackPage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl text-white text-2xl mb-4 shadow-lg"
            style={{
              background:
                'linear-gradient(135deg, var(--color-slate-700), var(--color-slate-800))',
            }}
          >
            {'\u{1F4EC}'}
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-slate-900)',
              letterSpacing: '-0.01em',
            }}
          >
            Send Feedback
          </h1>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.9rem' }}>
            Found an issue? Have a suggestion? Let us know.
          </p>
        </div>

        {/* Form */}
        <Suspense fallback={null}>
          <FeedbackForm />
        </Suspense>

        {/* Developer link */}
        <div className="mt-6 text-center" style={{ fontSize: '0.8rem', color: 'var(--color-neutral-500)' }}>
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
            style={{ color: 'var(--color-slate-600)' }}
          >
            {'\u2190'} Back to calculators
          </Link>
        </div>
      </div>
    </div>
  );
}
