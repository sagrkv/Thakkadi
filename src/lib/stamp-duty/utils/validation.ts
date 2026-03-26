import { z } from 'zod';
import type { InstrumentDefinition } from '@/types/stamp-duty';

const locationSchema = z.enum(['bbmp', 'municipal', 'rural']);

// Max ~Rs 9,999 crore — well within Number.MAX_SAFE_INTEGER
const MAX_PROPERTY_VALUE = 99_99_99_99_999;

const baseInputSchema = z.object({
  instrumentId: z.string().min(1, 'Instrument is required'),
  propertyValue: z.number().nonnegative().max(MAX_PROPERTY_VALUE, 'Value exceeds maximum limit').optional(),
  location: locationSchema.optional(),
  isFamilyRelation: z.boolean().optional(),
  isScSt: z.boolean().optional(),
  isFirstProperty: z.boolean().optional(),
  leaseTermYears: z.number().int().positive().max(999).optional(),
  shareCount: z.number().int().positive().max(100).optional(),
});

/**
 * Validate stamp duty input against instrument requirements.
 * Returns { success: true, data } or { success: false, error }.
 */
export function validateStampDutyInput(
  input: unknown,
  instrument: InstrumentDefinition,
): { success: true; data: z.infer<typeof baseInputSchema> } | { success: false; error: string } {
  const parsed = baseInputSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { success: false, error: firstError?.message ?? 'Invalid input' };
  }

  const data = parsed.data;

  // Validate property value if required
  if (instrument.requiresValue) {
    if (!data.propertyValue || data.propertyValue <= 0) {
      return { success: false, error: 'Property value must be greater than zero' };
    }
  }

  // Validate location if required
  if (instrument.requiresLocation && !data.location) {
    return { success: false, error: 'Please select a location' };
  }

  // Validate lease terms if required
  if (instrument.requiresLeaseTerms) {
    if (!data.leaseTermYears || data.leaseTermYears <= 0) {
      return { success: false, error: 'Lease term (in years) is required' };
    }
  }

  // Validate share count if required
  if (instrument.requiresShareCount) {
    if (!data.shareCount || data.shareCount < 1) {
      return { success: false, error: 'Number of shares must be at least 1' };
    }
  }

  return { success: true, data };
}
