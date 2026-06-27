# Lab 00 — The Test Runner & Red/Green

**Ticket:** QUAL-1000 · **Goal:** confirm the runner, feel red→green, and see *why a test that can't fail proves nothing*.

In the LMS this lab runs against the built-in `node:test` runner. Here the harness is **vitest +
TypeScript (strict)** — identical assertions and discipline — so the autograder can score your work.

## What you do
In [`src/total.ts`](src/total.ts), implement two things:

- `total(items)` — sum the `price` of every item (the function under test).
- `expectEqual(actual, expected)` — a *tiny assertion helper*: return `true` when the values are
  strictly equal, **throw** an `Error` when they differ. This is the heart of every test runner — a
  test that can never throw can never fail, and a test that can never fail proves nothing.

Run:
```bash
npx vitest run labs/lab-00-setup
```

## Definition of done
- All tests pass; `npm run check` is clean.
- You understand the red/green loop: the provided tests show `expectEqual` going green on equal values
  and throwing (red) on unequal ones.

## Submit
Edit `src/`, run the tests, then commit and push.
