'use client';

import type { StampCategory } from '@/types/stamp-duty';
import { STAMP_CATEGORIES } from '@/lib/stamp-duty/constants/instruments';

interface StampCategorySelectorProps {
  readonly selectedCategory: StampCategory | null;
  readonly onSelect: (category: StampCategory) => void;
}

export default function StampCategorySelector({
  selectedCategory,
  onSelect,
}: StampCategorySelectorProps) {
  return (
    <div className="animate-in">
      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        Select Instrument Category
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Choose the type of document to calculate stamp duty and registration fees
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {STAMP_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            className={`stamp-category-card animate-in stagger-${Math.min(i + 1, 9)} text-left ${
              selectedCategory === cat.id ? 'selected' : ''
            }`}
            onClick={() => onSelect(cat.id)}
          >
            <div className="stamp-category-icon">{cat.icon}</div>
            <div className="stamp-category-label">{cat.label}</div>
            <div className="stamp-category-desc">{cat.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
