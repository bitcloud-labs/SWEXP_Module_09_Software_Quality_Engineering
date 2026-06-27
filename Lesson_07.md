# Lesson 07 — Can We Trust This Release?

> **Role:** Software Quality Engineer · **Competency:** Quality Gates & CI · **Track:** GATE · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      GATE-4010
TITLE:       "Can we ship?" is still answered by a gut feeling
PRIORITY:    P1
TYPE:        Automation
DESCRIPTION: Forge has tests now, but they're run inconsistently and nothing stops
             a merge when they fail or when coverage drops. Build the quality gates:
             wire the test suite into CI so every change runs unit + integration +
             e2e, enforce a coverage threshold, and block the merge on any failure —
             so "can we trust this release?" is answered by a green gate, not a
             gut feeling. Balance the suite as a test pyramid for fast, trustworthy feedback.

ACCEPTANCE CRITERIA:
  - CI runs the test suite (unit + integration + e2e) on every push/PR
  - A failing test or a coverage drop below the threshold BLOCKS the merge
  - The suite is shaped like a pyramid (many unit, fewer integration, fewest e2e)
  - The gate's verdict is the release decision: green = trustworthy, red = blocked
```

## 🏢 Business Context

Tests only build confidence if they actually run and actually block bad changes. A suite that's run "when someone remembers," or that's red and ignored, provides no protection — it's theater. Quality gates make trust automatic: every change runs the full suite in CI, coverage can't silently erode, and a red result *blocks the merge* rather than being waved through. That turns "can we ship?" from a meeting into a status check. It's the same lesson as Module 08's unskippable pipeline, now pointed at *quality*: the gate is the release decision, and it can't be skipped under pressure.

## 🎯 Learning Objectives

- Wire the test suite into CI to run on every change
- Enforce a coverage threshold and block merges on failure/regression
- Shape the suite as a test pyramid for fast, trustworthy feedback
- Make the gate's verdict the release decision

## 📚 Technical Deep Dive

**The gate runs everything, on every change.** CI runs unit, integration, and e2e tests on each push/PR and reports a single status:

```yaml
# quality gate (CI), shape similar across systems
on: [push, pull_request]
jobs:
  quality:
    steps:
      - run: npm ci
      - run: node --test --experimental-test-coverage   # unit + integration + e2e
      # the job fails (nonzero exit) if any test fails or coverage is below threshold
```
A failing test makes the runner exit nonzero, which fails the job, which **blocks the merge**. No green check, no merge.

**Coverage as a threshold, not a trophy.** Enforce a *minimum* (e.g. lines/branches ≥ 80%) so coverage can't silently erode — but remember coverage is a proxy for confidence, not the goal. The gate's job is to stop *regressions* in coverage and catch *untested* new code, not to chase 100%. A line can be covered and still untested if nothing asserts on its effect (Lesson 0).

```js
// a simple gate check over a coverage summary
function passesGate(summary, min = 80) {
  return summary.lines >= min && summary.branches >= min && summary.testsFailed === 0;
}
```

**The test pyramid keeps the gate fast and trustworthy.** A gate that takes an hour gets bypassed; a flaky gate gets ignored. Shape the suite so most tests are fast unit tests, fewer are integration, fewest are e2e:
```
        /\     e2e          ← few   (slow, critical journeys)
       /  \    integration  ← some  (seams, contracts)
      /____\   unit         ← many  (fast, all the logic)
```
This gives quick feedback on most failures and reserves the slow/brittle tests for the few flows that need them. An inverted pyramid (mostly e2e) is slow and flaky — a gate no one trusts.

**Flaky tests poison the gate.** A test that fails intermittently trains everyone to re-run until green and ignore red — which defeats the gate. Quarantine or fix flaky tests immediately; a gate is only as trustworthy as its least reliable test.

**The gate is the release decision.** "Can we trust this release?" is answered by the gate: green means the suite (which you've made trustworthy across this module) vouches for the change; red means it doesn't ship. The decision is automatic, evidence-based, and unskippable — which is exactly what lets the team ship often without fear.

### Common gotchas
- Tests that run but don't *block* (a red suite that merges anyway — theater).
- Chasing a coverage number instead of meaningful tests (covered ≠ tested).
- An inverted pyramid (mostly slow e2e) → a gate too slow/flaky to trust.
- Tolerating flaky tests (the whole team learns to ignore red).

## 🧪 Hands-on Labs

Work through **`labs/lab-07-quality-gates-ci.md`**. You'll run the Forge suite with **real coverage** (`node --test --experimental-test-coverage`), implement the **gate logic** (`passesGate`) that fails on any failing test or sub-threshold coverage, and prove it: a passing suite above threshold opens the gate; a failing test or a coverage drop **blocks** it (nonzero). You'll also classify the suite's tests into the pyramid and check the shape. Runnable here.

## 🔍 Engineering Investigation

Run the suite with coverage and record the numbers. Drop a test (or add untested code) and show coverage fall below the threshold and the gate block. Reintroduce a failing test and show the gate block on the failure regardless of coverage. Then count your tests by level and assess the pyramid shape — are you top-heavy with slow e2e? Record the gate's verdict in each case.

## 🤖 AI Engineering Exercise

Ask an AI to "set up a CI quality gate." **Verify** it actually *blocks* on failing tests and on coverage below the threshold (not just runs the tests), and that it runs the whole suite. Make a test fail and drop coverage — does the gate go red? **Log** where it ran tests without blocking, or treated coverage as a target rather than a floor, and fix it.

## 📝 Assignment

Submit: the suite running with coverage, the gate logic blocking on a failing test and on a sub-threshold coverage drop (with evidence of both red and the green pass), the test-pyramid classification of your suite, and a note on one place coverage was high but confidence wasn't (covered ≠ tested).

## 🚀 Stretch Goal

Add a flaky-test detector (run the suite N times; flag any test with inconsistent results) or a per-directory coverage threshold, and explain how it strengthens the gate's trustworthiness.

## ✅ Definition of Done

- [ ] CI runs unit + integration + e2e on every change
- [ ] A failing test or sub-threshold coverage BLOCKS the merge (shown red and green)
- [ ] Suite shaped as a pyramid (many unit, fewer integration, fewest e2e)
- [ ] Coverage treated as a floor/proxy, not the goal
- [ ] The gate's verdict is the release decision

## 🪞 Reflection

What turns a test suite from "we have tests" into "we can trust this release"? Why is a flaky test worse than a missing one when it sits in the gate?
