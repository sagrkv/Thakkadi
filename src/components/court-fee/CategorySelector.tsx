'use client';

import type { SuitGroup } from '@/types/court-fee';
import { SUIT_GROUPS } from '@/lib/court-fee/constants/suit-categories';

const GROUP_ICONS: Record<string, string> = {
  A: '\u20B9', // ₹
  B: '\u2302', // ⌂
  C: '\u2261', // ≡
  D: '\u2611', // ☑
  E: '\u2605', // ★
  F: '\u00A7', // §
  G: '\u2696', // ⚖
  H: '\u2706', // ✆ (substitute for scroll)
  I: '\u2694', // ⚔
};

interface CategorySelectorProps {
  readonly selectedGroup: SuitGroup | null;
  readonly onSelect: (group: SuitGroup) => void;
}

export default function CategorySelector({
  selectedGroup,
  onSelect,
}: CategorySelectorProps) {
  return (
    <div className="animate-in">
      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-800)' }}
      >
        Select Suit Category
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-ink-400)' }}>
        Choose the type of suit or petition to calculate the court fee
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {SUIT_GROUPS.map((group, i) => (
          <button
            key={group.id}
            type="button"
            className={`category-card animate-in stagger-${Math.min(i + 1, 9)} text-left ${selectedGroup === group.id ? 'selected' : ''}`}
            onClick={() => onSelect(group.id)}
          >
            <div className="category-icon">
              {GROUP_ICONS[group.id] ?? group.id}
            </div>
            <div className="category-label">{group.label}</div>
            <div className="category-desc">{group.description}</div>
            <div className="mt-2">
              <span
                className="inline-block text-xs font-semibold px-1.5 py-0.5 rounded"
                style={{
                  background: 'var(--color-parchment-100)',
                  color: 'var(--color-ink-500)',
                }}
              >
                Group {group.id}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
