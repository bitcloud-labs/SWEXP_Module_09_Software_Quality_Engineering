# SWEXP Module 09 — Software Quality Engineering · Starter Workspace

This repo is your **work-along workspace** for Module 09. The lessons live in the LMS; here you do the
labs and the capstone: open an exercise, read its `README.md`, implement the `// TODO`s in its `src/`,
run the tests, and submit.

> **The tests are the spec.** Each exercise's `tests/` describes exactly what your code must do — make
> them pass without weakening the types (no `any`, no `as`, no `@ts-ignore`). No answer keys are shipped.

This module *is* testing, so the harness is the meta-point: the exercises themselves are graded by a real
test suite. In the LMS the labs run against the built-in `node:test` runner; here the same assertions,
contracts, and journeys run under **vitest + TypeScript (strict)** so the autograder can score them. The
discipline is identical — **red before green**, **test behavior**, **double at the boundary**, **gate the
release**.

## Quick start

```bash
npm install            # one time (already done in your LMS code-server workspace)
npm test               # run every exercise's behaviour tests
npm run test:types     # add the type-level checks (expectTypeOf)
npm run check          # strict type-check — "the compiler is your first reviewer"
npm run grade          # your score + per-exercise breakdown (what CI reports)
```

Run a single exercise while you work on it:

```bash
npx vitest run labs/lab-01-unit-testing      # or any folder below
npx vitest watch labs/lab-01-unit-testing    # re-run on save
```

## Exercises

| Exercise | Folder | You implement |
| --- | --- | --- |
| Lab 00 — The test runner & red/green | `labs/lab-00-setup` | `total` + a tiny `expectEqual` assertion helper |
| Lab 01 — The production outage | `labs/lab-01-unit-testing` | **fix the bug**: `finalPrice` (clamp ≥ 0, reject out-of-range) |
| Lab 02 — Components that lie | `labs/lab-02-component-testing` | `formatTotal` / `renderSummary` (user-facing output) |
| Lab 03 — The API contract | `labs/lab-03-integration-testing` | wire `POST /orders` on a real in-process server |
| Lab 04 — A customer found the bug | `labs/lab-04-e2e-testing` | the signup → cart → checkout journey (carry the token) |
| Lab 05 — Never write untested code | `labs/lab-05-tdd` | `applyCoupon` over a discount union (test-first) |
| Lab 06 — What should be real? | `labs/lab-06-test-doubles` | `createSpy` + `checkout` (real pricing, doubled boundary) |
| Lab 07 — Can we trust this release? | `labs/lab-07-quality-gates-ci` | `parseCoverage` / `passesGate` / `pyramidOk` |
| Capstone — Forge quality platform | `assignments/capstone` | integrate it all into one strict module |

Each folder is self-contained: a `README.md` (the brief), `src/` (starter code with `// TODO`s), and
`tests/` (the spec). Reference guides are in [`resources/`](resources/).

The integration and e2e labs drive a **real in-process HTTP server** (`node:http`) with `fetch` — no
mocking your own code. The doubles lab gives you the spy primitive. The gate lab distills "run coverage,
block the release" to its checkable core (parse a coverage report, decide pass/fail against a threshold);
running the real coverage tool / CI dashboard happens in your LMS environment.

## How grading & submission work

- Every exercise contributes tests — behaviour (`*.test.ts`) and, where a lesson is about a type, a
  type-level check (`*.test-d.ts`). `npm run grade` reports a per-exercise score plus a strict
  type-check gate.
- **Submit** by committing your changes and pushing (or opening a pull request). The **Autograde** GitHub
  Action runs the same grader, posts your score to the run summary, and comments it on any PR.
- You're done when the score is **100%** and the type-check is clean.

## The rules of this module

- **A test must fail first** — a test you didn't watch go red proves nothing.
- **Test behavior, not implementation** — assert what the user/caller observes; survive refactors.
- **A bug is a missing test** — every bug becomes a regression test that fails without the fix.
- **Double at the boundary, not the core** — real own-logic; doubled externals/clock/randomness.
- **Confidence, not coverage** — covered ≠ tested.
- **Quality is a gate, not a phase** — a green, unskippable gate is the decision to ship.
