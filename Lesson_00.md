# Lesson 00 — Welcome to the Software Quality Engineering Team

> **Role:** Software Quality Engineer · **Competency:** Quality Engineering Orientation · **Track:** QUAL · **Est. time:** 2–3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      QUAL-1000
TITLE:       Onboard to the Project Forge quality effort
PRIORITY:    P1 — blocks all quality work
TYPE:        Onboarding
ASSIGNEE:    You (Software Quality Engineer)
DESCRIPTION: Forge now spans a frontend (M05), an API (M06), a data layer (M07),
             and a platform (M08) — but almost none of it is tested. Changes are
             shipped on hope, regressions slip through, and no one can answer "can
             we trust this release?" Your job is to make Forge software you can
             trust. Set up the test toolchain, write and run your first test, and
             learn the loop that underpins everything this module: a test must fail
             before it can prove anything.

ACCEPTANCE CRITERIA:
  - The test runner runs; you can write a test and see it pass and fail
  - You can explain why a test that has never failed proves nothing
  - You can describe the testing levels (unit → component → integration → e2e)
  - Your engineering notebook has a dated first entry
```

## 🏢 Business Context

Untested software is software you ship on faith. Every change might break something, every release is a gamble, and the only way bugs get found is when a customer hits them. Quality engineering replaces faith with *evidence*: automated tests that prove the code does what it should, run on every change, so the question "can we ship this?" has an answer backed by a green suite instead of a shrug. Tests are also how you change code fearlessly — a good suite tells you instantly when a refactor broke something, which is what lets a team move fast without breaking things.

## 🎯 Learning Objectives

- Set up the test runner and write a first test that passes *and* fails
- Explain why a test must be seen to fail to be trustworthy
- Describe the testing levels and what each is good at
- Connect testing to confidence: the goal is justified trust to ship

## 📚 Technical Deep Dive

**A test is an executable specification.** It states what the code should do, in code that runs:

```js
import { test } from 'node:test';
import assert from 'node:assert';

function total(items) { return items.reduce((s, i) => s + i.price, 0); }

test('total sums item prices', () => {
  assert.strictEqual(total([{ price: 10 }, { price: 5 }]), 15);
});
```

Run it with `node --test`. A passing test means the code met the spec *for that case*.

**The most important rule: a test must fail before it passes.** A test that has never failed proves nothing — it might be asserting something trivially true, or not exercising the code at all. The discipline (which becomes TDD in Lesson 5) is to *see red first*: write or run the test against code you know is wrong (or not yet written) and confirm it fails for the right reason, then make it pass. A test you didn't watch fail is a test you can't trust.

**The testing levels — match the tool to the question.**
| Level | Tests | Speed | Question it answers |
|-------|-------|-------|---------------------|
| Unit | one function/module in isolation | fastest | is this logic correct? |
| Component | a UI component's behavior | fast | does the user see the right thing? |
| Integration | several units together | medium | do the pieces work *together*? |
| End-to-end | a whole user flow | slowest | does the real journey work? |

Each catches bugs the others miss; you'll use all of them.

**Confidence, not coverage.** The goal isn't a coverage number — it's *justified confidence to ship*. Coverage is a proxy (and a useful one), but a suite that runs every line while asserting nothing meaningful gives false confidence. Always ask: if this code broke, would a test catch it?

### Common gotchas
- A test that never fails (asserts something trivially true, or doesn't run the code).
- Confusing "the tests pass" with "the code is correct" when the tests are weak.
- Chasing a coverage number instead of meaningful assertions.

## 🧪 Hands-on Labs

Work through **`labs/lab-00-setup.md`**: set up the runner, write a test for a small Forge function, watch it **pass**, then change the code (or the expectation) to make it **fail** and confirm the runner reports the failure with a nonzero exit — your first taste of red/green.

## 🔍 Engineering Investigation

Write a test that passes. Now break the function it tests and confirm the test goes red (and the runner exits nonzero). Then write a *second* "test" that asserts something trivially true (e.g. `assert.ok(true)`) and notice it passes even though the code is broken — proof that a test which can't fail proves nothing. Record both in your notebook.

## 🤖 AI Engineering Exercise

Ask an AI to "write tests for this function." **Draft** the tests, then **verify** the crucial thing: do they actually *fail* when the function is wrong? Break the function and run them. **Log** any test that stayed green against broken code — it was worthless. The loop all module: **draft → verify (run the test; confirm it fails without the fix and passes with it) → log.**

## 📝 Assignment

1. Set up the runner; paste `node --version` and a passing test run.
2. Complete the lab; include the green run, the red run, and the trivially-true test that stayed green.
3. Write a 5–8 sentence explainer: "why must a test fail before you trust it, and what is the difference between coverage and confidence?"
4. Commit your notebook.

## 🚀 Stretch Goal

Take a function you wrote in an earlier module and write the test you *wish* had existed — then introduce the bug it guards against and confirm the test catches it.

## ✅ Definition of Done

- [ ] Runner works; a test passes and (when the code breaks) fails
- [ ] A trivially-true test shown to pass against broken code
- [ ] "Why a test must fail first / coverage vs confidence" explainer written
- [ ] Notebook committed

## 🪞 Reflection

When has untested code cost you (or a team) before? Why is "the tests pass" only as trustworthy as the tests themselves?
