import type { LocationType } from '@/types/stamp-duty';
import {
  SURCHARGE_RATES,
  CESS_RATE,
  CESS_APPLICABLE_LOCATIONS,
} from '../constants/rates';

/**
 * Compute surcharge on stamp duty based on location.
 * BBMP/Corporation = 2%, BMRDA/Municipal = 3%, Rural = 0%
 */
export function computeSurcharge(
  stampDuty: number,
  location: LocationType,
): number {
  const rate = SURCHARGE_RATES[location];
  return Math.ceil(stampDuty * rate);
}

/**
 * Compute cess — 10% of stamp duty, only in urban areas (BBMP, BMRDA).
 */
export function computeCess(
  stampDuty: number,
  location: LocationType,
): number {
  if (!CESS_APPLICABLE_LOCATIONS.includes(location)) return 0;
  return Math.ceil(stampDuty * CESS_RATE);
}
