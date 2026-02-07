import { z } from 'zod';

/**
 * Validates a currency value input
 */
export const currencyValueSchema = z
  .number()
  .positive('Value must be greater than zero')
  .finite('Value must be a finite number')
  .max(1_000_00_00_000, 'Value cannot exceed Rs. 1,000 crore');

/**
 * Validate all inputs for a suit type.
 * Returns either an error message or null (valid).
 */
export function validateSuitInputs(
  values: Record<string, number>,
  requiredFields: readonly { id: string; label: string }[]
): string | null {
  for (const field of requiredFields) {
    const val = values[field.id];

    if (val === undefined || val === null) {
      return `${field.label} is required`;
    }

    const result = currencyValueSchema.safeParse(val);
    if (!result.success) {
      return `${field.label}: ${result.error.issues[0].message}`;
    }
  }

  return null;
}
