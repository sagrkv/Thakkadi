import type { LocationType, TieredSlab } from '@/types/stamp-duty';

// ── Sale Deed Tiered Slabs ───────────────────────────────────────────────────
// Karnataka Stamp Act, 1957 — cumulative marginal rates (like income tax)

export const SALE_DEED_SLABS: readonly TieredSlab[] = [
  { min: 0,        max: 20_00_000,  rate: 0.02 },  // 2% on first 20 lakh
  { min: 20_00_000, max: 45_00_000, rate: 0.03 },  // 3% on 20L–45L
  { min: 45_00_000, max: null,      rate: 0.05 },  // 5% on above 45L
];

// ── Surcharge Rates ──────────────────────────────────────────────────────────
// Surcharge on stamp duty — location based

export const SURCHARGE_RATES: Record<LocationType, number> = {
  bbmp: 0.02,       // 2% in BBMP / Corporation
  municipal: 0.03,  // 3% in BMRDA / Municipal
  rural: 0,         // No surcharge in rural
};

// ── Cess Rate ────────────────────────────────────────────────────────────────
// 10% of stamp duty in urban areas only

export const CESS_RATE = 0.10;

export const CESS_APPLICABLE_LOCATIONS: readonly LocationType[] = ['bbmp', 'municipal'];

// ── SC/ST Rebate ─────────────────────────────────────────────────────────────
// 50% rebate on stamp duty for SC/ST on first property purchase

export const SCST_REBATE_RATE = 0.50;

// ── Registration Fee ─────────────────────────────────────────────────────────
// Default 2% registration fee (effective August 2025)
// Previously was 1%, increased to 2%

export const DEFAULT_REGISTRATION_FEE_RATE = 0.02;
export const REGISTRATION_FEE_EFFECTIVE_DATE = '2025-08-01';

// ── Location Labels ──────────────────────────────────────────────────────────

export const LOCATION_LABELS: Record<LocationType, string> = {
  bbmp: 'BBMP / Corporation',
  municipal: 'BMRDA / Municipal',
  rural: 'Gram Panchayat / Rural',
};

// ── Family Location Fixed Fees ───────────────────────────────────────────────
// For family gifts, releases, settlements

export const FAMILY_LOCATION_FEES = {
  bbmp: 5000,
  municipal: 3000,
  rural: 1000,
} as const;

// ── Family Registration Fixed Fee ────────────────────────────────────────────

export const FAMILY_REGISTRATION_FEE = 1000;
