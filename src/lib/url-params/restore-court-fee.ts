import type { CalculatorState } from '@/types/court-fee';
import type { CourtFeeParams } from './schemas';
import { getSuitTypeById } from '@/lib/court-fee/constants/suit-categories';
import { validateSuitInputs } from '@/lib/court-fee/utils/validation';
import { calculateCourtFee } from '@/lib/court-fee/fee-engine/calculator';

/** Recalculate shared inputs; never trust a fee embedded in a URL. */
export function restoreCourtFee(params: CourtFeeParams | null): CalculatorState | null {
  if (!params?.s || !params.g) return null;
  const suit = getSuitTypeById(params.s);
  if (!suit || suit.group !== params.g) return null;
  try {
    const raw = params.v ? JSON.parse(params.v) : {};
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
    const values: Record<string, number> = {};
    for (const field of suit.inputFields) {
      if (typeof raw[field.id] !== 'number') return null;
      values[field.id] = raw[field.id];
    }
    if (validateSuitInputs(values, suit.inputFields)) return null;
    return { step: 'result', selectedGroup: suit.group, selectedSuitTypeId: suit.id,
      inputValues: values, result: calculateCourtFee({ suitTypeId: suit.id, values }), error: null };
  } catch { return null; }
}
