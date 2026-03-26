import type {
  StampDutyInput,
  StampDutyResult,
  BreakdownStep,
  InstrumentDefinition,
  LocationType,
} from '@/types/stamp-duty';
import { getInstrumentById } from '../constants/instruments';
import { SCST_REBATE_RATE, LOCATION_LABELS, FAMILY_REGISTRATION_FEE } from '../constants/rates';
import { computeTieredDuty } from './tiered-duty';
import { computeSurcharge, computeCess } from './surcharge-cess';
import { computeRegistrationFee } from './registration-fee';
import { formatIndianCurrency } from '@/lib/court-fee/utils/format-currency';

// ── Pure helper return type ──────────────────────────────────────────────────

interface DutyResult {
  readonly duty: number;
  readonly steps: readonly BreakdownStep[];
}

// ── Main Calculator ──────────────────────────────────────────────────────────

export function calculateStampDuty(input: StampDutyInput): StampDutyResult {
  const instrument = getInstrumentById(input.instrumentId);
  if (!instrument) {
    throw new Error(`Unknown instrument: ${input.instrumentId}`);
  }

  const propertyValue = input.propertyValue ?? 0;
  const location = input.location ?? 'bbmp';
  const isFamilyRelation = input.isFamilyRelation ?? false;
  const isScSt = input.isScSt ?? false;
  const isFirstProperty = input.isFirstProperty ?? false;
  const shareCount = input.shareCount ?? 1;

  // Step 1: Compute base stamp duty (pure)
  const base = computeBaseDuty(instrument, propertyValue, location, isFamilyRelation, shareCount);
  const baseDuty = base.duty;

  // Step 2: SC/ST rebate
  const { netDuty, scstRebate, rebateSteps } = applyScStRebate(
    baseDuty,
    instrument.scstRebateEligible,
    isScSt,
    isFirstProperty,
  );

  // Step 3: Surcharge + Cess (on net duty after rebate)
  const isFamilyFixed = isFamilyRelation && instrument.familyDutyOverride?.dutyMethod === 'fixed_location';
  const isAdValoremDuty = netDuty > 0 &&
    instrument.dutyMethod !== 'fixed_amount' &&
    instrument.dutyMethod !== 'nil' &&
    !isFamilyFixed;

  const surcharge = isAdValoremDuty && instrument.requiresLocation
    ? computeSurcharge(netDuty, location)
    : 0;
  const cess = isAdValoremDuty && instrument.requiresLocation
    ? computeCess(netDuty, location)
    : 0;

  const chargeSteps: readonly BreakdownStep[] = [
    ...(surcharge > 0 ? [{
      label: `Surcharge (${location === 'bbmp' ? '2%' : '3%'} \u2014 ${LOCATION_LABELS[location]})`,
      value: formatIndianCurrency(surcharge),
    }] : []),
    ...(cess > 0 ? [{
      label: 'Cess (10% of stamp duty)',
      value: formatIndianCurrency(cess),
    }] : []),
  ];

  // Step 4: Registration fee
  const registrationFee = computeRegFee(instrument, propertyValue, isFamilyRelation, shareCount);

  const regStep: BreakdownStep = registrationFee > 0
    ? {
        label: instrument.registrationFeeMethod === 'percentage' && !isFamilyRelation
          ? `Registration Fee (${(instrument.registrationFeeRate ?? 0.02) * 100}%)`
          : 'Registration Fee',
        value: formatIndianCurrency(registrationFee),
      }
    : { label: 'Registration Fee', value: 'Nil' };

  // Step 5: Total
  const totalPayable = netDuty + surcharge + cess + registrationFee;

  const totalStep: BreakdownStep = {
    label: 'Total Payable',
    value: formatIndianCurrency(totalPayable),
    isHighlight: true,
  };

  // Assemble final breakdown (no mutation — spread composition)
  const breakdown: readonly BreakdownStep[] = [
    ...base.steps,
    ...rebateSteps,
    ...chargeSteps,
    regStep,
    totalStep,
  ];

  return {
    instrumentLabel: instrument.label,
    section: instrument.section,
    stampDuty: netDuty,
    surcharge,
    cess,
    scstRebate,
    registrationFee,
    totalPayable,
    breakdown,
    isNilDuty: instrument.dutyMethod === 'nil',
    propertyValue,
    location: instrument.requiresLocation ? location : undefined,
  };
}

// ── SC/ST Rebate (pure) ─────────────────────────────────────────────────────

function applyScStRebate(
  baseDuty: number,
  eligible: boolean,
  isScSt: boolean,
  isFirstProperty: boolean,
): { netDuty: number; scstRebate: number; rebateSteps: readonly BreakdownStep[] } {
  if (!eligible || !isScSt || !isFirstProperty || baseDuty <= 0) {
    return { netDuty: baseDuty, scstRebate: 0, rebateSteps: [] };
  }

  const scstRebate = Math.ceil(baseDuty * SCST_REBATE_RATE);
  const netDuty = baseDuty - scstRebate;

  return {
    netDuty,
    scstRebate,
    rebateSteps: [
      { label: 'SC/ST Rebate (50%)', value: `- ${formatIndianCurrency(scstRebate)}` },
      { label: 'Stamp Duty after Rebate', value: formatIndianCurrency(netDuty), isSubtotal: true },
    ],
  };
}

