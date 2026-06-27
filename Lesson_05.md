# Lesson 05 — Never Write Untested Code Again

> **Role:** Software Quality Engineer · **Competency:** Test-Driven Development · **Track:** TDD · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      TDD-3010
TITLE:       New features keep shipping with thin, after-the-fact tests
PRIORITY:    P1
TYPE:        Practice / Feature
DESCRIPTION: Tests written after the code tend to confirm whatever the code already
             does — including its bugs — and skip the hard cases. Adopt test-driven
             development for a new Forge feature: write the failing test first, make
             it pass with the simplest code, then refactor under a green suite. Build
             the feature entirely through red → green → refactor so the tests drive
             the design and nothing ships untested.

ACCEPTANCE CRITERIA:
  - Every behavior is a failing test BEFORE its implementation (red first)
  - The simplest code that passes is written next (green), then refactored
  - The commit history / log shows the red → green → refactor rhythm
  - The feature emerges test-first; no untested behavior
```

## 🏢 Business Context

Tests written *after* the code have a quiet flaw: they tend to assert whatever the code already does, bugs included, and they skip the cases the author didn't think of — which are the cases that break. Test-driven development inverts the order: you write the failing test first, so the test is honest (you watched it fail), the code is shaped by how it's used rather than by its internals, and you literally cannot ship untested behavior because the test came first. TDD isn't about testing more — it's a design discipline that happens to leave a complete test suite behind.

## 🎯 Learning Objectives

- Practice the red → green → refactor cycle on a real feature
- Write the failing test first and confirm it fails for the right reason
- Make it pass with the simplest code, then refactor under green
- Let tests drive the design (usage-first), leaving full coverage as a byproduct

## 📚 Technical Deep Dive

**Red → Green → Refactor.** The whole cycle, repeated in tiny steps:

1. **Red** — write one small failing test for the next bit of behavior. Run it; confirm it fails *for the right reason* (the behavior doesn't exist yet, not a typo).
   ```js
   test('applyCoupon reduces total by the coupon amount', () => {
     assert.strictEqual(applyCoupon(100, { off: 20 }), 80);   // applyCoupon doesn't exist → RED
   });
   ```
2. **Green** — write the *simplest* code that makes it pass. Not the elegant version — the simplest:
   ```js
   export function applyCoupon(total, coupon) { return total - coupon.off; }   // GREEN
   ```
3. **Refactor** — now that it's green, improve the code (and tests) without changing behavior; the green suite guards you.

Then repeat for the next behavior (a percentage coupon, a coupon that can't exceed the total, an invalid coupon). Each is a red test first.

**Tests drive the design.** Writing the test first forces you to use the code before you build it — so you design the *interface* (what `applyCoupon` takes and returns) from the caller's point of view, not from the implementation outward. Code designed this way tends to be more decoupled and easier to test, because it *was* tested from the first line.

**Simplest-thing-that-works prevents over-engineering.** In the green step you resist building for imagined future needs; you write just enough to pass the current test. The next requirement arrives as the next failing test, and you grow the code to meet it. This keeps the design minimal and every line justified by a test (it connects to Module 08's "no over-engineering" and Module 04's discipline).

**The byproduct is a trustworthy suite.** Because every behavior was a failing test first, every test has been seen to fail — so the whole suite is trustworthy by construction, and coverage is high without chasing a number. "Never write untested code again" is literally what the cycle enforces.

**When TDD shines (and when to relax it).** TDD is strongest for logic with clear inputs/outputs (pricing, validation, parsing, state machines). For exploratory spikes or pure-UI tweaks you might explore first, but you still arrive at tests before merging. The non-negotiable is that shipped behavior is tested behavior.

### Common gotchas
- Writing the code first, then a test that just confirms it (not TDD; the test never failed honestly).
- Skipping the "confirm it fails for the right reason" step.
- Writing too much in the green step (over-engineering ahead of a test).
- Never refactoring (green-on-green) so the design rots even with tests.

## 🧪 Hands-on Labs

Work through **`labs/lab-05-tdd.md`**. You'll build a Forge coupon/pricing feature **entirely test-first** with real `node:test`: for each behavior you write the failing test, run it and capture the **red**, write the simplest passing code and capture the **green**, then refactor under green. The lab walks several cycles (flat coupon → percentage → cap at total → reject invalid), and you'll produce a red→green log proving each test failed before it passed.

## 🔍 Engineering Investigation

For each behavior, record the red run (the test failing because the code doesn't exist / is wrong yet) and the green run (after the simplest implementation). Show one refactor performed under a green suite (improving the code without changing behavior, tests still green). End by contrasting the cases your test-first cycle surfaced with the ones you suspect an after-the-fact test would have skipped.

## 🤖 AI Engineering Exercise

Use an AI in a TDD loop: *you* write the failing test first; ask the AI for the simplest code to pass it. **Verify** the test was red before the AI's code and green after, and that the AI didn't over-build beyond the test. **Log** any time the AI wrote code for untested behavior (delete or test it) — the test, written first, stays in charge.

## 📝 Assignment

Submit: the feature built test-first with a red→green log for each behavior, at least one refactor under green, evidence no behavior was implemented before its test, and a note on a case the test-first approach caught that you'd likely have missed writing tests after.

## 🚀 Stretch Goal

Take a bug from an earlier lesson and fix it TDD-style end to end (failing regression test → minimal fix → refactor), and reflect on how TDD and "a bug is a missing test" are the same discipline from two directions.

## ✅ Definition of Done

- [ ] Every behavior had a failing test first (red), confirmed failing for the right reason
- [ ] Simplest passing code next (green), then a refactor under green
- [ ] Red → green → refactor rhythm visible in the log/history
- [ ] Feature emerged test-first; no untested behavior
- [ ] Over-engineering avoided (only enough code to pass)

## 🪞 Reflection

What did writing the test first change about the *design* of your code? Where were you tempted to write code ahead of a test, and why is that the habit TDD is built to break?
