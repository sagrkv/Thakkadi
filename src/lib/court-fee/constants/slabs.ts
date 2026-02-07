import type { SlabDefinition } from '@/types/court-fee';

/**
 * Ad Valorem Fee Table — Schedule I, Article 1
 * Karnataka Court Fees and Suits Valuation Act, 1958
 * (Substituted by Act 2 of 1993 w.e.f. 29.1.1993)
 *
 * Formula: fee = baseFee + rate * (value - threshold)
 * baseFee and threshold are as stated in the Act's text.
 */
export const AD_VALOREM_SLABS: readonly SlabDefinition[] = [
  { number: 1,  label: 'i',    min: 1,         max: 15_000,     threshold: 0,         rate: 0.025,  baseFee: 0 },
  { number: 2,  label: 'ii',   min: 15_001,    max: 75_000,     threshold: 15_000,    rate: 0.075,  baseFee: 375 },
  { number: 3,  label: 'iii',  min: 75_001,    max: 2_50_000,   threshold: 75_000,    rate: 0.07,   baseFee: 4_875 },
  { number: 4,  label: 'iv',   min: 2_50_001,  max: 5_00_000,   threshold: 2_50_000,  rate: 0.065,  baseFee: 17_125 },
  { number: 5,  label: 'v',    min: 5_00_001,  max: 7_50_000,   threshold: 5_00_000,  rate: 0.06,   baseFee: 33_375 },
  { number: 6,  label: 'vi',   min: 7_50_001,  max: 10_00_000,  threshold: 7_50_000,  rate: 0.055,  baseFee: 48_375 },
  { number: 7,  label: 'vii',  min: 10_00_001, max: 15_00_000,  threshold: 10_00_000, rate: 0.05,   baseFee: 62_125 },
  { number: 8,  label: 'viii', min: 15_00_001, max: 20_00_000,  threshold: 15_00_000, rate: 0.045,  baseFee: 87_125 },
  { number: 9,  label: 'ix',   min: 20_00_001, max: 25_00_000,  threshold: 20_00_000, rate: 0.04,   baseFee: 1_09_625 },
  { number: 10, label: 'x',    min: 25_00_001, max: 30_00_000,  threshold: 25_00_000, rate: 0.035,  baseFee: 1_29_625 },
  { number: 11, label: 'xi',   min: 30_00_001, max: 40_00_000,  threshold: 30_00_000, rate: 0.03,   baseFee: 1_47_125 },
  { number: 12, label: 'xii',  min: 40_00_001, max: 50_00_000,  threshold: 40_00_000, rate: 0.02,   baseFee: 1_77_125 },
  { number: 13, label: 'xiii', min: 50_00_001, max: 60_00_000,  threshold: 50_00_000, rate: 0.02,   baseFee: 2_02_125 },
  { number: 14, label: 'xiv',  min: 60_00_001, max: 70_00_000,  threshold: 60_00_000, rate: 0.01,   baseFee: 2_22_125 },
  { number: 15, label: 'xv',   min: 70_00_001, max: 80_00_000,  threshold: 70_00_000, rate: 0.01,   baseFee: 2_37_125 },
  { number: 16, label: 'xvi',  min: 80_00_001, max: null,        threshold: 80_00_000, rate: 0.01,   baseFee: 2_47_125 },
] as const;
