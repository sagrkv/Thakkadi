import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActBySlug, getSectionsForAct, getAllActSlugs, getDocumentsForAct } from '@/data/laws';
import SectionEntry from '@/components/laws/SectionEntry';
import HashAutoExpand from '@/components/laws/HashAutoExpand';
import LawsDisclaimer from '@/components/laws/LawsDisclaimer';
import DocumentLinks from '@/components/laws/DocumentLinks';
import Breadcrumbs from '@/components/shared/Breadcrumbs';

interface PageProps {
  params: Promise<{ actSlug: string }>;
}

export async function generateStaticParams() {
  return getAllActSlugs().map((slug) => ({ actSlug: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { actSlug } = await params;
  const act = getActBySlug(actSlug);
  if (!act) return { title: 'Not Found | Thakkadi' };

  return {
    title: `${act.shortName} — Legal Library`,
    description: `${act.fullName} — browse verbatim legal text of provisions referenced by Thakkadi calculators.`,
    alternates: {
      canonical: `/laws/${actSlug}`,
    },
  };
}

export default async function ActPage({ params }: PageProps) {
  const { actSlug } = await params;
  const act = getActBySlug(actSlug);
  if (!act) notFound();

  const sections = getSectionsForAct(act.id);
  const documents = getDocumentsForAct(act.id);

  const CATEGORY_LABELS: Record<string, string> = {
    central_act: 'Central Act',
    state_act: 'State Act',
    constitution: 'Constitution',
    court_rules: 'Court Rules',
  };

  return (
    <div className="py-10 px-4 md:py-14 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Legal Library', href: '/laws' },
            { label: act.shortName },
          ]}
        />

        {/* Act Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{
                background: 'var(--color-surface-muted)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {CATEGORY_LABELS[act.category] ?? act.category}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              Last verified: {act.lastVerified}
            </span>
          </div>
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-1"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.02em',
            }}
          >
            {act.fullName}
          </h1>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6' }}
          >
            {act.description}
          </p>

          {/* External links */}
          {act.externalLinks.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {act.externalLinks.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rules-link"
                  style={{ fontSize: '0.75rem' }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Archived documents */}
          <DocumentLinks documents={documents} />
        </div>

        {/* Section count header */}
        <p
          className="text-xs font-bold uppercase tracking-wider mb-3"
          style={{ color: 'var(--color-accent)' }}
        >
          {sections.length} {sections.length === 1 ? 'provision' : 'provisions'}
        </p>

        {/* Sections (collapsible — each section IS a TOC entry) */}
        <div>
          {sections.map((section) => (
            <SectionEntry key={section.id} section={section} />
          ))}
        </div>

        <HashAutoExpand />

        {/* Disclaimer */}
        <LawsDisclaimer />

        {/* Back to library */}
        <div className="mt-6 text-center">
          <Link href="/laws" className="rules-link">
            {'\u2190'} Back to Legal Library
          </Link>
        </div>
      </div>
    </div>
  );
}
