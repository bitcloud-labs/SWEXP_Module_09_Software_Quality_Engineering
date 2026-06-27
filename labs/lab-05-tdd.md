# Lab 05 — Never Write Untested Code Again

**Lesson:** 05 · **Goal:** build a Forge coupon feature entirely test-first — red → green → refactor — with a log proving each test failed before it passed.

## Goal
Grow `applyCoupon` through several red → green → refactor cycles, never writing code for untested behavior.

## Setup
```bash
cd /tmp/forge-quality
# start with NO implementation — the first test must fail because the function doesn't exist
```
`coupon.test.mjs` (write the first failing test before any code):
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { applyCoupon } from './coupon.mjs';

test('flat coupon subtracts its amount', () => {
  assert.strictEqual(applyCoupon(100, { type: 'flat', off: 20 }), 80);   // no coupon.mjs yet → RED
});
```

## Tasks — one cycle per behavior
For each, **write the failing test first, run it (capture red), write the simplest passing code (capture green), then refactor under green**:
1. **Flat coupon:** `{ type:'flat', off:20 }` on 100 → 80.
2. **Percentage coupon:** `{ type:'percent', pct:0.1 }` on 100 → 90.
3. **Cap at total:** a flat coupon larger than the total → 0 (never negative).
4. **Reject invalid:** unknown type or negative amount → throws.
5. **Refactor** once under a green suite (e.g. extract a helper) and confirm tests stay green.

Keep a **red→green log**: for each behavior, the failing run then the passing run.

## Verify (example — final green suite)
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { applyCoupon } from './coupon.mjs';
test('flat', () => assert.strictEqual(applyCoupon(100, { type:'flat', off:20 }), 80));
test('percent', () => assert.strictEqual(applyCoupon(100, { type:'percent', pct:0.1 }), 90));
test('cap at total (never negative)', () => assert.strictEqual(applyCoupon(15, { type:'flat', off:20 }), 0));
test('reject invalid', () => assert.throws(() => applyCoupon(100, { type:'bogus' }), /invalid/));
```
```bash
node --test coupon.test.mjs
```

## Deliverable
The red→green log for each behavior (the failing run before the implementation), the final green suite, at least one refactor under green, and a note on a case the test-first cycle surfaced that you'd likely have skipped writing tests afterward.

## Cleanup
```bash
rm -f /tmp/forge-quality/coupon*.mjs
```

## Check
`../solutions/lab-05-solution.md`.
