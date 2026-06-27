# Lab 02 — Components That Lie

**Lesson:** 02 · **Goal:** rewrite a component test to assert on user-facing output, so it catches a wrong display and survives a refactor.

## Goal
Show the internal-state test passing against a display bug (the lie), then a behavior test that goes red on the bug and stays green through a refactor.

## Setup
The order-summary component models its render as a function of props (the part a behavior test asserts on). `summary.mjs`:
```js
// the pure logic the component uses (unit-testable directly)
export function formatTotal(items) {
  const cents = items.reduce((s, i) => s + i.priceCents, 0);
  return '$' + (cents / 100).toFixed(2);          // user-facing string
}
// what the component renders (the user sees this text)
export function renderSummary(items) {
  return { totalText: 'Total: ' + formatTotal(items) };   // the rendered output
}
// a stand-in for "internal state" an implementation-coupled test would read
export function _internalTotalCents(items) { return items.reduce((s, i) => s + i.priceCents, 0); }
```

## Tasks
1. **The lying test.** Assert on `_internalTotalCents` (internal state). Introduce a *display* bug (e.g. `formatTotal` divides by 10 instead of 100) and show the internals test **still passes** — it lies.
2. **The honest test.** Assert on `renderSummary(items).totalText` (what the user sees). Run it against the display bug; confirm it goes **red**.
3. **Fix** `formatTotal`; confirm the behavior test goes **green**.
4. **Refactor-safe.** Refactor *how* the total is computed (e.g. inline vs helper) without changing output; confirm the behavior test stays green (an internals test would have broken).

> In your project the same assertions run against the real rendered DOM via a React testing library + jsdom (`getByText('Total: $80.00')`). Here the rendered output is verified directly with `node:test` — identical assertions and discipline.

## Verify (example)
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { renderSummary, _internalTotalCents } from './summary.mjs';
const items = [{ priceCents: 5000 }, { priceCents: 3000 }];
// behavior test — fails iff the user would see the wrong total
test('shows the correct total to the user', () => {
  assert.strictEqual(renderSummary(items).totalText, 'Total: $80.00');
});
// the internals test "lies": passes on raw cents even when the display is wrong
test('internal cents (brittle/lying)', () => {
  assert.strictEqual(_internalTotalCents(items), 8000);
});
```
```bash
node --test summary.test.mjs
```

## Deliverable
The lying test passing against the display bug, the behavior test failing on the bug then passing after the fix, evidence it survives a behavior-preserving refactor, and a note on the internals assertion you removed.

## Cleanup
```bash
rm -f /tmp/forge-quality/summary*.mjs
```

## Check
`../solutions/lab-02-solution.md`.
