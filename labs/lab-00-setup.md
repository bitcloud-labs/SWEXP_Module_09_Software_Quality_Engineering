# Lab 00 — The Test Runner & Red/Green

**Lesson:** 00 · **Goal:** run the test runner, write a test that passes, then make it fail — and feel why a test that can't fail proves nothing.

## Goal
Confirm you can run `node:test`, see green and red, and demonstrate that a trivially-true "test" stays green against broken code.

## Setup
```bash
mkdir -p /tmp/forge-quality && cd /tmp/forge-quality
node --version    # node:test is built in — no install needed
```
`total.mjs`:
```js
export function total(items) { return items.reduce((s, i) => s + i.price, 0); }
```
`total.test.mjs`:
```js
import { test } from 'node:test';
import assert from 'node:assert';
import { total } from './total.mjs';

test('total sums item prices', () => {
  assert.strictEqual(total([{ price: 10 }, { price: 5 }]), 15);
});
```

## Tasks
1. **Green.** Run `node --test` and confirm the test passes.
2. **Red.** Break `total` (e.g. `s - i.price`) or the expectation, re-run, and confirm the runner reports a **failure** and exits **nonzero** (`echo $?`).
3. **A test that can't fail.** Add `test('useless', () => assert.ok(true))` and confirm it passes even while `total` is broken — proof that a test which never fails proves nothing.
4. **Restore** `total` to green.

## Verify (example)
```bash
node --test            # green: # pass 1 / # fail 0, exit 0
# break total, then:
node --test ; echo "exit=$?"   # red: # fail 1, exit 1
```

## Deliverable
`node --version`; the green run; the red run (with nonzero exit); and the trivially-true test passing against broken code.

## Cleanup
```bash
# keep /tmp/forge-quality — later labs build on it
```

## Check
`../solutions/lab-00-solution.md`.
