# Lab 06 — What Should Be Real?

**Lesson:** 06 · **Goal:** double the boundary (payment, clock, email) while keeping core logic real, with the right double per case — and fix a vacuous self-mock.

## Goal
Make the checkout suite fast and deterministic by doubling external/slow/non-deterministic dependencies, prove a `mock.fn()` spy verifies the email was sent once, and fix a test that mocked its own pricing logic (vacuously green).

## Setup
`checkout.mjs` — checkout logic with injectable dependencies (the boundary is injected, the logic is real):
```js
export function checkout(cart, { payment, now, sendEmail }) {
  const totalCents = cart.reduce((s, i) => s + i.priceCents * i.qty, 0);   // REAL core logic
  if (totalCents <= 0) throw new Error('empty cart');
  const charge = payment.charge(totalCents);                                // BOUNDARY: external
  sendEmail({ to: cart.email, template: 'order_confirmed' });               // BOUNDARY: side effect
  return { status: 'paid', totalCents, paymentId: charge.id, at: now().toISOString() };  // BOUNDARY: clock
}
```

## Tasks
1. **Stub/fake the payment gateway** (no network, no real charge): `{ charge: () => ({ id: 'pay_test' }) }`.
2. **Inject the clock** so the timestamp is deterministic: `now: () => new Date('2024-01-01T00:00:00Z')`.
3. **Spy the email** with `mock.fn()` and assert it was called **exactly once** with the right args.
4. **Keep the pricing real** — assert `totalCents` is computed correctly by the real logic.
5. **Fix the vacuous self-mock:** show a test that mocks the *total computation* itself (passing against broken pricing), then rewrite it to use the real logic so it catches the bug.
6. Record that the suite is fast and deterministic.

## Verify (example)
```js
import { test, mock } from 'node:test';
import assert from 'node:assert';
import { checkout } from './checkout.mjs';
test('checkout doubles the boundary, keeps pricing real', () => {
  const payment = { charge: () => ({ id: 'pay_test' }) };       // stub/fake
  const now = () => new Date('2024-01-01T00:00:00Z');            // injected clock
  const sendEmail = mock.fn();                                   // spy
  const cart = Object.assign([{ priceCents: 5000, qty: 2 }], { email: 'a@x.com' });
  const result = checkout(cart, { payment, now, sendEmail });
  assert.strictEqual(result.totalCents, 10000);                 // REAL pricing verified
  assert.strictEqual(result.at, '2024-01-01T00:00:00.000Z');    // deterministic clock
  assert.strictEqual(result.paymentId, 'pay_test');
  assert.strictEqual(sendEmail.mock.callCount(), 1);            // spy: sent exactly once
  assert.deepStrictEqual(sendEmail.mock.calls[0].arguments[0], { to: 'a@x.com', template: 'order_confirmed' });
});
```
```bash
node --test checkout.test.mjs
```

## Deliverable
The suite with boundary dependencies doubled and core logic real, a per-dependency real-vs-double classification with justification, the vacuous-mock test fixed (now catches a real bug), and evidence the suite is fast and deterministic (spy verifies the email; injected clock stabilizes the timestamp).

## Cleanup
```bash
rm -f /tmp/forge-quality/checkout*.mjs
```

## Check
`../solutions/lab-06-solution.md`.
