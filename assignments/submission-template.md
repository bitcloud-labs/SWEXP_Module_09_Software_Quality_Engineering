# Lesson NN Submission — [Your Name]

**Ticket:** [e.g. UNIT-1010] · **Date:** [date] · **Lesson:** [title]

## 1. Goal / Definition of Done
What the ticket asked; the acceptance criteria you met.

## 2. What I built
The tests / feature / doubles / gate, and *why this design*. Note key decisions: the level, what's asserted (behavior vs internals), what's real vs doubled, what the gate blocks on.

```js
// the key test or code
```

## 3. Evidence
- **Red:** the test failing against broken/missing code (the wrong value, nonzero exit) — proof it can fail.
- **Green:** the test passing after the fix/implementation.
- **Contract / journey / coverage / gate:** the relevant `node:test` counts, status assertions, coverage numbers, or gate verdict.
- **Before/after** where relevant (lying vs behavior test; vacuous mock vs real logic).

## 4. Fix at the cause
What you changed and why it addresses the cause (the missing test, the behavior assertion, the seam wiring, the carried token, the double decision, the blocking gate) — not a workaround.

## 5. AI-usage log
| Asked | AI suggested | Verified (made it fail first?) | Outcome |
|-------|-------------|-------------------------------|---------|
| | | | accepted / corrected because… |

## 6. Reflection
What this taught you; where a quality bar caught something; what you'd test differently.

---
**Checklist:** [ ] test seen to fail first · [ ] behavior not implementation · [ ] bug → regression test · [ ] doubles at the boundary · [ ] confidence not coverage · [ ] gate blocks · [ ] AI output verified · [ ] commits clean
