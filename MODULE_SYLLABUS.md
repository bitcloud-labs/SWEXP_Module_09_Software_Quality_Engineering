# Module Syllabus — Software Quality Engineering

## Description
A ticket-driven module that turns *Project Forge* from "shipped on hope" into software the team can **trust**. Across 9 lessons and a capstone, you operate as a Software Quality Engineer closing tickets that move from unit tests (a production outage), through component, integration, and end-to-end testing, into test-driven development, principled test doubles, and a CI quality gate — culminating in shipping the Forge quality platform. The emphasis is on **justified confidence to ship**: a test must fail before you trust it, you test behavior rather than implementation, every bug becomes a regression test, and the gate is the release decision.

## Prerequisites
- The Forge apps from earlier modules (M05 frontend, M06 API, M07 data, M08 platform) as the thing being tested.
- Comfort at a command line and solid Git (Modules 01–02).
- Working JavaScript/TypeScript (Modules 03–04) — the code under test and the tests run on Node.
- **Node.js** (the built-in `node:test` runner — `node --test`, `mock.fn()`, `--experimental-test-coverage`) and **npm**. No other test framework is required. A React testing library + jsdom and Playwright run in your environment for full DOM/browser testing; the module verifies behavior, contracts, and journeys with the runner and an in-process server.

## Pacing Options

| Track | Cadence | Duration |
|-------|---------|----------|
| Intensive (bootcamp) | ~1 lesson/day; capstone over the last 4–5 days | ~2 weeks |
| Part-time (cohort) | 2 lessons/week | ~5 weeks |
| Self-paced | 1 lesson per sitting; capstone when ready | flexible |

Most lessons are 3–4 hours including the lab; the capstone is 16–20 hours.

## Module Arc

| Phase | Lessons | Focus |
|-------|---------|-------|
| Foundations | 0 | the runner; red before green; confidence not coverage |
| Testing Fundamentals | 1–2 | unit tests; component behavior testing |
| Testing the System | 3–4 | integration contracts; end-to-end journeys |
| Discipline & Design | 5–6 | TDD; test doubles |
| Release Confidence | 7 | quality gates & CI; the pyramid |
| Capstone | 8 | ship the full Forge quality platform with evidence |

## Lesson Structure
Every lesson follows the same shape: **Engineering Ticket → Business Context → Learning Objectives → Technical Deep Dive → Hands-on Labs → Engineering Investigation → AI Engineering Exercise → Assignment → Stretch Goal → Definition of Done → Reflection.**

## Labs
Every lab builds the Forge test suite and is **verified by running real tests**: the built-in `node:test` runner (real `# pass`/`# fail` counts and exit codes), with every lab demonstrating **red before green**; integration and e2e tests drive a **real in-process HTTP server** (`node:http` + `fetch`); test doubles use **`mock.fn()`**; and the gate lab enforces **real coverage** (`--experimental-test-coverage`). The discipline is the same throughout: a test that has never failed is not yet evidence.

## Deliverables
- **Per lesson:** a completed lab, an assignment via `assignments/submission-template.md`, and an engineering-notebook entry (the red run, the green run, the fix at the cause, the AI log).
- **Capstone:** a working, green test suite at every level (unit, component, integration, e2e), a TDD-built feature, principled doubles, and a CI quality gate over a healthy pyramid, plus a **quality report** proving each bar with reproducible evidence (red→green, contracts, the journey, coverage, the gate verdict) and the notebook — per `assignments/capstone-brief.md`.

## Final Assessment
Graded against `ASSESSMENT_RUBRIC.md`: Unit Testing (10%), Component Testing (10%), Integration Testing (15%), End-to-End Testing (15%), TDD Discipline (15%), CI & Quality Gates (10%), Documentation (10%), Engineering Judgment (10%), AI Workflow (5%).

## Support Materials
- `resources/` — quality setup; unit; component; integration; e2e; TDD; test doubles; quality gates & CI; the test pyramid; the node:test API; testing strategy; AI workflow; notebook template.
- `dashboard.html` — an interactive progress tracker.
- `solutions/` — worked solutions (the red→green evidence reproducible) to check against.
- `instructor-notes/` — per-lesson facilitation guidance.

## Academic & Professional Integrity
AI assistance is **encouraged**, used as a professional would: every use follows **draft → verify (run the test; confirm it fails without the fix and passes with it) → log.** The recurring failures to catch — tests that stay green against broken code, assertions on internals, mocking your own core logic, flaky tests, an inverted pyramid, a gate that runs but doesn't block — are exactly what the runner and the red→green discipline exist to surface. A test you didn't watch fail is not evidence, no matter who wrote it.
