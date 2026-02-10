import type { LegalSection } from '@/types/legal-reference';

/** Full label for a section type: "Article", "Section", etc. */
export function sectionTypeLabel(type: LegalSection['sectionType']): string {
  const labels: Record<LegalSection['sectionType'], string> = {
    article: 'Article',
    section: 'Section',
    order: 'Order',
    rule: 'Rule',
    schedule: 'Schedule',
  };
  return labels[type];
}

/** Abbreviated label for a section type: "Art.", "Sec.", etc. */
export function sectionTypeAbbrev(type: LegalSection['sectionType']): string {
  const abbrevs: Record<LegalSection['sectionType'], string> = {
    article: 'Art.',
    section: 'Sec.',
    order: 'Ord.',
    rule: 'R.',
    schedule: 'Sch.',
  };
  return abbrevs[type];
}
