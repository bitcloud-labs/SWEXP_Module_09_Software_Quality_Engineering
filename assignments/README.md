# Assignments — Software Quality Engineering

Each lesson has an assignment described in its `Lesson_NN.md`. Submit every one using `submission-template.md`, and back every claim with evidence — the real `node:test` output: the red run and the green run.

| File | Purpose |
|------|---------|
| `submission-template.md` | per-lesson submission format |
| `capstone-brief.md` | the full FORGE-9700 quality-platform specification |
| `capstone-submission-template.md` | the capstone quality-report format |

## What every submission must include
- **What you built** and *why this design* — what level, what's asserted (behavior vs internals), what's real vs doubled, what the gate blocks on.
- **Evidence:** the test failing first (red, the wrong value / nonzero exit), then passing (green); plus contract / journey / coverage / gate results where relevant.
- **The fix at the cause** — the missing boundary test, the behavior assertion, the seam wiring, the carried token, the real-vs-double decision, the blocking gate.
- **AI-usage log:** draft → verify (make it fail first) → log.
- **Clean commits** (your Module 02 Git skills apply).

## Grading
Against `../ASSESSMENT_RUBRIC.md`. The recurring standard: **a test must fail before you trust it; test behavior, not implementation; a bug is a missing test; double at the boundary, not the core; confidence, not coverage; quality is a gate, not a phase.**
