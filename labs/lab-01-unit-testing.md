# Lab 01 — The Production Outage

**Lesson:** 01 · **Goal:** reproduce the pricing outage as a failing unit test, fix it, and add boundary + error-path tests.

## Goal
Turn the bug into a failing test (red), fix the function (green), and leave a regression suite covering the boundaries the outage lived in.

## Setup
The buggy Forge pricing function, `pricing.mjs`:
```js
// BUG: a 100% discount produces a negative charge; no validation of out-of-range pct
export function finalPrice(price, pct) {
  return price - (price * pct) - 1;   // the off-by-one/edge bug that took down checkout
}
```
`pricing.test.mjs` (start by reproducing the outage):
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { finalPrice } from './pricing.mjs';

test('100% discount makes the price zero, never negative', () => {
  assert.strictEqual(finalPrice(100, 1.0), 0);   // buggy → RED
});
```

## Tasks
1. **Reproduce the outage (red).** Run the test against the buggy function; confirm it fails with the wrong value.
2. **Fix `finalPrice` (green).** Make it correct: `price - price*pct`, clamped to ≥ 0, rejecting `pct` outside `[0,1]`.
3. **Cover the boundaries:** `pct = 0` (full price), `pct = 1` (zero), a normal case (`0.2` → 80).
4. **Cover the error path:** `pct > 1` or `pct < 0` throws.
5. **Weak-assertion demo:** write `assert.ok(finalPrice(100,0.2) !== null)` and show it stays green even against a wrong value — then keep the *specific* assertion instead.

## Verify (example)
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { finalPrice } from './pricing.mjs';
test('happy path', () => assert.strictEqual(finalPrice(100, 0.2), 80));
test('boundary 0% = full price', () => assert.strictEqual(finalPrice(100, 0), 100));
test('boundary 100% = zero, never negative', () => assert.strictEqual(finalPrice(100, 1), 0));
test('rejects out-of-range discount', () => assert.throws(() => finalPrice(100, 1.5), /discount/));
```
```bash
node --test pricing.test.mjs      # red against buggy code; green after the fix
```

## Deliverable
The red run (buggy value), the green run after the fix, the boundary + error-path tests, the weak-assertion demonstration, and a note on the single missing test that would have prevented the outage.

## Cleanup
```bash
rm -f /tmp/forge-quality/pricing*.mjs
```

## Check
`../solutions/lab-01-solution.md`.
