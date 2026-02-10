import Link from 'next/link';
import type { LegalAct } from '@/types/legal-reference';

interface ActCardProps {
  readonly act: LegalAct;
  readonly sectionCount: number;
}

const CATEGORY_STYLES: Record<LegalAct['category'], { label: string; bg: string; color: string; border: string }> = {
  central_act: {
    label: 'Central Act',
    bg: 'var(--color-slate-50)',
    color: 'var(--color-slate-700)',
    border: 'var(--color-slate-200)',
  },
  state_act: {
    label: 'State Act',
    bg: 'var(--color-teal-50)',
    color: 'var(--color-teal-700)',
    border: 'var(--color-teal-200)',
  },
  constitution: {
    label: 'Constitution',
    bg: 'var(--color-amber-50)',
    color: 'var(--color-amber-700)',
    border: 'var(--color-amber-200)',
  },
  court_rules: {
    label: 'Court Rules',
    bg: 'var(--color-gold-50)',
    color: 'var(--color-gold-700)',
    border: 'var(--color-gold-200)',
  },
};

export default function ActCard({ act, sectionCount }: ActCardProps) {
  const style = CATEGORY_STYLES[act.category];

  return (
    <Link
      href={`/laws/${act.id}`}
      className="tool-card group"
      style={{ padding: '1.5rem' }}
    >
      <div className="flex items-start justify-between mb-3">
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
            background: 'var(--color-neutral-100)',
            color: 'var(--color-neutral-600)',
          }}
        >
          {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
        </span>
      </div>
      <h3
        className="text-base font-extrabold mb-1 leading-tight"
        style={{
          fontFamily: 'var(--font-display)',
          color: 'var(--color-slate-900)',
          letterSpacing: '-0.01em',
        }}
      >
        {act.shortName}
      </h3>
      <p
        className="text-xs mb-1 font-mono"
        style={{ color: 'var(--color-neutral-500)' }}
      >
        {act.fullName}, {act.year}
      </p>
      <p
        className="text-xs mt-2 line-clamp-2"
        style={{ color: 'var(--color-neutral-600)', lineHeight: '1.5' }}
      >
        {act.description}
      </p>
    </Link>
  );
}