// ── Registration Fee (pure) ──────────────────────────────────────────────────

function computeRegFee(
  instrument: InstrumentDefinition,
  propertyValue: number,
  isFamilyRelation: boolean,
  shareCount: number,
): number {
  // Family instruments get fixed registration
  if (isFamilyRelation && instrument.hasFamilyDistinction) {
    return FAMILY_REGISTRATION_FEE;
  }

  // Agriculture partition: fixed per share
  if (instrument.id === 'partition_agriculture' && shareCount > 1) {
    return (instrument.registrationFeeFixed ?? 200) * shareCount;
  }

  return computeRegistrationFee(instrument, propertyValue);
}

// ── Base Duty Computation (pure — returns duty + breakdown steps) ────────────

function computeBaseDuty(
  instrument: InstrumentDefinition,
  propertyValue: number,
  location: LocationType,
  isFamilyRelation: boolean,
  shareCount: number,
): DutyResult {
  // Check family override first
  if (isFamilyRelation && instrument.hasFamilyDistinction && instrument.familyDutyOverride) {
    const override = instrument.familyDutyOverride;

    if (override.dutyMethod === 'fixed_location' && override.locationFees) {
      const duty = override.locationFees[location];
      return {
        duty,
        steps: [
          { label: 'Property Value', value: propertyValue > 0 ? formatIndianCurrency(propertyValue) : 'N/A' },
          { label: 'Relationship', value: 'Family Member' },
          { label: `Stamp Duty (${LOCATION_LABELS[location]})`, value: formatIndianCurrency(duty), isSubtotal: true },
        ],
      };
    }
  }

  // Standard duty computation
  switch (instrument.dutyMethod) {
    case 'tiered_ad_valorem': {
      if (!instrument.tieredSlabs) throw new Error('Missing tiered slabs');
      const duty = computeTieredDuty(propertyValue, instrument.tieredSlabs);
      return {
        duty,
        steps: [
          { label: 'Property Value', value: formatIndianCurrency(propertyValue) },
          ...(instrument.requiresLocation
            ? [{ label: 'Location', value: LOCATION_LABELS[location] }]
            : []),
          { label: 'Stamp Duty (tiered rates: 2%/3%/5%)', value: formatIndianCurrency(duty), isSubtotal: true },
        ],
      };
    }

    case 'flat_percentage': {
      const rate = instrument.rate ?? 0;
      const rawDuty = Math.ceil(propertyValue * rate);
      const duty = instrument.minimumDuty && rawDuty < instrument.minimumDuty
        ? instrument.minimumDuty
        : rawDuty;
      const pct = `${(rate * 100).toFixed(1)}%`;
      return {
        duty,
        steps: [
          { label: 'Property / Consideration Value', value: formatIndianCurrency(propertyValue) },
          ...(instrument.requiresLocation
            ? [{ label: 'Location', value: LOCATION_LABELS[location] }]
            : []),
          { label: `Stamp Duty (${pct})`, value: formatIndianCurrency(duty), isSubtotal: true },
        ],
      };
    }

    case 'fixed_amount': {
      const baseDuty = instrument.fixedDuty ?? 0;
      if (instrument.id === 'partition_agriculture' && shareCount > 1) {
        const duty = baseDuty * shareCount;
        return {
          duty,
          steps: [
            { label: 'Number of Shares', value: String(shareCount) },
            {
              label: `Stamp Duty (Rs ${baseDuty.toLocaleString('en-IN')} x ${shareCount} shares)`,
              value: formatIndianCurrency(duty),
              isSubtotal: true,
            },
          ],
        };
      }
      return {
        duty: baseDuty,
        steps: [
          { label: 'Stamp Duty (Fixed)', value: formatIndianCurrency(baseDuty), isSubtotal: true },
        ],
      };
    }

    case 'fixed_location': {
      const duty = instrument.locationFees ? instrument.locationFees[location] : 0;
      return {
        duty,
        steps: [
          { label: 'Property Value', value: formatIndianCurrency(propertyValue) },
          { label: `Stamp Duty (${LOCATION_LABELS[location]})`, value: formatIndianCurrency(duty), isSubtotal: true },
        ],
      };
    }

    case 'nil':
      return {
        duty: 0,
        steps: [
          { label: 'Stamp Duty', value: 'Nil', isSubtotal: true },
        ],
      };

    default: {
      const _exhaustive: never = instrument.dutyMethod;
      throw new Error(`Unknown duty method: ${_exhaustive}`);
    }
  }
}
