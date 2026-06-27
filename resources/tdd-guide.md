# TDD Guide — Red → Green → Refactor

## The cycle, in tiny steps
1. **Red** — write one small failing test for the next behavior; run it; confirm it fails *for the right reason*.
2. **Green** — write the **simplest** code that passes (not the elegant version — the simplest).
3. **Refactor** — improve code/tests without changing behavior; the green suite guards you.
Repeat for the next behavior.

```js
// RED: applyCoupon doesn't exist yet
test('flat coupon subtracts its amount', () => assert.strictEqual(applyCoupon(100, { off: 20 }), 80));
// GREEN: simplest thing
export function applyCoupon(total, c) { return total - c.off; }
// then REFACTOR under green (add types, extract helpers, handle the next test)
```

## Why test-first
- The test is **honest** (you watched it fail).
- The code is shaped by **how it's used** (you wrote the call before the implementation) → more decoupled.
- You **can't ship untested behavior** — the test came first.

## Simplest-thing-that-works
In the green step, resist building for imagined needs. The next requirement arrives as the next failing test, and you grow the code to meet it — minimal design, every line justified by a test.

## The byproduct
Because every behavior was a failing test first, the whole suite is trustworthy by construction and coverage is high without chasing a number.

## When to relax it
TDD shines for logic with clear inputs/outputs (pricing, validation, parsing, state machines). For spikes or pure-UI tweaks you may explore first — but shipped behavior is tested behavior before merge.

## Gotchas
- Writing code first, then a confirming test (not TDD).
- Skipping "confirm it fails for the right reason"; over-building in green; never refactoring.
