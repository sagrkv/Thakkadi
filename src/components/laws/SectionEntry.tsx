import type { LegalSection } from '@/types/legal-reference';
import { sectionAnchor } from '@/lib/legal-reference/url-builder';
import { sectionTypeLabel } from '@/lib/legal-reference/section-utils';

interface SectionEntryProps {
  readonly section: LegalSection;
}

export default function SectionEntry({ section }: SectionEntryProps) {
  const anchor = sectionAnchor(section.id);

  return (
    <details
      id={anchor}
      className="law-section-details law-section-anchor"
    >
      <summary className="law-section-summary">
        <span
          className="text-xs font-bold px-2 py-0.5 rounded flex-shrink-0"
          style={{
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {sectionTypeLabel(section.sectionType)} {section.number}
        </span>
        <span
          className="law-section-summary-title text-sm font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          {section.title}
        </span>
      </summary>

      <div className="law-section-body">
        {/* Summary + external link */}
        {section.summary && (
          <p
            className="text-sm mb-3 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {section.summary}
          </p>
        )}
        {(section.localDocumentPath || section.externalUrl) && (
          <div className="mb-3 flex items-center gap-2 flex-wrap">
            {section.localDocumentPath && (
              <a
                href={`${section.localDocumentPath}${section.localDocumentPage ? `#page=${section.localDocumentPage}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors"
                style={{
                  background: 'var(--color-accent)',
                  color: '#ffffff',
                }}
                title="View archived local copy"
                aria-label="View archived local copy"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                View Local
              </a>
            )}
            {section.externalUrl && (
              <a
                href={section.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors"
                style={{
                  color: 'var(--color-text-secondary)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface-muted)',
                }}
                title="Verify on external source"
                aria-label="Verify on external source"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                Verify
              </a>
            )}
          </div>
        )}

        {/* Full legal text */}
        <div
          className="law-section-text rounded-lg p-4"
          style={{
            background: 'var(--color-surface-muted)',
            border: '1px solid var(--color-border)',
            borderLeft: '3px solid var(--color-accent)',
          }}
        >
          <p
            className="text-xs font-semibold mb-2 uppercase tracking-wider"
            style={{ color: 'var(--color-accent)' }}
          >
            Legal Text
          </p>
          <div
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-body)',
              lineHeight: '1.8',
            }}
          >
            {section.fullText}
          </div>
        </div>
      </div>
    </details>
  );
}
