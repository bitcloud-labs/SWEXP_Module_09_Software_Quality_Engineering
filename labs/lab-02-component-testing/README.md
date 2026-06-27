# Lab 02 — Components That Lie

**Ticket:** COMP-2001 · **Goal:** model a component's render as a function of props and test the
**user-facing output**, so the test catches a wrong display and survives a refactor.

In your real project these assertions run against the rendered DOM via a React testing library + jsdom
(`getByText('Total: $80.00')`). Here the rendered output is a plain string verified with **vitest** —
identical assertions and discipline, and autogradable.

## What you do
In [`src/summary.ts`](src/summary.ts), implement the order-summary component's pure logic:

- `formatTotal(items)` — sum each item's `priceCents`, return a user-facing dollar string:
  `$` + dollars with **two decimals** (`5000 + 3000` → `'$80.00'`). Divide cents by **100**.
- `renderSummary(items)` — return `{ totalText: 'Total: ' + formatTotal(items) }` (what the user sees).

The provided tests assert on `renderSummary(...).totalText` — the **behavior**, not internal cents. A
test that read raw cents would "lie" (stay green on a display bug); a behavior test goes red on the bug
and survives a behavior-preserving refactor.

Run:
```bash
npx vitest run labs/lab-02-component-testing
```

## Definition of done
- All tests pass; `npm run check` is clean.
- Your assertions are on user-facing output, so they would catch a divide-by-10 display bug.

## Submit
Edit `src/`, run the tests, then commit and push.
