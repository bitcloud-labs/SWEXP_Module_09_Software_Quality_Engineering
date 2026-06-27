# Testing Strategy Guide — What to Test at Which Level

## The core question
Not "how do I get to X% coverage?" but **"if this broke, would a test catch it — and at the cheapest level that can?"** That's confidence, and it's the goal coverage only approximates.

## Choosing the level
| If the risk is… | test at… | because |
|-----------------|----------|---------|
| a logic/calculation/validation rule | **unit** | fast, pinpoints the failure, cover every edge here |
| a component showing the user the wrong thing | **component** | assert rendered behavior |
| units that pass alone but break wired together | **integration** | the seam/contract is only visible assembled |
| a whole user journey breaking between features | **e2e** | only driving the real flow reveals the hand-off |

Push detail **down**: verify a rule once at the lowest level that can, and reserve higher levels for proving the pieces fit and the journey works.

## Confidence, not coverage
- Coverage says a line *ran*; confidence says a break would be *caught*. A line covered by a test that asserts nothing meaningful gives false confidence.
- Use coverage as a **floor** (stop erosion, catch untested new code), not a target.
- A small suite of meaningful tests beats a large suite of vacuous ones.

## A bug is a missing test
Every bug becomes a failing regression test (at the level that catches it cheapest), then a fix. Over time the suite encodes every mistake the team has learned about.

## Spend your test budget where the risk is
- Critical money/auth/data paths: thorough at every level.
- Trivial glue: a light touch.
- The boundaries and error paths: always — that's where production breaks.

## Make the suite trustworthy
- Every test seen to fail first (honest).
- Behavior, not implementation (durable through refactors).
- Deterministic (double the clock/randomness/network).
- Bottom-heavy pyramid (fast, reliable gate).

## Gotchas
- Testing everything at the e2e level (slow, flaky); chasing 100% coverage with vacuous tests.
- Duplicating the same rule at every level instead of once at the lowest.
