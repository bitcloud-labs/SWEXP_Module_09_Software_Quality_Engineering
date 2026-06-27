# Lab 05 — Never Write Untested Code Again

**Ticket:** TDD-3010 · **Goal:** build the Forge `applyCoupon` feature **test-first** — red → green →
refactor — never writing code for untested behavior.

The provided tests in [`tests/`](tests/) are the spec, written one behavior at a time (the order you'd
grow them in TDD). Implement the simplest code that turns each red test green, then refactor under green.

## What you do
In [`src/coupon.ts`](src/coupon.ts), implement `applyCoupon(total, coupon)` over a discriminated union:

- `{ type: 'flat', off }` — subtract `off` (a flat coupon of 20 on 100 → 80).
- `{ type: 'percent', pct }` — reduce by `pct` fraction (`0.1` on 100 → 90).
- **Cap at total:** a flat coupon larger than the total → **0** (never negative).
- **Reject invalid:** a negative `off`/`pct` (or a never-reached unknown variant) **throws** an error
  whose message contains `invalid`.

Run:
```bash
npx vitest run labs/lab-05-tdd
```

## Definition of done
- All behaviour and type-level tests pass; `npm run check` is clean.
- The `Coupon` type is the exact discriminated union (the `*.test-d.ts` check pins it).

## Submit
Edit `src/`, run the tests, then commit and push.
