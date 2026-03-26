import Link from 'next/link';
import type { LegalAct } from '@/types/legal-reference';
import { getDocumentsForAct } from '@/data/laws/documents-manifest';

interface ActCardProps {
  readonly act: LegalAct;
  readonly sectionCount: number;
}

const CATEGORY_STYLES: Record<LegalAct['category'], { label: string; bg: string; color: string; border: string }> = {
  central_act: {
    label: 'Central Act',
    bg: 'var(--color-surface-muted)',
    color: 'var(--color-text-secondary)',
    border: 'var(--color-border)',
  },
  state_act: {
    label: 'State Act',
    bg: 'var(--color-accent-light)',
    color: 'var(--color-accent)',
    border: 'var(--color-accent-muted)',
  },
  constitution: {
    label: 'Constitution',
    bg: 'var(--color-accent-light)',
    color: 'var(--color-accent)',
    border: 'var(--color-accent-muted)',
  },
  court_rules: {
    label: 'Court Rules',
    bg: 'var(--color-accent-light)',
    color: 'var(--color-accent)',
    border: 'var(--color-accent-muted)',
  },
};

export default function ActCard({ act, sectionCount }: ActCardProps) {
  const style = CATEGORY_STYLES[act.category];
  const hasDocuments = getDocumentsForAct(act.id).length > 0;

  return (
    <Link
      href={`/laws/${act.id}`}
      className="library-card group"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{
              background: style.bg,
              color: style.color,
              border: `1px solid ${style.border}`,
              letterSpacing: '0.03em',
            }}
          >
            {style.label}
          </span>
          {hasDocuments && (
            <span
              className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded"
              style={{
                background: 'var(--color-surface-muted)',
                color: 'var(--color-success)',
                border: '1px solid var(--color-border)',
              }}
              title="Local copy archived"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Archived
            </span>
          )}
        </div>
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded"
          style={{
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
          }}
        >
          {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
        </span>
      </div>
      <h3
        className="text-base font-extrabold mb-0.5 leading-tight"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
        }}
      >
        {act.shortName}
      </h3>
      <p
        className="text-xs font-mono"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {act.fullName}, {act.year}
      </p>
    </Link>
  );
}
