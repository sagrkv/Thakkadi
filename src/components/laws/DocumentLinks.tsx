import type { ActDocument } from '@/types/legal-reference';
import ProvenanceBadge from './ProvenanceBadge';

interface DocumentLinksProps {
  readonly documents: readonly ActDocument[];
}

export default function DocumentLinks({ documents }: DocumentLinksProps) {
  if (documents.length === 0) return null;

  return (
    <div
      className="rounded-lg p-4 mt-4"
      style={{
        background: 'var(--color-surface-muted)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h3
        className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5"
        style={{ color: 'var(--color-accent)' }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
        </svg>
        Archived Documents
      </h3>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc.provenance.filePath}
            className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={doc.provenance.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded transition-colors"
                style={{
                  background: 'var(--color-accent)',
                  color: '#ffffff',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {doc.label}
              </a>

              {doc.provenance.sourceUrl && (
                <a
                  href={doc.provenance.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors"
                  style={{
                    color: 'var(--color-text-secondary)',
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-surface)',
                  }}
                  title="View on official source"
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  Official Source
                </a>
              )}
            </div>

            <ProvenanceBadge provenance={doc.provenance} />
          </div>
        ))}
      </div>

      <details className="mt-3">
        <summary
          className="text-xs cursor-pointer select-none"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          How to verify integrity
        </summary>
        <p
          className="text-xs mt-1.5 leading-relaxed"
          style={{ color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}
        >
          Download the same document from the official source and compare SHA-256 hashes.
          On macOS/Linux:{' '}
          <code
            className="px-1 py-0.5 rounded text-xs"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
            }}
          >
            shasum -a 256 filename.pdf
          </code>
        </p>
      </details>
    </div>
  );
}
