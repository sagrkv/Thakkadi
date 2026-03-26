import type { InstrumentDefinition } from '@/types/stamp-duty';

/**
 * Compute registration fee based on instrument's registration method.
 *
 * Methods:
 *   percentage   — rate x property value (default 2%, effective Aug 2025)
 *   fixed        — static rupee amount
 *   per_thousand — rate per Rs 1000 of value
 *   nil          — no registration fee
 */
export function computeRegistrationFee(
  instrument: InstrumentDefinition,
  propertyValue: number,
): number {
  switch (instrument.registrationFeeMethod) {
    case 'percentage': {
      const rate = instrument.registrationFeeRate ?? 0.02;
      let fee = Math.ceil(propertyValue * rate);
      if (instrument.registrationFeeMin && fee < instrument.registrationFeeMin) {
        fee = instrument.registrationFeeMin;
      }
      if (instrument.registrationFeeMax && instrument.registrationFeeMax > 0 && fee > instrument.registrationFeeMax) {
        fee = instrument.registrationFeeMax;
      }
      return fee;
    }

    case 'fixed':
      return instrument.registrationFeeFixed ?? 0;

    case 'per_thousand': {
      const rate = instrument.registrationFeePerThousand ?? 0;
      return Math.ceil((propertyValue / 1000) * rate);
    }

    case 'nil':
      return 0;

    default:
      return 0;
  }
}
