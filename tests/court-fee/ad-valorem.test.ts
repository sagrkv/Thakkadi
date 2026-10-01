import assert from 'node:assert/strict';
import { test } from 'node:test';
import { computeAdValoremFee } from '../../src/lib/court-fee/fee-engine/ad-valorem';

// Expected amounts calculated independently from Schedule I, Article 1,
// clauses (i)–(xvi), India Code PDF pages 37–38 (printed numbering).
// https://www.indiacode.nic.in/bitstream/123456789/7625/1/16_of_1958_(e).pdf
const examples = [
  [10_000, 250], [15_000, 375], [50_000, 3_000], [75_000, 4_875],
  [1_00_000, 6_625], [2_50_000, 17_125], [5_00_000, 33_375],
  [7_50_000, 48_375], [10_00_000, 62_125], [15_00_000, 87_125],
  [20_00_000, 1_09_625], [25_00_000, 1_29_625], [30_00_000, 1_47_125],
  [40_00_000, 1_77_125], [45_00_000, 1_89_625], [50_00_000, 2_02_125],
  [60_00_000, 2_22_125], [65_00_000, 2_29_625], [70_00_000, 2_37_125],
  [80_00_000, 2_47_125], [90_00_000, 2_52_125],
] as const;

for (const [value, expected] of examples) {
  test(`Article 1 fee for ₹${value} is ₹${expected}`, () => {
    assert.equal(computeAdValoremFee(value).fee, expected);
  });
}

for (const value of [40_00_000, 50_00_000, 60_00_000, 70_00_000, 80_00_000]) {
  test(`fee remains continuous across the ₹${value} boundary`, () => {
    const fee = computeAdValoremFee(value).fee;
    assert.equal(computeAdValoremFee(value + 1).fee, fee + 1);
    assert.ok(computeAdValoremFee(value - 1).fee <= fee);
  });
}
