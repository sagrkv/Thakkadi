import assert from 'node:assert/strict';
import test from 'node:test';
import sitemap from '../../src/app/sitemap';

test('sitemap includes the blog index and all three published articles', () => {
  const urls = sitemap().map((entry) => entry.url);
  for (const path of ['/blog', '/blog/bnss-2023-what-changed', '/blog/karnataka-court-fees-explained', '/blog/understanding-limitation-periods']) {
    assert.ok(urls.includes(`https://thakkadi.in${path}`), path);
  }
  assert.equal(new Set(urls).size, urls.length);
});

test('article modification dates reflect editorial changes', () => {
  const entries = sitemap();
  assert.equal(entries.find((entry) => entry.url.endsWith('/karnataka-court-fees-explained'))?.lastModified, '2026-10-01');
  assert.equal(entries.find((entry) => entry.url === 'https://thakkadi.in')?.lastModified, undefined);
});
