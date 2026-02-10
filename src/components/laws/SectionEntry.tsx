import type { LegalSection } from '@/types/legal-reference';
import { sectionAnchor } from '@/lib/legal-reference/url-builder';
import { sectionTypeAbbrev, sectionTypeLabel } from '@/lib/legal-reference/section-utils';

interface SectionEntryProps {
  readonly section: LegalSection;
}

export default function SectionEntry({ section }: SectionEntryProps) {
  const anchor = sectionAnchor(section.id);

  return (
    <div
      id={anchor}
      className="law-section-anchor"
      style={{ scrollMarginTop: '6rem' }}
    >
      <div
        className="card p-5 md:p-6"
        style={{
          borderLeft: '3px solid var(--color-slate-400)',
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded"
              style={{
                background: 'var(--color-slate-100)',
                color: 'var(--color-slate-700)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              {sectionTypeLabel(section.sectionType)} {section.number}
            </span>
            <h3
              className="text-sm font-bold"
              style={{ color: 'var(--color-slate-900)', fontFamily: 'var(--font-display)' }}
            >
              {section.title}
            </h3>
          </div>
          {section.externalUrl && (
            <a
              href={section.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-xs font-semibold flex items-center gap-1 px-2 py-1 rounded transition-colors"
              style={{
                color: 'var(--color-slate-600)',
                border: '1px solid var(--color-slate-200)',
                background: 'white',
              }}
              title="Verify on external source"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span className="hidden sm:inline">Verify</span>
            </a>
          )}
        </div>

        {/* Summary */}
        {section.summary && (
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'var(--color-neutral-600)' }}
          >
            {section.summary}
          </p>
        )}

        {/* Full legal text */}
        <div
          className="law-section-text rounded-lg p-4"
          style={{
            background: 'var(--color-parchment-50)',
            border: '1px solid var(--color-parchment-200)',
            borderLeft: '3px solid var(--color-gold-400)',
          }}
        >
          <p
            className="text-xs font-semibold mb-2 uppercase tracking-wider"
            style={{ color: 'var(--color-gold-600)' }}
          >
            Legal Text
          </p>
          <div
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{
              color: 'var(--color-ink-700)',
              fontFamily: 'var(--font-body)',
            }}
          >
            {section.fullText}
          </div>
        </div>
      </div>
    </div>
  );
}
