# Quality Gates & CI Guide

## The gate runs everything, on every change
CI runs unit + integration + e2e on each push/PR and reports one status:
```yaml
on: [push, pull_request]
jobs:
  quality:
    steps:
      - run: npm ci
      - run: node --test --experimental-test-coverage
      # nonzero exit (a failing test OR sub-threshold coverage) FAILS the job → blocks the merge
```

## Gates must block
A red suite that merges anyway is theater. `node --test` exits nonzero on failure, which fails the job, which blocks the merge. No green check, no merge.

## Coverage is a floor, not a trophy
Enforce a minimum so coverage can't silently erode — but covered ≠ tested (a line can run with no meaningful assertion). The goal is catching regressions and untested new code, not 100%.
```js
export function passesGate(summary, min = 80) {
  if (summary.testsFailed > 0) return { pass: false, reason: 'tests failed' };
  if (summary.lines < min || summary.branches < min) return { pass: false, reason: 'coverage below threshold' };
  return { pass: true };
}
```

## The pyramid keeps the gate fast and trustworthy
Most tests fast unit, fewer integration, fewest e2e — quick feedback, slow/brittle tests reserved for the few flows that need them. An inverted pyramid (mostly e2e) is slow and flaky: a gate no one trusts.

## Flaky tests poison the gate
An intermittently-failing test trains everyone to re-run until green and ignore red. Quarantine or fix it immediately — the gate is only as trustworthy as its least reliable test.

## The gate is the release decision
"Can we trust this release?" → green means the suite vouches for the change; red means it doesn't ship. Automatic, evidence-based, unskippable.

## Gotchas
- Tests that run but don't block; chasing a coverage number; an inverted pyramid; tolerating flakiness.
