# Test Doubles Guide

## The four doubles
| Double | What it does | Use when |
|--------|--------------|----------|
| **Stub** | returns canned values | you need a specific return |
| **Fake** | a working lightweight impl | you need real-ish behavior (in-memory DB) |
| **Mock** | a stub that asserts how it was called | the interaction is the thing to verify |
| **Spy** | records calls to a real/fake fn | assert it was called, without changing behavior |

## Double at the boundary, not the core
*Do I own this and can I control it cheaply and deterministically?*
- **Yes** → use the real thing (your pricing/checkout logic).
- **No** (external / slow / non-deterministic / side effects) → double it.
```js
const payment = { charge: () => ({ id: 'pay_test' }) };       // stub external API
const now = () => new Date('2024-01-01T00:00:00Z');           // inject the clock
const sendEmail = mock.fn();                                  // spy the side effect
const order = checkout(cart, { payment, now, sendEmail });    // pricing runs for REAL
assert.strictEqual(sendEmail.mock.callCount(), 1);            // verify the interaction
```

## Never mock the thing under test
If you're testing pricing, pricing must be **real** — mocking it makes the test assert the mock (vacuously green). Mock its *dependencies*, not *it*.

## Fakes keep integration honest
Prefer a **fake** (in-memory data layer that behaves like the real one) over a mock for integration tests — real behavior without the real database's slowness.

## `node:test` doubles
`import { mock } from 'node:test'` → `mock.fn()`; inspect with `.mock.callCount()` and `.mock.calls[i].arguments`.

## Gotchas
- Mocking your own logic (vacuous); a mock where a stub suffices (brittle).
- Real clock/`Math.random()`/network (flaky); over-mocking until the test doesn't resemble reality.
