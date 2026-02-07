/**
 * Format a number as Indian currency: Rs. 1,00,000 (lakh system)
 */
export function formatIndianCurrency(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-IN');
  return `Rs. ${formatted}`;
}

/**
 * Format a number in Indian word form: "1 lakh", "5 crore", etc.
 */
export function formatInWords(amount: number): string {
  const rounded = Math.round(amount);

  if (rounded >= 1_00_00_000) {
    const crore = rounded / 1_00_00_000;
    return crore % 1 === 0
      ? `${crore} crore`
      : `${crore.toFixed(2)} crore`;
  }

  if (rounded >= 1_00_000) {
    const lakh = rounded / 1_00_000;
    return lakh % 1 === 0
      ? `${lakh} lakh`
      : `${lakh.toFixed(2)} lakh`;
  }

  if (rounded >= 1_000) {
    const thousand = rounded / 1_000;
    return thousand % 1 === 0
      ? `${thousand} thousand`
      : `${thousand.toFixed(1)} thousand`;
  }

  return rounded.toLocaleString('en-IN');
}

/**
 * Parse an Indian-formatted currency string back to a number.
 */
export function parseCurrencyInput(input: string): number | null {
  const cleaned = input.replace(/[Rs.,\s]/g, '');
  const num = Number(cleaned);
  return isNaN(num) ? null : num;
}
