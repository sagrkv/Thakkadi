import assert from 'node:assert/strict';
import { test } from 'node:test';
import { restoreCourtFee } from '../../src/lib/url-params/restore-court-fee';
import { getSuitTypeById } from '../../src/lib/court-fee/constants/suit-categories';

const suit = getSuitTypeById('money_suit')!;
const field = suit.inputFields[0].id;
const params = { g: suit.group, s: suit.id, v: JSON.stringify({ [field]: 100000 }) };
test('shared court fee recalculates the original result', () => {
  const restored = restoreCourtFee(params);
  assert.equal(restored?.step, 'result');
  assert.equal(restored?.result?.fee, 6625);
  assert.equal(restored?.inputValues[field], 100000);
});
test('malformed or mismatched shared inputs cannot produce a result', () => {
  for (const input of [null, {}, { ...params, g: 'B' }, { ...params, s: 'missing' },
    { ...params, v: '{' }, { ...params, v: '[]' }, { ...params, v: '{}'},
    ...[-1, 0, 1e20, '100000'].map(value => ({ ...params, v: JSON.stringify({ [field]: value }) }))]) {
    assert.equal(restoreCourtFee(input), null);
  }
});
test('unrelated URL fields are not carried into calculator inputs', () => {
  const restored = restoreCourtFee({ ...params, v: JSON.stringify({ [field]: 100000, totalFee: 1 }) });
  assert.deepEqual(restored?.inputValues, { [field]: 100000 });
});
