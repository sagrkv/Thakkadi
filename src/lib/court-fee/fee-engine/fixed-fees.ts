import type { FixedFeeTier } from '@/types/court-fee';

/**
 * Look up a fixed/tiered fee from a table.
 */
export function lookupFixedTieredFee(
  value: number,
  tiers: readonly FixedFeeTier[]
): { fee: number; tierDescription: string } {
  const roundedValue = Math.round(value);

  for (const tier of tiers) {
    const inRange =
      roundedValue >= tier.min &&
      (tier.max === null || roundedValue <= tier.max);

    if (inRange) {
      const maxLabel = tier.max === null ? 'above' : `up to Rs. ${tier.max.toLocaleString('en-IN')}`;
      return {
        fee: tier.fee,
        tierDescription: `Rs. ${tier.min.toLocaleString('en-IN')} - ${maxLabel}: Rs. ${tier.fee}`,
      };
    }
  }

  const lastTier = tiers[tiers.length - 1];
  return {
    fee: lastTier.fee,
    tierDescription: `Above Rs. ${lastTier.min.toLocaleString('en-IN')}: Rs. ${lastTier.fee}`,
  };
}
