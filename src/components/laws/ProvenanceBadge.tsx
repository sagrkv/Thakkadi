import type { DocumentProvenance } from '@/types/legal-reference';

interface ProvenanceBadgeProps {
  readonly provenance: DocumentProvenance;
}

export default function ProvenanceBadge({ provenance }: ProvenanceBadgeProps) {
  if (!provenance.downloadedAt || !provenance.sha256) return null;

  const truncatedHash = provenance.sha256.slice(0, 12);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs px-2 py-0.5 rounded"
      style={{
        background: 'var(--color-surface-muted)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-tertiary)',
      }}
      title={`SHA-256: ${provenance.sha256}\nDownloaded: ${provenance.downloadedAt}\nSource: ${provenance.sourceUrl}`}
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
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem' }}>
        {truncatedHash}
      </span>
      <span style={{ color: 'var(--color-border-strong)' }}>|</span>
      <span>{provenance.downloadedAt}</span>
    </span>
  );
}
