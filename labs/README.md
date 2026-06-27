# Labs — Software Quality Engineering

Hands-on labs for each lesson. You build the Forge test suite, carried forward lesson to lesson. Because this module *is* testing, the labs run **real tests** and you verify them the way you'd verify any test — by watching them fail and pass:

- **Run real suites.** The built-in `node:test` runner executes actual tests; you see real pass/fail counts and nonzero exit codes on failure.
- **Red before green.** The central discipline: a test must be seen to **fail** against broken/missing code before you trust it. Every lab has you capture the red run, then the green.
- **Real seams and journeys.** Integration and e2e labs drive a **real in-process HTTP server** (`node:http`) with `fetch`, asserting the actual contract and the actual journey — no mocking your own code.
- **Real doubles and coverage.** `node:test` provides `mock.fn()` for spies/mocks and `--experimental-test-coverage` for coverage; the gate lab enforces a real threshold.

Where a production tool runs in *your* environment (a React testing library + jsdom for full DOM rendering, Playwright for browser e2e), the labs verify the **behavior and contracts** here with the runner and an in-process server, and say so — the assertions and the discipline are identical.

## How to use a lab
1. Read the matching `Lesson_NN.md` first.
2. Run the **Setup** (a generator writes the code + tests under `/tmp/forge-quality`).
3. Work the **Tasks**, running `node --test` and capturing **red then green** as you go.
4. Produce the **Deliverable** for your engineering notebook (include the red run, the green run, contract/coverage/gate evidence).
5. Check your reasoning against `solutions/lab-NN-solution.md`.

## Ground rules
- **A test must fail first.** A test you didn't watch go red proves nothing — confirm it fails for the right reason.
- **Test behavior, not implementation.** Assert what the user/caller observes; survive refactors.
- **A bug is a missing test.** Every bug becomes a regression test that fails without the fix.
- **Double at the boundary, not the core.** Real own-logic; doubled externals/clock/randomness.
- **Confidence, not coverage.** Coverage is a proxy; ask "if this broke, would a test catch it?"
- **Evidence, not assertion.** Paste the real `node:test` output — counts, the red, the green, the coverage, the gate verdict.

## Prerequisites
- **Node.js** (built-in `node:test` runner; `node --test`, `mock.fn()`, `--experimental-test-coverage`) and **npm**. No other test framework is required.

## Lab index
| # | Lab | Focus |
|---|-----|-------|
| 0 | `lab-00-setup.md` | the runner; a test that passes *and* fails |
| 1 | `lab-01-unit-testing.md` | reproduce an outage as a failing unit test; boundaries/errors |
| 2 | `lab-02-component-testing.md` | test user-facing behavior, not internals |
| 3 | `lab-03-integration-testing.md` | the API contract through the real wired stack |
| 4 | `lab-04-e2e-testing.md` | the full critical journey to its outcome |
| 5 | `lab-05-tdd.md` | red → green → refactor on a real feature |
| 6 | `lab-06-test-doubles.md` | stub/fake/mock/spy at the boundary |
| 7 | `lab-07-quality-gates-ci.md` | coverage threshold + gate that blocks |

The Lesson 08 capstone reuses these to ship the full Forge quality platform.
