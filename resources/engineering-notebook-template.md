# Engineering Notebook — Template

Your professional record. One entry per lesson/lab. Evidence is the real `node:test` output — the red run and the green run.

---

## [Date] — Lesson NN: [Title] (TICKET-ID)

### Ticket / goal
What was asked; the acceptance criteria / Definition of Done.

### What I built
The tests / feature / doubles / gate, and the key decisions — what level, what's asserted (behavior vs internals), what's real vs doubled, what the gate blocks on. *Why* this design.

### Evidence
- **Red:** the test failing against broken/missing code (the wrong value, the nonzero exit) — proof it can fail.
- **Green:** the test passing after the fix/implementation.
- **Contract / journey / coverage / gate:** the relevant `node:test` counts, status assertions, coverage numbers, or gate verdict.
- **Before/after** where relevant (the lying test vs the behavior test; vacuous mock vs real logic).

### Fixes
What I changed and why it addresses the cause (the missing boundary test, the behavior assertion, the seam wiring, the carried token, the real-vs-double decision, the blocking gate) — not a workaround.

### AI usage log
- Asked: …
- AI suggested: …
- Verified: reintroduced the bug / ran red→green / checked the double / checked the gate → …
- Outcome: accepted / corrected because …

### Reflection
What this taught me; where a quality bar (an honest red, a contract, a journey, the gate) caught something; what I'd test differently.

---

**Standards:** a test must fail before you trust it; test behavior, not implementation; a bug is a missing test; double at the boundary, not the core; confidence, not coverage; quality is a gate, not a phase; **draft → verify → log** for AI.
