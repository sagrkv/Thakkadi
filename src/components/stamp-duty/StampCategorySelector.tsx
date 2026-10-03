'use client';

import ToolIcon, { type ToolKind } from '@/components/shared/ToolIcon';
import type { StampCategory } from '@/types/stamp-duty';
import { STAMP_CATEGORIES } from '@/lib/stamp-duty/constants/instruments';

const CATEGORY_ICONS: Record<StampCategory, ToolKind> = { conveyance: 'home', gift_release: 'document', mortgage: 'court', lease: 'document', power_of_attorney: 'scales', partition: 'home', trust_will: 'library', miscellaneous: 'document' };

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

      <div className="category-choice-grid">
        {STAMP_CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            type="button"
            className={`stamp-category-card animate-in stagger-${Math.min(i + 1, 9)} text-left ${
              selectedCategory === cat.id ? 'selected' : ''
            }`}
            onClick={() => onSelect(cat.id)}
          >
            <div className="stamp-category-icon"><ToolIcon kind={CATEGORY_ICONS[cat.id]} /></div>
            <div className="stamp-category-label">{cat.label}</div>
            <div className="stamp-category-desc">{cat.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
