import Link from 'next/link';
import LimitationRulesView from '@/components/limitation/RulesView';
import Disclaimer from '@/components/shared/Disclaimer';

import type { Metadata } from 'next';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Limitation Rules Reference',
  description: 'Complete reference of Indian limitation periods for civil, criminal, and writ cases across all court levels.',
  alternates: {
    canonical: '/limitation-calculator/rules',
  },
};

export default function LimitationRulesPage() {
  return (
    <div className="py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-5xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Limitation Calculator', href: '/limitation-calculator' },
            { label: 'Rules' },
          ]}
        />

        {/* Page header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md"
              style={{
                background: 'var(--color-surface-muted)',
                color: 'var(--color-accent)',
              }}
            >
              {'\u2696'}
            </div>
            <div>
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Limitation Rules Reference
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                All post-judgment limitation periods under Indian law
              </p>
            </div>
          </div>
        </div>

        {/* Rules content */}
        <div className="animate-in">
          <LimitationRulesView />
        </div>

        {/* Disclaimer */}
        <div className="mt-10">
          <Disclaimer />
        </div>

        {/* Source info */}
        <div className="text-center text-sm mt-6" style={{ color: 'var(--color-text-secondary)' }}>
          <p>
            <span className="font-medium">Sources:</span> The Limitation Act, 1963 {'\u2022'} CPC {'\u2022'} CrPC {'\u2022'} Supreme Court Rules, 2013
          </p>
        </div>
      </div>
    </div>
  );
}
