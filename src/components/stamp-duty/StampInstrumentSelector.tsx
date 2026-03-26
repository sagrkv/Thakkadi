'use client';

import type { StampCategory } from '@/types/stamp-duty';
import { getInstrumentsByCategory, getCategoryById } from '@/lib/stamp-duty/constants/instruments';
import SectionBadge from '@/components/ui/SectionBadge';

interface StampInstrumentSelectorProps {
  readonly category: StampCategory;
  readonly selectedInstrumentId: string | null;
  readonly onSelect: (instrumentId: string) => void;
  readonly onBack: () => void;
}

export default function StampInstrumentSelector({
  category,
  selectedInstrumentId,
  onSelect,
  onBack,
}: StampInstrumentSelectorProps) {
  const instruments = getInstrumentsByCategory(category);
  const categoryInfo = getCategoryById(category);

  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'var(--color-accent)', fontWeight: 600 }}
        aria-label="Go back to categories"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to categories
      </button>

      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}
      >
        {categoryInfo?.label ?? 'Select Instrument'}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
        Select the specific instrument type
      </p>

      <div className="flex flex-col gap-2">
        {instruments.map((inst, i) => {
          const isSelected = selectedInstrumentId === inst.id;
          return (
            <button
              key={inst.id}
              type="button"
              className={`stamp-instrument-item animate-in stagger-${Math.min(i + 1, 9)} text-left ${
                isSelected ? 'selected' : ''
              }`}
              onClick={() => onSelect(inst.id)}
            >
              <div className="stamp-instrument-radio">
                {isSelected && (
                  <span
                    style={{
                      width: '0.375rem',
                      height: '0.375rem',
                      background: 'white',
                      borderRadius: '50%',
                      display: 'block',
                    }}
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-text-primary)' }}>
                    {inst.label}
                  </span>
                  <SectionBadge section={inst.section} />
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                  {inst.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
