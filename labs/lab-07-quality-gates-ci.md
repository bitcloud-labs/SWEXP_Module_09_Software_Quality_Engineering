# Lab 07 — Can We Trust This Release?

**Lesson:** 07 · **Goal:** run the suite with real coverage, implement a gate that blocks on a failing test or sub-threshold coverage, and check the test pyramid shape.

## Goal
Make the gate the release decision: green suite + coverage ≥ threshold opens it; a failing test or a coverage drop blocks it (nonzero).

## Setup
```bash
cd /tmp/forge-quality
# a module + its tests; run with coverage:
node --test --experimental-test-coverage
```
The gate logic, `gate.mjs`:
```js
// summary: { lines, branches, testsFailed } ; min coverage threshold
export function passesGate(summary, min = 80) {
  if (summary.testsFailed > 0) return { pass: false, reason: 'tests failed' };
  if (summary.lines < min) return { pass: false, reason: `line coverage ${summary.lines}% < ${min}%` };
  if (summary.branches < min) return { pass: false, reason: `branch coverage ${summary.branches}% < ${min}%` };
  return { pass: true, reason: 'all gates green' };
}
```

## Tasks
1. **Run with coverage.** `node --test --experimental-test-coverage`; read the line/branch %.
2. **Implement the gate** (`passesGate`) — block on any failing test or sub-threshold coverage.
3. **Prove it blocks on a failing test:** feed a summary with `testsFailed: 1` → gate **blocks** regardless of coverage.
4. **Prove it blocks on a coverage drop:** remove a test (or add untested code) so coverage falls below the threshold → gate **blocks**.
5. **Prove it opens** when the suite is green and coverage ≥ threshold.
6. **Pyramid check:** count your tests by level (unit/integration/e2e) and confirm it's bottom-heavy (many unit, fewer integration, fewest e2e).

## Verify (example)
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { passesGate } from './gate.mjs';
test('blocks on a failing test', () => assert.strictEqual(passesGate({ lines: 95, branches: 95, testsFailed: 1 }).pass, false));
test('blocks on low coverage', () => assert.strictEqual(passesGate({ lines: 70, branches: 90, testsFailed: 0 }).pass, false));
test('opens when green and above threshold', () => assert.strictEqual(passesGate({ lines: 88, branches: 85, testsFailed: 0 }).pass, true));
// pyramid shape
function pyramidOk(counts) { return counts.unit > counts.integration && counts.integration >= counts.e2e; }
test('healthy pyramid', () => assert.ok(pyramidOk({ unit: 20, integration: 6, e2e: 2 })));
```
```bash
node --test gate.test.mjs
```

## Deliverable
The suite running with coverage (the numbers), the gate blocking on a failing test and on a sub-threshold drop (and opening when green), the test-pyramid classification of your suite, and a note on a place coverage was high but confidence wasn't (covered ≠ tested).

## Cleanup
```bash
rm -f /tmp/forge-quality/gate*.mjs
```

## Check
`../solutions/lab-07-solution.md`.
