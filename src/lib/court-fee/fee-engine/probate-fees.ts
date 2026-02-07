/**
 * Compute probate / succession certificate fee.
 * Art. 6 — Karnataka Court Fees & Suits Valuation Act, 1958
 */
export function computeProbateFee(
  value: number,
  isExtended: boolean = false
): { fee: number; tierDescription: string } {
  const roundedValue = Math.round(value);

  let fee: number;
  let tierDescription: string;

  if (roundedValue <= 1_000) {
    fee = 0;
    tierDescription = 'Up to Rs. 1,000: Nil';
  } else if (roundedValue <= 3_00_000) {
    fee = Math.ceil((roundedValue - 1_000) * 0.03);
    tierDescription = `Rs. 1,001 to Rs. 3,00,000: 3% on amount exceeding Rs. 1,000 = Rs. ${fee.toLocaleString('en-IN')}`;
  } else {
    const fivePercent = Math.ceil(roundedValue * 0.05);
    fee = Math.min(fivePercent, 30_000);
    tierDescription = `Above Rs. 3,00,000: 5% = Rs. ${fivePercent.toLocaleString('en-IN')}, capped at Rs. 30,000 → Rs. ${fee.toLocaleString('en-IN')}`;
  }

  if (isExtended) {
    fee = Math.ceil(fee * 1.5);
    tierDescription += ` (Extended certificate: 1.5x = Rs. ${fee.toLocaleString('en-IN')})`;
  }

  return { fee, tierDescription };
}
