import type { LegalAct, LegalSection } from '@/types/legal-reference';
import { LEGAL_ACTS } from './acts';
import { LIMITATION_ACT_SECTIONS } from './limitation-act-1963';
import { CPC_SECTIONS } from './cpc-1908';
import { CRPC_SECTIONS } from './crpc-1973';
import { CONSTITUTION_SECTIONS } from './constitution';
import { SC_RULES_SECTIONS } from './sc-rules-2013';
import { KARNATAKA_COURT_FEES_SECTIONS } from './karnataka-court-fees-1958';

export { LEGAL_ACTS } from './acts';
export { LIMITATION_ACT_SECTIONS } from './limitation-act-1963';
export { CPC_SECTIONS } from './cpc-1908';
export { CRPC_SECTIONS } from './crpc-1973';
export { CONSTITUTION_SECTIONS } from './constitution';
export { SC_RULES_SECTIONS } from './sc-rules-2013';
export { KARNATAKA_COURT_FEES_SECTIONS } from './karnataka-court-fees-1958';

/** All sections across all acts */
export const ALL_SECTIONS: readonly LegalSection[] = [
  ...LIMITATION_ACT_SECTIONS,
  ...CPC_SECTIONS,
  ...CRPC_SECTIONS,
  ...CONSTITUTION_SECTIONS,
  ...SC_RULES_SECTIONS,
  ...KARNATAKA_COURT_FEES_SECTIONS,
] as const;

/** Map of actId → LegalAct */
const actsById = new Map<string, LegalAct>(
  LEGAL_ACTS.map((act) => [act.id, act])
);

/** Map of sectionId → LegalSection */
const sectionsById = new Map<string, LegalSection>(
  ALL_SECTIONS.map((s) => [s.id, s])
);

/** Map of actId → LegalSection[] */
const sectionsByAct = new Map<string, readonly LegalSection[]>();
for (const act of LEGAL_ACTS) {
  sectionsByAct.set(
    act.id,
    ALL_SECTIONS.filter((s) => s.actId === act.id)
  );
}

export function getActById(actId: string): LegalAct | undefined {
  return actsById.get(actId);
}

export function getSectionById(sectionId: string): LegalSection | undefined {
  return sectionsById.get(sectionId);
}

export function getSectionsForAct(actId: string): readonly LegalSection[] {
  return sectionsByAct.get(actId) ?? [];
}

export function getActBySlug(slug: string): LegalAct | undefined {
  return LEGAL_ACTS.find((act) => act.id === slug);
}

export function getAllActSlugs(): string[] {
  return LEGAL_ACTS.map((act) => act.id);
}
