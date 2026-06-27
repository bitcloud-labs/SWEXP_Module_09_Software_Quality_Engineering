# Test Pyramid Reference

```
        /\      e2e          ← few   · slow · critical journeys
       /  \     integration  ← some  · medium · seams & contracts
      /____\    unit         ← many  · fast · all the logic
```

## Match the test to the question
| Level | Tests | Speed | Answers |
|-------|-------|-------|---------|
| Unit | one function/module, isolated | fastest | is this logic correct? |
| Component | a UI component's behavior | fast | does the user see the right thing? |
| Integration | several units wired together | medium | do the pieces work together? (the contract) |
| End-to-end | a whole user flow | slowest | does the real journey work? |

## How much of each
- **Many unit tests** — they're fast and pinpoint the failure; put most detail here (every boundary/error path).
- **Fewer integration tests** — on the contracts and seams that matter, not every permutation.
- **Fewest e2e tests** — only the critical journeys that must never break.

## Why the shape matters
- **Speed:** a bottom-heavy suite gives feedback in seconds; an inverted one takes minutes-to-hours and gets bypassed.
- **Reliability:** unit tests are deterministic; e2e are the most flake-prone. Fewer e2e = fewer flakes in the gate.
- **Localization:** a failed unit test names the broken function; a failed e2e says only "the journey broke."

## The anti-pattern: the ice-cream cone
Mostly e2e/manual tests, few unit tests — slow, flaky, expensive, and a gate no one trusts. If you're writing an e2e test for an edge case, ask whether it belongs in a unit test instead.

## Rule of thumb
Push detail **down** the pyramid: test a rule once at the lowest level that can verify it, and reserve the higher levels for proving the pieces fit and the journey works.
