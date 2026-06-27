# Capstone Brief — FORGE-9700: Ship the Project Forge Quality Platform

> **Epic:** FORGE-9700 · **Role:** Software Quality Engineer (owner) · **Est. time:** 16–20 hours (staged) · **Submission:** `capstone-submission-template.md`

## The situation
*Project Forge* — a frontend (M05), an API (M06), a data layer (M07), on a platform (M08) — is shipped on hope. You own making it software the team can **trust**: a test suite at every level, a feature built test-first, principled test doubles, and a CI quality gate that blocks bad merges — shaped as a healthy test pyramid. You integrate everything from this module into one coherent quality platform and prove each quality bar with evidence.

The capstone introduces **no new concepts.** It tests **integration, test strategy, and judgment**: unit, component, integration, and e2e tests each answer a different question; TDD shapes the new code; doubles decide what's real; and the gate makes the whole thing the release decision. They interact — too many e2e tests and the gate is slow and flaky; mock the wrong thing and a green suite means nothing.

## Platform scope
A working Forge quality platform (a real, green, runnable suite) with at least:
- **Unit tests** for the logic, covering boundaries and error paths, each seen to fail first (Lesson 1).
- **Component tests** asserting user-facing behavior, refactor-safe (Lesson 2).
- **Integration tests** asserting the API contract through the real wired stack (Lesson 3).
- **At least one end-to-end test** for a critical journey, deterministic (Lesson 4).
- **A feature built test-first** — red → green → refactor, no untested behavior (Lesson 5).
- **Test doubles** at the boundary only; core logic real; the right double per case (Lesson 6).
- **A CI quality gate** that runs the suite and **blocks** on a failing test or sub-threshold coverage, over a healthy pyramid (Lesson 7).

## Build order (follow it)
1. **Unit + component** — pin the logic and the UI behavior with fast tests. (Lessons 1, 2)
2. **Integration** — assert the API contracts through the real wired stack. (Lesson 3)
3. **End-to-end** — one (or few) critical journey, deterministic. (Lesson 4)
4. **TDD feature** — build a new Forge feature test-first, red → green → refactor. (Lesson 5)
5. **Doubles** — double the boundaries (payment, clock, email), keep core logic real. (Lesson 6)
6. **Gate + report** — wire the CI quality gate (block on failure / sub-threshold coverage), shape the pyramid, assemble the report. (Lesson 7)

Keep every test honest (seen to fail first) and the suite green throughout; build in small, verified increments.

## Phases (stage the work)
- **Phase A — Testing fundamentals (unit + component).**
- **Phase B — Testing the system (integration + e2e).**
- **Phase C — Discipline & design (TDD feature + doubles).**
- **Phase D — Release confidence (gate + pyramid + report).**

## Acceptance criteria → rubric mapping
| Acceptance criterion | Rubric category |
|----------------------|-----------------|
| Unit tests cover logic incl. boundaries/errors, each seen to fail first | Unit Testing (10%) |
| Component tests assert user-facing behavior, refactor-safe | Component Testing (10%) |
| Integration tests assert the API contract through the real stack | Integration Testing (15%) |
| At least one deterministic e2e test for a critical journey | End-to-End Testing (15%) |
| A feature built test-first (red → green → refactor log) | TDD Discipline (15%) |
| CI quality gate runs the suite and blocks on failure / low coverage | CI & Quality Gates (10%) |
| The quality report documents each bar with reproducible evidence | Documentation (10%) |
| Sound test strategy; right level per risk; doubles at the boundary; no vacuous tests | Engineering Judgment (10%) |
| AI used as draft → verify (make it fail first) → log | AI Workflow (5%) |

## Deliverables
1. **The working quality platform** — a real, green, runnable suite at every level (unit, component, integration, e2e), a TDD-built feature, principled doubles, and a CI quality gate over a healthy pyramid. Reuse the lab harnesses (real `node:test`, the in-process server, `mock.fn()`, coverage) so the suite is checkable.
2. **A quality report** proving each bar with evidence: a unit bug reproduced red then fixed green; a component test that catches a wrong display and survives a refactor; an integration test asserting the contract and catching a seam bug; an e2e test driving the critical journey to its outcome; the feature's red→green→refactor log; the boundary-vs-core doubling decisions (with a vacuous self-mock fixed); and the gate blocking on a failing test and on a coverage drop, plus the pyramid shape.
3. **The engineering notebook**, including the **AI-usage log**.
4. **A "release confidence" summary** — what the suite vouches for and how you verified it.

## Definition of done
- [ ] Unit tests (boundaries/errors), each seen to fail first
- [ ] Component tests asserting user-facing behavior, refactor-safe
- [ ] Integration tests asserting the API contract through the real stack
- [ ] At least one deterministic e2e test for a critical journey
- [ ] A feature built test-first (red → green → refactor log)
- [ ] Doubles at the boundary only; core real; right double per case
- [ ] CI quality gate runs the suite and BLOCKS on failure / sub-threshold coverage
- [ ] Healthy pyramid; quality report + notebook + AI log complete and reproducible

## The standard
A test must fail before you trust it; test behavior, not implementation; a bug is a missing test; double at the boundary, not the core; confidence, not coverage; quality is a gate, not a phase. A unit test that reproduces a bug red-then-green, a component test that survives a refactor, an integration test that catches a seam, an e2e test that drives the real journey, a feature grown test-first, doubles only at the boundary, and a gate that actually blocks are how "quality platform" becomes true rather than asserted.
