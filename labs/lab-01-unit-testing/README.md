# Lab 01 — The Production Outage

**Ticket:** UNIT-1010 · **Goal:** reproduce the pricing outage as a failing unit test (already provided),
fix the function, and leave a regression suite covering the boundaries the outage lived in.

This is a **fix-the-bug** lab. The starter [`src/pricing.ts`](src/pricing.ts) ships the *buggy* Forge
pricing function — the one that took down checkout. The tests in [`tests/`](tests/) already encode the
**correct** behavior, so they start **red**. Make them green by fixing the cause.

## What you do
`finalPrice(price, pct)` applies a fractional discount `pct` (in `[0, 1]`) to `price`. The buggy version
subtracts an extra `1` and can go negative. Fix it so it:

- returns `price - price * pct` (a 20% discount on 100 is 80);
- a 0% discount is the full price; a 100% discount is **0, never negative**;
- **throws** when `pct` is outside `[0, 1]` (the error message must mention `discount`).

Run:
```bash
npx vitest run labs/lab-01-unit-testing
```

## Definition of done
- All tests pass (red → green); `npm run check` is clean.
- The boundaries (`pct = 0`, `pct = 1`) and the error path (`pct` out of range) are all covered —
  that single boundary test is what would have prevented the outage.

## Submit
Edit `src/`, run the tests, then commit and push.
