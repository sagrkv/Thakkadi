import type { CalculatorInput, FeeResult, BreakdownStep } from '@/types/court-fee';
import { getSuitTypeById } from '@/lib/court-fee/constants/suit-categories';
import { computeAdValoremFee } from './ad-valorem';
import { lookupFixedTieredFee } from './fixed-fees';
import { computeProbateFee } from './probate-fees';
import { formatIndianCurrency } from '@/lib/court-fee/utils/format-currency';

/**
 * Main entry point: calculate court fee for any suit type.
 */
export function calculateCourtFee(input: CalculatorInput): FeeResult {
  const suitType = getSuitTypeById(input.suitTypeId);
  if (!suitType) {
    throw new Error(`Unknown suit type: ${input.suitTypeId}`);
  }

  const breakdown: BreakdownStep[] = [];

  // ── Step 1: Resolve the effective value from inputs ──────────────────────

  let effectiveValue = resolveValue(input, suitType.comparison);
  breakdown.push({ label: 'Suit Type', value: suitType.label });
  breakdown.push({ label: 'Section', value: suitType.section });

  // ── Step 2: Handle exempt suits ──────────────────────────────────────────

  if (suitType.feeMethod === 'exempt') {
    breakdown.push({ label: 'Fee', value: 'Exempt — No court fee payable' });
    return {
      fee: 0,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue: 0,
      breakdown,
      isExempt: true,
    };
  }

  // ── Step 3: Handle fixed fee suits ───────────────────────────────────────

  if (suitType.feeMethod === 'fixed') {
    const fee = suitType.fixedAmount ?? 0;
    breakdown.push({ label: 'Fee Type', value: 'Fixed fee' });
    breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(fee) });
    return {
      fee,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue: 0,
      breakdown,
      isExempt: false,
    };
  }

  // ── Step 4: Handle fixed tiered fee suits ────────────────────────────────

  if (suitType.feeMethod === 'fixed_tiered') {
    if (!suitType.fixedTiers) {
      throw new Error(`No fixed tiers defined for ${suitType.id}`);
    }
    breakdown.push({ label: 'Value Entered', value: formatIndianCurrency(effectiveValue) });
    const { fee, tierDescription } = lookupFixedTieredFee(effectiveValue, suitType.fixedTiers);
    breakdown.push({ label: 'Applicable Tier', value: tierDescription });
    breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(fee) });
    return {
      fee,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue,
      breakdown,
      isExempt: false,
    };
  }

  // ── Step 5: Handle probate ───────────────────────────────────────────────

  if (suitType.feeMethod === 'probate') {
    breakdown.push({ label: 'Estate Value', value: formatIndianCurrency(effectiveValue) });
    const isExtended = suitType.isExtendedProbate ?? false;
    if (isExtended) {
      breakdown.push({ label: 'Certificate Type', value: 'Extended (1.5x multiplier)' });
    }
    const { fee, tierDescription } = computeProbateFee(effectiveValue, isExtended);
    breakdown.push({ label: 'Computation', value: tierDescription });
    breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(fee) });
    return {
      fee,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue,
      breakdown,
      isExempt: false,
    };
  }

  // ── Step 6: Handle difference_ad_valorem ─────────────────────────────────

  if (suitType.feeMethod === 'difference_ad_valorem') {
    const awarded = input.values['awardedAmount'] ?? 0;
    const claimed = input.values['claimedAmount'] ?? 0;
    const difference = Math.abs(claimed - awarded);
    breakdown.push({ label: 'Amount Awarded', value: formatIndianCurrency(awarded) });
    breakdown.push({ label: 'Amount Claimed', value: formatIndianCurrency(claimed) });
    breakdown.push({ label: 'Difference', value: formatIndianCurrency(difference) });

    if (difference <= 0) {
      breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(0) });
      return {
        fee: 0,
        section: suitType.section,
        suitLabel: suitType.label,
        valueBasis: suitType.valueBasis,
        effectiveValue: 0,
        breakdown,
        isExempt: false,
      };
    }

    const { fee, slab } = computeAdValoremFee(difference);
    breakdown.push({ label: 'Slab Applied', value: `Slab ${slab.slabLabel} (${(slab.rate * 100).toFixed(1)}%)` });
    breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(fee) });
    return {
      fee,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue: difference,
      breakdown,
      slabApplied: slab,
      isExempt: false,
    };
  }

  // ── Step 7: Handle fraction_of_fee ───────────────────────────────────────

  if (suitType.feeMethod === 'fraction_of_fee') {
    const fractionMultiplier = suitType.fraction ?? 1;
    breakdown.push({ label: 'Original Suit Value', value: formatIndianCurrency(effectiveValue) });

    const { fee: fullFee, slab } = computeAdValoremFee(effectiveValue);
    breakdown.push({ label: 'Full Ad Valorem Fee', value: formatIndianCurrency(fullFee) });
    breakdown.push({ label: 'Fraction Applied', value: `${fractionMultiplier === 0.5 ? '1/2' : fractionMultiplier}` });

    const fee = Math.ceil(fullFee * fractionMultiplier);
    breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(fee) });
    return {
      fee,
      section: suitType.section,
      suitLabel: suitType.label,
      valueBasis: suitType.valueBasis,
      effectiveValue,
      breakdown,
      slabApplied: slab,
      isExempt: false,
    };
  }

  // ── Step 8: Ad valorem (full or fractional) ──────────────────────────────

  breakdown.push({ label: 'Value Entered', value: formatIndianCurrency(effectiveValue) });

  let valueForComputation = effectiveValue;
  if (suitType.feeMethod === 'ad_valorem_fraction' && suitType.fraction) {
    valueForComputation = Math.round(effectiveValue * suitType.fraction);
    const fractionLabel = suitType.fraction === 0.5 ? '1/2' : suitType.fraction === 0.25 ? '1/4' : suitType.fraction === 0.2 ? '1/5' : `${suitType.fraction}`;
    breakdown.push({
      label: 'Fraction Applied',
      value: `${fractionLabel} of ${formatIndianCurrency(effectiveValue)} = ${formatIndianCurrency(valueForComputation)}`,
    });
  }

  if (suitType.minimumValue && valueForComputation < suitType.minimumValue) {
    breakdown.push({
      label: 'Minimum Threshold',
      value: `Value raised from ${formatIndianCurrency(valueForComputation)} to minimum ${formatIndianCurrency(suitType.minimumValue)}`,
    });
    valueForComputation = suitType.minimumValue;
  }

  const { fee: computedFee, slab } = computeAdValoremFee(valueForComputation);
  breakdown.push({
    label: 'Slab Applied',
    value: `Slab ${slab.slabLabel} (${(slab.rate * 100).toFixed(1)}%)`,
  });

  let finalFee = computedFee;
  if (suitType.feeCap && computedFee > suitType.feeCap) {
    breakdown.push({
      label: 'Fee Cap',
      value: `Capped from ${formatIndianCurrency(computedFee)} to maximum ${formatIndianCurrency(suitType.feeCap)}`,
    });
    finalFee = suitType.feeCap;
  }

  breakdown.push({ label: 'Court Fee', value: formatIndianCurrency(finalFee) });

  return {
    fee: finalFee,
    section: suitType.section,
    suitLabel: suitType.label,
    valueBasis: suitType.valueBasis,
    effectiveValue: valueForComputation,
    breakdown,
    slabApplied: slab,
    isExempt: false,
  };
}

// ── Value resolution helpers ───────────────────────────────────────────────

function resolveValue(
  input: CalculatorInput,
  comparison?: string
): number {
  const values = input.values;
  const keys = Object.keys(values);

  if (keys.length === 0) return 0;
  if (keys.length === 1) return Math.round(values[keys[0]]);

  if (input.suitTypeId === 'mortgage_redemption') {
    const amountDue = values['amountDue'] ?? 0;
    const quarterPrincipal = (values['principal'] ?? 0) / 4;
    return Math.round(Math.max(amountDue, quarterPrincipal));
  }

  if (input.suitTypeId === 'set_aside_attachment') {
    const quarterMV = (values['marketValue'] ?? 0) / 4;
    const attachment = values['attachmentAmount'] ?? 0;
    return Math.round(Math.min(quarterMV, attachment));
  }

  const numericValues = keys.map((k) => values[k]);

  switch (comparison) {
    case 'higher':
      return Math.round(Math.max(...numericValues));
    case 'lower':
      return Math.round(Math.min(...numericValues));
    case 'sum':
      return Math.round(numericValues.reduce((a, b) => a + b, 0));
    default:
      return Math.round(numericValues[0]);
  }
}
