'use client';

import type { SuitGroup } from '@/types/court-fee';
import { getSuitTypesByGroup, SUIT_GROUPS } from '@/lib/court-fee/constants/suit-categories';
import SectionBadge from '@/components/ui/SectionBadge';

interface SuitTypeSelectorProps {
  readonly group: SuitGroup;
  readonly selectedSuitTypeId: string | null;
  readonly onSelect: (suitTypeId: string) => void;
  readonly onBack: () => void;
}

export default function SuitTypeSelector({
  group,
  selectedSuitTypeId,
  onSelect,
  onBack,
}: SuitTypeSelectorProps) {
  const suitTypes = getSuitTypesByGroup(group);
  const groupInfo = SUIT_GROUPS.find((g) => g.id === group);

  return (
    <div className="animate-in">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm mb-4 cursor-pointer hover:opacity-80 transition-opacity"
        style={{ color: 'var(--color-teal-700)', fontWeight: 600 }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Back to categories
      </button>

      <h2
        className="text-lg font-semibold mb-1"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink-800)' }}
      >
        {groupInfo?.label ?? `Group ${group}`}
      </h2>
      <p className="text-sm mb-4" style={{ color: 'var(--color-ink-400)' }}>
        Select the specific suit type
      </p>

      <div className="flex flex-col gap-2">
        {suitTypes.map((st, i) => {
          const isSelected = selectedSuitTypeId === st.id;
          return (
            <button
              key={st.id}
              type="button"
              className={`suit-type-item animate-in stagger-${Math.min(i + 1, 9)} text-left ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(st.id)}
            >
              <div className="suit-type-radio">
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
                  <span className="font-semibold text-sm" style={{ color: 'var(--color-ink-800)' }}>
                    {st.label}
                  </span>
                  <SectionBadge section={st.section} />
                </div>
                <p className="text-xs mt-0.5" style={{ color: 'var(--color-ink-400)' }}>
                  {st.valueBasis}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
