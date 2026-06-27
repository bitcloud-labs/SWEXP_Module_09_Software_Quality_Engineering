# Learner Guide — Software Quality Engineering

## You are a quality engineer
Every lesson is an **engineering ticket** building the Forge test suite. Approach each as real work: write the tests, watch them fail then pass, and document the evidence. The goal isn't a coverage number — it's the judgment to earn *justified confidence to ship*: tests that can actually fail, that test behavior, and a gate the team trusts enough to ship behind.

## The ideas that matter most
- **A test must fail before you trust it.** A test never seen to fail proves nothing — see red first, for the right reason.
- **Test behavior, not implementation.** Assert what the user/caller observes; survive refactors.
- **A bug is a missing test.** Every bug becomes a failing regression test, then a fix.
- **Double at the boundary, not the core.** Real own-logic; doubled externals/clock/randomness; never mock the code under test.
- **Confidence, not coverage.** Coverage is a proxy; ask "if this broke, would a test catch it?"
- **Quality is a gate, not a phase.** An automated, unskippable gate is the release decision.
- **Match the test to the question** — many unit, fewer integration, fewest e2e (the pyramid).

## How each lesson works
1. **Read the ticket and the deep dive.**
2. **Do the lab.** Write the test, **predict** red or green, then run `node --test` and capture both red and green.
3. **Investigate** — push from "it passes" to "I watched it fail against the bug, then pass after the fix, and I can explain what each test guards."
4. **Run the AI exercise** — draft → verify (make it fail first) → log, deliberately.
5. **Submit the assignment** and **update your notebook.**
6. **Check the solution** to validate your reasoning — after you've done the work.

Track progress in `dashboard.html`.

## What every assignment must include
- **What you built** and *why this design* — the level, what's asserted (behavior vs internals), what's real vs doubled, what the gate blocks on.
- **Evidence:** the test failing first (red), then passing (green); plus contract / journey / coverage / gate results.
- **The fix at the cause** — the missing test, the behavior assertion, the seam wiring, the carried token, the double decision, the blocking gate.
- **AI-usage log:** draft → verify → log.
- **Clean commits** (Module 02 habits).

## Using AI responsibly
AI writes plausible tests fast — and they often pass against broken code, assert on internals, or mock the thing under test. You have the sharpest verifier there is: run the test and watch it fail without the fix. `resources/ai-workflow-guide.md` maps the failure modes.

## The standard
A test you didn't watch fail isn't trusted — no matter who wrote it. The runner, the red→green evidence, and the gate are the arbiters, not confidence. Confidence comes from a test that has been seen to fail.

## How you're graded
Against `ASSESSMENT_RUBRIC.md` — on unit, component, integration, and e2e testing, TDD discipline, the quality gate, and judgment, with evidence. A suite that's all green but full of vacuous tests, internals assertions, or mocked core logic scores poorly regardless of the coverage number.
