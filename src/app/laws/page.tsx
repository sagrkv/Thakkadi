import type { Metadata } from 'next';
import { LEGAL_ACTS, getSectionsForAct } from '@/data/laws';
import ActCard from '@/components/laws/ActCard';
import LawsSearch from '@/components/laws/LawsSearch';
import LawsDisclaimer from '@/components/laws/LawsDisclaimer';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Legal Reference Library',
  description:
    'Browse the verbatim text of Indian legal provisions referenced by Thakkadi calculators. Covers the Limitation Act, CPC, CrPC, Constitution, SC Rules, and Karnataka Court Fees Act.',
  alternates: {
    canonical: '/laws',
  },
};

export default function LawsIndexPage() {
  return (
    <div className="py-10 px-4 md:py-14 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Legal Library' },
          ]}
        />

        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
              style={{
                background: 'var(--color-surface-muted)',
                color: 'var(--color-accent)',
              }}
            >
              {'\u{1F4DC}'}
            </span>
            <div>
              <h1
                className="text-2xl md:text-3xl font-extrabold"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                Legal Reference Library
              </h1>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                Verbatim provisions referenced by Thakkadi calculators
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <LawsSearch />

        {/* Acts Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {LEGAL_ACTS.map((act) => {
            const sections = getSectionsForAct(act.id);
            return (
              <ActCard
                key={act.id}
                act={act}
                sectionCount={sections.length}
              />
            );
          })}
        </div>

        {/* Disclaimer */}
        <LawsDisclaimer />
      </div>
    </div>
  );
}
