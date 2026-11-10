import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateTitleScale,
  calculateCardClipInset,
  buildSearchUrl,
  APP_SERVICES,
} from './calculator';

test('calculateTitleScale scales width to 100vw and height to target ratio', () => {
  const natural = { width: 300, height: 100 };
  const viewport = { width: 390, height: 844 };
  const { scaleX, scaleY } = calculateTitleScale(natural, viewport, 0.5);

  assert.equal(scaleX, 390 / 300);
  assert.equal(scaleY, (844 * 0.5) / 100);
});

test('calculateTitleScale safely handles zero or negative dimensions', () => {
  const res = calculateTitleScale({ width: 0, height: 0 }, { width: 390, height: 844 });
  assert.deepEqual(res, { scaleX: 1, scaleY: 1 });
});

test('calculateCardClipInset formats exact CSS inset() values', () => {
  const cardRect = { top: 300, right: 366, bottom: 810, left: 24 };
  const viewport = { width: 390, height: 844 };
  const insetStr = calculateCardClipInset(cardRect, viewport, '16px');

  assert.equal(insetStr, 'inset(300px 24px 34px 24px round 16px)');
});

test('buildSearchUrl encodes query and trims whitespace', () => {
  assert.equal(buildSearchUrl('  san francisco skyline  '), 'https://www.google.com/search?q=san%20francisco%20skyline');
  assert.equal(buildSearchUrl('apple & spotify + music'), 'https://www.google.com/search?q=apple%20%26%20spotify%20%2B%20music');
  assert.equal(buildSearchUrl(''), '');
  assert.equal(buildSearchUrl('    '), '');
});

test('APP_SERVICES contains 4 official service destinations', () => {
  assert.equal(APP_SERVICES.length, 4);
  assert.deepEqual(APP_SERVICES.map(s => s.name), ['Spotify', 'YouTube', 'TikTok', 'Apple']);
  assert.ok(APP_SERVICES.every(s => s.url.startsWith('https://')));
});
