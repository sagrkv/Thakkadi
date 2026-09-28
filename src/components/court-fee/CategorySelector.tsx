'use client';

import type { SuitGroup } from '@/types/court-fee';
import { SUIT_GROUPS } from '@/lib/court-fee/constants/suit-categories';

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
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        Select Suit Category
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
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
            <div
              className="category-icon"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              {group.id}
            </div>
            <div className="category-label">{group.label}</div>
            <div className="category-desc">{group.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
