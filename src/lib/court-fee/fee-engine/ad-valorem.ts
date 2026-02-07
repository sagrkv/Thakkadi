import type { SlabApplication } from '@/types/court-fee';
import { AD_VALOREM_SLABS } from '@/lib/court-fee/constants/slabs';

/**
 * Compute ad valorem court fee using the 16-slab table.
 * Schedule I, Article 1 — Karnataka Court Fees & Suits Valuation Act, 1958
 *
 * Formula per the Act: fee = baseFee + rate * (value - threshold)
 * Always rounds UP (Math.ceil) as is court practice.
 */
export function computeAdValoremFee(value: number): {
  fee: number;
  slab: SlabApplication;
} {
  const roundedValue = Math.round(value);

  if (roundedValue <= 0) {
    return {
      fee: 0,
      slab: {
        slabNumber: 0,
        slabLabel: 'N/A',
        rangeMin: 0,
        rangeMax: 0,
        rate: 0,
        baseFee: 0,
        amountInSlab: 0,
        feeInSlab: 0,
      },
    };
  }

  const slab = AD_VALOREM_SLABS.find(
    (s) => roundedValue >= s.min && (s.max === null || roundedValue <= s.max)
  );

  if (!slab) {
    const lastSlab = AD_VALOREM_SLABS[AD_VALOREM_SLABS.length - 1];
    const amountExceeding = roundedValue - lastSlab.threshold;
    const feeInSlab = amountExceeding * lastSlab.rate;
    const totalFee = Math.ceil(lastSlab.baseFee + feeInSlab);

    return {
      fee: totalFee,
      slab: {
        slabNumber: lastSlab.number,
        slabLabel: lastSlab.label,
        rangeMin: lastSlab.min,
        rangeMax: lastSlab.max,
        rate: lastSlab.rate,
        baseFee: lastSlab.baseFee,
        amountInSlab: amountExceeding,
        feeInSlab: Math.ceil(feeInSlab),
      },
    };
  }

  const amountExceeding = roundedValue - slab.threshold;
  const feeInSlab = amountExceeding * slab.rate;
  const totalFee = Math.ceil(slab.baseFee + feeInSlab);

  return {
    fee: totalFee,
    slab: {
      slabNumber: slab.number,
      slabLabel: slab.label,
      rangeMin: slab.min,
      rangeMax: slab.max,
      rate: slab.rate,
      baseFee: slab.baseFee,
      amountInSlab: amountExceeding,
      feeInSlab: Math.ceil(feeInSlab),
    },
  };
}
