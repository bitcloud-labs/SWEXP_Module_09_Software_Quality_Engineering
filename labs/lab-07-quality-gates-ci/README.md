# Lab 07 — Can We Trust This Release?

**Ticket:** GATE-4010 · **Goal:** parse a coverage report, implement the gate that **blocks** on a failing
test or sub-threshold coverage, and check the test pyramid shape — so "can we trust this release?" is a
status check, not a gut feeling.

Running real coverage (`--experimental-test-coverage`, a coverage tool, a CI dashboard) happens in your
LMS environment. The **autogradable core** is here: parse a coverage JSON into percentages, decide
pass/fail against a threshold, and verify the pyramid is bottom-heavy.

## What you do
In [`src/gate.ts`](src/gate.ts), implement three pure functions:

- `parseCoverage(raw)` — given `{ lines: { covered, total }, branches: { covered, total } }`, return
  `{ lines, branches }` as **integer percentages** (`Math.round(covered / total * 100)`; a `total` of 0
  is 100% — nothing to cover). This is the "parse a coverage report" core.
- `passesGate(summary, min = 80)` — given `{ lines, branches, testsFailed }`, return `{ pass, reason }`:
  block (`pass: false`) when `testsFailed > 0` (`reason` contains `tests`), or when `lines < min` or
  `branches < min` (`reason` contains `coverage`); otherwise `{ pass: true, reason: 'all gates green' }`.
- `pyramidOk(counts)` — given `{ unit, integration, e2e }`, return `true` only when the suite is
  bottom-heavy: `unit > integration && integration >= e2e`.

Run:
```bash
npx vitest run labs/lab-07-quality-gates-ci
```

## Definition of done
- All tests pass; `npm run check` is clean.
- The gate blocks on a failing test and on a coverage drop, and opens only when green and above the
  threshold over a healthy pyramid.

## Submit
Edit `src/`, run the tests, then commit and push.
