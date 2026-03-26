import type { TieredSlab } from '@/types/stamp-duty';

/**
 * Compute stamp duty using cumulative marginal rate slabs.
 *
 * Works like income tax: each slab applies only to the portion of value
 * within that slab's range, and the total duty is the sum across all slabs.
 *
 * Test vector: Rs 1 crore
 *   = (20,00,000 x 2%) + (25,00,000 x 3%) + (55,00,000 x 5%)
 *   = 40,000 + 75,000 + 2,75,000
 *   = Rs 3,90,000
 */
export function computeTieredDuty(
  value: number,
  slabs: readonly TieredSlab[],
): number {
  if (value <= 0) return 0;

  let totalDuty = 0;

  for (const slab of slabs) {
    if (value <= slab.min) break;

    const upper = slab.max !== null ? Math.min(value, slab.max) : value;
    const taxableInSlab = upper - slab.min;

    if (taxableInSlab > 0) {
      totalDuty += taxableInSlab * slab.rate;
    }
  }

  return Math.ceil(totalDuty);
}
