# FORGE-9700 Capstone Submission — [Your Name]

**Date:** [date] · **Time spent:** [hours] · **Repo:** [link]

## Executive summary
2–4 sentences: what you shipped, your test strategy (the build order), and the headline result — what the suite lets the team trust about a release, and how you know.

## Per-phase record
Repeat for each phase (A fundamentals → B the system → C discipline & design → D release confidence).

### Phase X — [name]
- **What I built:** [unit / component / integration / e2e tests / TDD feature / doubles / gate]
- **Key decisions & why:** [the level, behavior vs internals, real vs doubled, what the gate blocks on]
- **Evidence:** the red run, the green run, contract / journey / coverage / gate results

```js
// representative test or code for this phase
```

## Unit testing
The logic tests incl. boundaries/errors; a bug reproduced red then fixed green.

## Component testing
A test asserting user-facing behavior that catches a wrong display and survives a behavior-preserving refactor.

## Integration testing
Tests driving the real wired stack; the HTTP contract (status + shape + errors); a seam bug units missed.

## End-to-end testing
The critical journey driven to its outcome (carrying real state); a cross-feature break reproduced then fixed; the deterministic, few-and-critical rationale.

## TDD discipline
The feature's red → green → refactor log — each behavior a failing test before its implementation; at least one refactor under green.

## Test doubles
The per-dependency real-vs-double classification (boundary doubled, core real); the right double per case; the vacuous self-mock fixed (now catches a real bug); evidence of a fast, deterministic suite (spy verifies an interaction; injected clock stabilizes a timestamp).

## CI & quality gate
The gate running the suite with coverage; blocking on a failing test and on a sub-threshold coverage drop; opening when green; the test-pyramid classification of your suite.

## Release confidence summary
What the suite vouches for and how you verified it (covered ≠ tested — name a place coverage was high but confidence wasn't).

## AI-usage log
| Asked | AI suggested | Verified (made it fail first?) | Outcome |
|-------|-------------|-------------------------------|---------|
| | | | |
Include at least one case where verification **overruled** the AI (a test that stayed green against broken code, an internals assertion, a vacuous self-mock, a flaky test, a gate that didn't block).

## Reflection
The integration decision with the widest blast radius; where a quality bar forced a change you'd have skipped under time pressure; how you'd evolve the suite next (mutation testing, property-based tests, flaky-test detection).

---
**Self-check vs rubric:** [ ] Unit [ ] Component [ ] Integration [ ] End-to-End [ ] TDD Discipline [ ] CI & Quality Gates [ ] Documentation [ ] Engineering Judgment [ ] AI Workflow
