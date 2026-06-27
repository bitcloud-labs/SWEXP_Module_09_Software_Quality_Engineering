# SWEXP Module 09 — Software Quality Engineering

**Theme:** Building Software You Can Trust — turn Project Forge from "shipped on hope" into software the team trusts, with automated tests at every level, test-driven development, principled test doubles, and a CI quality gate.

You are a **Software Quality Engineer**. Forge spans a frontend (M05), an API (M06), a data layer (M07), and a platform (M08) — but almost none of it is tested. Across 9 ticket-driven lessons you build the Forge quality platform: unit tests that catch the production outage, component tests that stop lying about what the user sees, integration tests that prove the API contract, end-to-end tests for the critical journey, a feature built test-first, test doubles at the right boundaries, and a CI quality gate that makes "can we trust this release?" a status check instead of a gut feeling.

The ethos, in every lesson: **a test must fail before you trust it**; **test behavior, not implementation**; **a bug is a missing test**; **double at the boundary, not the core**; **confidence, not coverage**; **quality is a gate, not a phase**; and **match the test to the question** (the pyramid). AI is used as **draft → verify (run the test; confirm it fails without the fix and passes with it) → log**.

## How You Work Here

| Step | What it means |
|------|---------------|
| Pick up a ticket | Each lesson is an engineering ticket (`UNIT-1010`, `GATE-4010`, …) with acceptance criteria |
| Write a failing test first | See red for the right reason before you trust a test |
| Make it green | The simplest code/fix that passes |
| Test behavior | Assert what the user/caller observes, not internals |
| Double at the boundary | Real own-logic; doubled externals/clock/randomness |
| Gate the release | A green, unskippable gate is the decision to ship |
| Verify AI | Draft → verify (make it fail first) → log |

## Learning Outcomes

By the end you will be able to:
- Write isolated, fast unit tests covering boundaries and error paths, each seen to fail first.
- Test components by user-facing behavior so tests catch real bugs and survive refactors.
- Write integration tests that assert the API contract through the real wired stack.
- Drive a critical user journey end-to-end and assert its outcome.
- Build a feature test-first with the red → green → refactor cycle.
- Choose and use the right test double (stub/fake/mock/spy) at the boundary.
- Wire a CI quality gate that blocks merges on failing tests or sub-threshold coverage.
- Shape a healthy test pyramid and ship a quality platform with evidence.

## Lesson Index

| # | Lesson | Competency | Ticket |
|---|--------|-----------|--------|
| 0 | Welcome to the Software Quality Engineering Team | Quality Engineering Orientation | QUAL-1000 |
| 1 | The Production Outage | Unit Testing | UNIT-1010 |
| 2 | Components That Lie | React Component Testing | COMP-2001 |
| 3 | The API Contract Investigation | Integration Testing | INT-2010 |
| 4 | A Customer Found the Bug | End-to-End Testing | E2E-3001 |
| 5 | Never Write Untested Code Again | Test-Driven Development | TDD-3010 |
| 6 | What Should Be Real? | Test Doubles | DBL-4001 |
| 7 | Can We Trust This Release? | Quality Gates & CI | GATE-4010 |
| 8 | Project Forge Quality Platform | Production Quality Platform | FORGE-9700 |

Phases: **Foundations** (0) → **Testing Fundamentals** (1–2) → **Testing the System** (3–4) → **Discipline & Design** (5–6) → **Release Confidence** (7) → **Capstone** (8).

## Repository Layout

```
.
├── README.md                      # this file
├── MODULE_SYLLABUS.md             # pacing, structure, deliverables
├── LEARNER_GUIDE.md               # how to operate as a quality engineer here
├── INSTRUCTOR_GUIDE.md            # facilitation and assessment
├── COMPETENCY_MATRIX.md           # lesson → competency → skills
├── ASSESSMENT_RUBRIC.md           # grading weights and performance levels
├── dashboard.html                 # interactive progress dashboard (open in a browser)
├── Lesson_00.md … Lesson_08.md    # the 9 lessons
├── labs/                          # hands-on labs (run real node:test suites; red→green)
├── solutions/                     # worked solutions / answer keys
├── resources/                     # unit, component, integration, e2e, TDD, doubles, gates, pyramid + more
├── assignments/                   # submission templates + capstone brief
└── instructor-notes/              # per-lesson facilitation notes
```

## Getting Started

1. Read `resources/quality-setup-guide.md`; the runner is built in (Lesson 0 / `labs/lab-00-setup.md`).
2. Start your engineering notebook from `resources/engineering-notebook-template.md`.
3. Open `dashboard.html` in your browser to track progress through the lessons and phases.
4. Open `Lesson_00.md` and pick up your first ticket. Keep the relevant `resources/` references open as you build.

**Verification.** This module *is* testing, so verification means **running real tests**: the built-in `node:test` runner executes actual suites (real `# pass`/`# fail` counts and exit codes), with every lab showing **red before green**; integration and e2e tests drive a **real in-process HTTP server**; test doubles use **`mock.fn()`**; and the quality gate enforces **real coverage** (`--experimental-test-coverage`). A React testing library + jsdom (component DOM rendering) and Playwright (browser e2e) run in your own environment — the behavior, contracts, and journeys here are verified with the runner and an in-process server, and the assertions are identical.
