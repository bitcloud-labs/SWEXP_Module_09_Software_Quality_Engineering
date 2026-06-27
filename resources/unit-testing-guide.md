# Unit Testing Guide

## What a unit test is
One function/module, in isolation, no I/O — fast and deterministic.
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { finalPrice } from './pricing.mjs';
test('20% off 100 = 80', () => assert.strictEqual(finalPrice(100, 0.2), 80));
```

## Cover the cases that break
The happy path rarely breaks in production; the edges do.
- **Happy path:** the normal case.
- **Boundaries:** 0, max, empty, one element, the exact limit.
- **Error/edge:** invalid input → what *should* happen (often a throw).
```js
test('rejects discount > 100%', () => assert.throws(() => finalPrice(100, 1.5), /discount/));
```

## Reproduce a bug as a failing test first
A bug is a missing test. Before fixing, write the test the buggy code fails; watch it go **red** for the right reason; then fix to **green**. That test stays as a regression guard.

## Specific assertions
`assert.strictEqual(result, 0)` catches a regression that `assert.ok(result !== null)` sails past. Assert the exact expected value.

## Isolated = fast + reliable
No network, disk, clock, or randomness in a unit test. If a function mixes logic with I/O, extract the pure logic (and double the I/O — Lesson 6).

## Gotchas
- Fixing before writing the failing test.
- Happy-path-only suites; weak assertions; hidden I/O/clock making it flaky.
