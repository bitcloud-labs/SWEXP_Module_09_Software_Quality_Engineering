# AI Workflow Guide — Draft → Verify → Log

Testing gives you the sharpest possible verifier: **run the test and watch it fail without the fix, then pass with it.** Use it — AI writes plausible tests that quietly pass against broken code.

## The loop
1. **Draft.** Ask the AI for tests, a feature (TDD), doubles, or a CI gate.
2. **Verify.** The essential check: **does the test actually fail when the code is wrong?**
   - Reintroduce the bug (or delete the implementation) and run the AI's tests — do they go **red**?
   - For doubles: is only the boundary doubled, with core logic real (not a vacuous self-mock)?
   - For a gate: does it actually **block** on a failing test / sub-threshold coverage?
3. **Log.** Record what you asked, whether the test caught the bug, what you kept, what you fixed.

## Where AI most often goes wrong here
- **Tests that stay green against broken code** (assert nothing meaningful, or don't run the code).
- **Asserting on internals** (state/props) instead of behavior — brittle and lying.
- **Mocking the code under test** (vacuous green) instead of its dependencies.
- **Flaky/non-deterministic tests** (real clock, `Math.random()`, fixed sleeps).
- **An inverted pyramid** (lots of slow e2e for things that belong in unit tests).
- **A gate that runs but doesn't block**, or treats coverage as a target not a floor.

## The golden rule
A test you didn't watch fail isn't trusted — no matter who (or what) wrote it. The runner, the red→green evidence, and the gate are the arbiters, not the AI's confidence. **Confidence comes from a test that has been seen to fail.**
