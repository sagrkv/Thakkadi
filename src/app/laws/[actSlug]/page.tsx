import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getActBySlug, getSectionsForAct, getAllActSlugs } from '@/data/laws';
import { sectionAnchor } from '@/lib/legal-reference/url-builder';
import { sectionTypeAbbrev } from '@/lib/legal-reference/section-utils';
import SectionEntry from '@/components/laws/SectionEntry';
import LawsDisclaimer from '@/components/laws/LawsDisclaimer';

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
    title: `${act.shortName} | Legal Library | Thakkadi`,
    description: `${act.fullName} — browse verbatim legal text of provisions referenced by Thakkadi calculators.`,
  };
}

export default async function ActPage({ params }: PageProps) {
  const { actSlug } = await params;
  const act = getActBySlug(actSlug);
  if (!act) notFound();

  const sections = getSectionsForAct(act.id);

  const CATEGORY_LABELS: Record<string, string> = {
    central_act: 'Central Act',
    state_act: 'State Act',
    constitution: 'Constitution',
    court_rules: 'Court Rules',
  };

  return (
    <div className="py-10 px-4 md:py-14 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="breadcrumb mb-6">
          <Link href="/laws" className="breadcrumb-item">Legal Library</Link>
          <span className="breadcrumb-sep">{'\u203A'}</span>
          <span className="breadcrumb-active">{act.shortName}</span>
        </nav>

        {/* Act Header */}
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded uppercase tracking-wider"
              style={{
                background: 'var(--color-slate-100)',
                color: 'var(--color-slate-600)',
              }}
            >
              {CATEGORY_LABELS[act.category] ?? act.category}
            </span>
            <span
              className="text-xs font-mono"
              style={{ color: 'var(--color-neutral-500)' }}
            >
              Last verified: {act.lastVerified}
            </span>
          </div>
          <h1
            className="text-2xl md:text-3xl font-extrabold mb-1"
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-slate-900)',
              letterSpacing: '-0.02em',
            }}
          >
            {act.fullName}
          </h1>
          <p
            className="text-sm mb-4"
            style={{ color: 'var(--color-neutral-600)', lineHeight: '1.6' }}
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
        </div>

        {/* Table of Contents */}
        {sections.length > 3 && (
          <div
            className="card p-4 mb-8"
            style={{ background: 'var(--color-neutral-50)' }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: 'var(--color-slate-600)' }}
            >
              Contents ({sections.length} provisions)
            </p>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${sectionAnchor(s.id)}`}
                  className="text-xs py-1 flex items-center gap-1.5 transition-colors"
                  style={{
                    color: 'var(--color-slate-600)',
                    textDecoration: 'none',
                  }}
                >
                  <span
                    className="font-mono font-semibold flex-shrink-0"
                    style={{ color: 'var(--color-gold-600)', minWidth: '3.5rem' }}
                  >
                    {sectionTypeAbbrev(s.sectionType)} {s.number}
                  </span>
                  <span className="truncate">{s.title}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-5">
          {sections.map((section) => (
            <SectionEntry key={section.id} section={section} />
          ))}
        </div>

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
