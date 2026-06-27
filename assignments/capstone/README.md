# Capstone — FORGE-9700: Ship the Project Forge Quality Platform

**Epic:** FORGE-9700 · **Role:** Software Quality Engineer (owner)

This is the integrated exercise: **no new concepts**, but you assemble the whole module — the production
logic that needed a regression test, a feature grown test-first, principled test doubles at the boundary,
and the CI quality gate over a healthy pyramid — into one coherent, type-safe module. The full **quality
report + engineering notebook** (with red→green evidence at every level and the AI-usage log) are
submitted via the LMS using [`../capstone-submission-template.md`](../capstone-submission-template.md);
the code below is the part the autograder scores.

## What you do
Implement every `// TODO` in [`src/forge.ts`](src/forge.ts):

| Concern | What to do | From |
| --- | --- | --- |
| Unit logic | `finalPrice` — discount clamped to ≥ 0, reject out-of-range | lab-01 |
| TDD feature | `applyCoupon` over a discount union (cap at 0, reject invalid) | lab-05 |
| Test doubles | `createSpy` + `checkout` (real pricing, doubled boundary) | lab-06 |
| Quality gate | `parseCoverage` + `passesGate` (block on failure / low coverage) | lab-07 |
| Pyramid | `pyramidOk` — the suite is bottom-heavy | lab-07 |

These are exactly the quality bars from the brief — a unit bug pinned by a regression test, a feature
built test-first, doubles only at the boundary (core kept real, verified by the spy), and a gate that
actually blocks — assembled into one runnable platform.

Run:
```bash
npx vitest run assignments/capstone     # behaviour
npm run test:types                       # type-level (the union shape)
npm run check                            # strict, clean
```

## Definition of done
- All capstone tests pass and the project type-checks clean — **zero** `any` / `as` / `@ts-ignore`.
- Your LMS quality report documents each bar with reproducible evidence (the red run, then the green),
  the boundary-vs-core doubling decisions, and the gate blocking on a failing test and on a coverage drop.

## The standard
A test must fail before you trust it; test behavior, not implementation; a bug is a missing test; double
at the boundary, not the core; confidence, not coverage; quality is a gate, not a phase.
