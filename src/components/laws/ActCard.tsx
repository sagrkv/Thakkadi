import Link from 'next/link';
import type { LegalAct } from '@/types/legal-reference';

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
  const sectionLabel = sectionCount === 0
    ? 'PDF only'
    : `${sectionCount} ${sectionCount === 1 ? 'section' : 'sections'}`;

  return (
    <Link
      href={`/laws/${act.id}`}
      className="library-card group"
    >
      <div className="flex items-start justify-between mb-2">
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
        <span
          className="text-xs font-semibold px-1.5 py-0.5 rounded"
          style={{
            background: 'var(--color-accent-light)',
            color: 'var(--color-accent)',
          }}
        >
          {sectionLabel}
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
        className="text-xs"
        style={{ color: 'var(--color-text-tertiary)' }}
      >
        {act.fullName}, {act.year}
      </p>
    </Link>
  );
}
