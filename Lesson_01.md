# Lesson 01 — The Production Outage

> **Role:** Software Quality Engineer · **Competency:** Unit Testing · **Track:** UNIT · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      UNIT-1010
TITLE:       A pricing edge case took down checkout in production
PRIORITY:    P0 — post-incident
TYPE:        Bug / Test
DESCRIPTION: Forge's checkout miscalculated a discounted total at a boundary
             (a 100% discount produced a negative charge), and it shipped because
             the function had no tests. Write unit tests that pin down the function's
             behavior — including the boundaries and error paths that caused the
             outage — turn the bug into a failing test, fix it, and leave a
             regression suite so this exact class of bug can never ship silently again.

ACCEPTANCE CRITERIA:
  - The bug is reproduced as a failing unit test FIRST (red), then fixed (green)
  - Tests cover the happy path, boundaries, and error/edge cases
  - Tests are isolated (pure logic, no I/O), fast, and deterministic
  - A bug = a missing test: the regression test stays in the suite
```

## 🏢 Business Context

The outage didn't happen because the engineer was careless — it happened because nothing *checked* the boundary. Unit tests are the cheapest, fastest line of defense: they pin down a single function's behavior, including the edge cases humans skip, and they run in milliseconds on every change. The discipline that prevents repeat outages is simple and non-negotiable: **a bug is a missing test.** Every bug becomes a failing test that you then make pass, so the bug can never silently return. That regression suite is the institutional memory of every mistake the team has already made.

## 🎯 Learning Objectives

- Write isolated, fast, deterministic unit tests for pure logic
- Reproduce a bug as a failing test *first*, then fix it (red → green)
- Cover happy path, boundaries, and error/edge cases deliberately
- Treat every bug as a missing regression test

## 📚 Technical Deep Dive

**Reproduce the bug as a failing test first.** Before fixing anything, write the test that the buggy code fails:

```js
import { test } from 'node:test';
import assert from 'node:assert';
import { finalPrice } from './pricing.js';

test('100% discount makes the price zero, never negative', () => {
  assert.strictEqual(finalPrice(100, 1.0), 0);   // buggy code returns -? → RED
});
```
Run it, watch it go **red** for the right reason — that's your proof the test exercises the bug. *Then* fix `finalPrice` and watch it go **green**.

**Cover the cases that actually break.** The happy path rarely breaks in production; the edges do. For each function, deliberately test:
- **Happy path:** the normal case (`finalPrice(100, 0.2) === 80`).
- **Boundaries:** 0, the maximum, empty input, one element (`finalPrice(100, 0)`, `finalPrice(100, 1)`).
- **Error/edge paths:** invalid input, negative, overflow — what *should* happen, and that it does.

```js
test('rejects a discount above 100%', () => {
  assert.throws(() => finalPrice(100, 1.5), /invalid discount/);
});
```

**Isolated, fast, deterministic.** A unit test touches no network, disk, clock, or randomness — just the function. That makes it fast (run thousands in seconds) and reliable (same result every time). If a function mixes logic with I/O, that's a design smell; extract the pure logic so it's testable (and Lesson 6 covers doubling the I/O).

**Good assertions are specific.** Assert the exact expected value, not just "it didn't throw." `assert.strictEqual(result, 0)` catches a regression that `assert.ok(result !== null)` would sail past.

**A bug is a missing test.** The fix isn't done when the code works — it's done when there's a test that *fails without the fix*. That test stays forever as a regression guard. Over time, the suite encodes every bug the team has learned about.

### Common gotchas
- Fixing the bug before writing the failing test (you never proved the test catches it).
- Testing only the happy path (the boundaries are where outages live).
- Weak assertions (`assert.ok(result)`) that pass against wrong values.
- Hidden I/O/clock/randomness making a "unit" test slow or flaky.

## 🧪 Hands-on Labs

Work through **`labs/lab-01-unit-testing.md`**. You'll get the buggy Forge pricing function, **reproduce the outage as a failing unit test** (real `node:test` — you'll see it go red), fix the function (green), then add boundary and error-path tests. You'll also write a deliberately weak assertion and watch it stay green against broken code, to feel why specific assertions matter.

## 🔍 Engineering Investigation

Run the regression test against the buggy code and record the red output (the wrong value it returned). Fix the function and record the green run. Then enumerate the boundaries/error paths and add a test for each, noting which ones would have failed against the original bug. End with: which single missing test would have prevented the outage?

## 🤖 AI Engineering Exercise

Ask an AI to "write unit tests for this pricing function." **Verify** the essential property: temporarily reintroduce the bug and run the AI's tests — do they catch it? **Log** any test that stayed green against the bug (worthless) and any boundary/error case the AI skipped, and add the missing tests yourself.

## 📝 Assignment

Submit: the bug reproduced as a failing test (red output), the fix (green), the boundary + error-path tests, the weak-assertion demonstration, and a note on the one missing test that would have prevented the outage.

## 🚀 Stretch Goal

Use a table-driven / parameterized test (an array of `[input, expected]` cases in a loop) to cover many boundaries compactly, and explain when that's clearer than separate tests.

## ✅ Definition of Done

- [ ] Bug reproduced as a failing test FIRST, then fixed (red → green shown)
- [ ] Happy path, boundaries, and error/edge cases covered
- [ ] Tests isolated, fast, deterministic; assertions specific
- [ ] Weak-assertion pitfall demonstrated
- [ ] Regression test remains in the suite

## 🪞 Reflection

Which boundary would you have skipped, and that's exactly where the outage lived? Why is "fix the bug" not done until there's a test that fails without the fix?
