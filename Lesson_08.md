# Lesson 08 — Project Forge Quality Platform

> **Role:** Software Quality Engineer · **Competency:** Production Quality Platform · **Track:** CAP · **Est. time:** 16–20 hours

---

## 🎫 Engineering Ticket

```
EPIC:        FORGE-9700
TITLE:       Ship the Project Forge quality platform
PRIORITY:    P1 — module capstone
TYPE:        Epic (integrative)
DESCRIPTION: You own making Forge software the team can trust. Integrate everything:
             unit tests for the logic, component tests for the UI, integration tests
             for the API contracts, end-to-end tests for the critical journeys, a
             TDD-built feature, principled test doubles at the boundaries, and a CI
             quality gate that blocks bad merges — shaped as a healthy test pyramid.
             Ship a coherent quality platform and a report that proves each quality
             bar with evidence (red→green, contracts, the journey, coverage, the gate).

ACCEPTANCE CRITERIA: (full mapping in assignments/capstone-brief.md)
  - Unit tests covering logic incl. boundaries/errors, each seen to fail first
  - Component tests asserting user-facing behavior, refactor-safe
  - Integration tests asserting the API contract through the real wired stack
  - At least one end-to-end test for a critical journey, deterministic
  - A feature built test-first (red → green → refactor), no untested behavior
  - Test doubles at the boundary only; core logic real; right double per case
  - A CI quality gate that runs the suite and BLOCKS on failure / sub-threshold coverage
  - A healthy test pyramid and a quality report proving each bar with evidence
```

## 🏢 Business Context

This is the job: take Forge from "shipped on hope" to "shipped on evidence." Building a quality platform is an exercise in integration and judgment — unit, component, integration, and e2e tests each answer a different question, TDD shapes the new code, doubles decide what's real, and the gate makes the whole thing the release decision. They interact: too many e2e tests and the gate is slow and flaky; mock the wrong thing and a green suite means nothing. Any one technique is straightforward; composing them into a suite the team *trusts enough to ship behind* is the skill.

## 🎯 Learning Objectives

Integrate every module competency into a shippable quality platform: unit, component, integration, and e2e tests; a TDD-built feature; principled test doubles; and a CI quality gate over a healthy test pyramid — all documented with reproducible evidence (red→green, contracts, the journey, coverage, the gate's verdict).

## 📚 Technical Deep Dive

No new concepts — the capstone tests **integration, test strategy, and judgment.** The full specification, the scope, the recommended build order, and the acceptance-criteria → rubric mapping live in **`assignments/capstone-brief.md`**; read it first and trace each criterion to the evidence you'll produce.

A sound build order (detailed in the brief):

1. **Unit + component** — pin the logic and the UI behavior with fast tests (Lessons 1, 2).
2. **Integration** — assert the API contracts through the real wired stack (Lesson 3).
3. **End-to-end** — one (or few) critical journey, deterministic (Lesson 4).
4. **TDD feature** — build a new Forge feature test-first, red → green → refactor (Lesson 5).
5. **Doubles** — double the boundaries (payment, clock, email), keep core logic real (Lesson 6).
6. **Gate + report** — wire the CI quality gate (block on failure / sub-threshold coverage), shape the pyramid, assemble the report (Lesson 7).

Keep every test honest (seen to fail first) and the suite green throughout; build in small, verified increments.

## 🧪 Hands-on Labs

The capstone *is* the lab. The unit/component/integration/e2e tests, the TDD feature, the doubles, and the gate reuse the earlier lab harnesses (real `node:test`, the in-process server, `mock.fn()`, coverage), so you ship a real, runnable suite and the evidence (red→green runs, contract assertions, the journey, the coverage number, the gate verdict) is reproducible.

## 🔍 Engineering Investigation

Investigation is the deliverable. The quality report must show, with evidence: a unit bug reproduced red then fixed green; a component test that catches a wrong display and survives a refactor; an integration test asserting the HTTP contract and catching a seam bug; an e2e test driving the critical journey to its outcome; a feature's red→green→refactor log; the boundary-vs-core doubling decisions (with a vacuous self-mock fixed); and the CI gate blocking on a failing test and on a coverage drop, plus the pyramid shape. End with a "release confidence" summary: what the suite vouches for and how you know.

## 🤖 AI Engineering Exercise

Use AI throughout as a professional would — to draft tests, a feature, doubles, a gate — **but every use follows draft → verify (run the test; confirm it fails without the fix and passes with it) → log.** Maintain an AI-usage log. The recurring failures to catch: tests that stay green against broken code, assertions on internals, mocking your own core logic, flaky/non-deterministic tests, an inverted pyramid, and a gate that runs but doesn't block. The test runner, the red→green evidence, and the gate are the arbiters.

## 📝 Assignment

Ship the Forge quality platform per `assignments/capstone-brief.md`, using `assignments/capstone-submission-template.md`. Your submission is the working, green test suite at every level plus a **quality report** proving each bar with evidence, and the engineering notebook (including the AI-usage log).

## 🚀 Stretch Goal

Go beyond the brief in one production-grade way a real team would value — e.g. mutation testing (does the suite catch injected bugs?), property-based tests for a tricky function, contract tests against a schema, a flaky-test detector in the gate, or coverage trend tracking — and justify it with evidence.

## ✅ Definition of Done

- [ ] Unit tests (boundaries/errors) — each seen to fail first
- [ ] Component tests asserting user-facing behavior, refactor-safe
- [ ] Integration tests asserting the API contract through the real stack
- [ ] At least one deterministic e2e test for a critical journey
- [ ] A feature built test-first (red → green → refactor log)
- [ ] Doubles at the boundary only; core real; right double per case
- [ ] CI quality gate runs the suite and BLOCKS on failure / sub-threshold coverage
- [ ] Healthy pyramid; quality report + notebook + AI log complete and reproducible

## 🪞 Reflection

Which integration decision had the widest blast radius across the suite? Where did a quality bar (an honest red, a contract, a real journey, the gate) force a change you'd have skipped under time pressure — and why was building it in cheaper than the customer-found bug it prevents?
