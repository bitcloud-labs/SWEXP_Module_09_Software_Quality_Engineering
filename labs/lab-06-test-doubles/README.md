# Lab 06 — What Should Be Real?

**Ticket:** DBL-4001 · **Goal:** double the boundary (payment, clock, email) while keeping core logic
real, and build the **spy** you verify the email with — the right double per case.

This lab has two pieces: the system under test (`checkout`, with its boundary *injected*) and a tiny
test-double utility (`createSpy`) you implement so the tests can assert "the email was sent exactly once
with the right args." The provided tests keep the **pricing real** and only double the boundary.

## What you do
In [`src/checkout.ts`](src/checkout.ts):

1. `createSpy()` — return a callable spy that records every call. The returned function records its
   arguments, and exposes `calls` (an array of argument-arrays) and `callCount()`. This is the
   stub/mock/spy primitive (the LMS uses `mock.fn()`).
2. `checkout(cart, deps)` — the **real** core logic with an injected boundary:
   - compute `totalCents` from `cart.items` (`priceCents * qty`) — the real logic, kept real;
   - throw `'empty cart'` if the total is `<= 0`;
   - `deps.payment.charge(totalCents)` → use the returned `{ id }` as `paymentId` (boundary: external);
   - `deps.sendEmail({ to: cart.email, template: 'order_confirmed' })` (boundary: side effect / spy);
   - return `{ status: 'paid', totalCents, paymentId, at: deps.now().toISOString() }` (boundary: clock).

Run:
```bash
npx vitest run labs/lab-06-test-doubles
```

## Definition of done
- All tests pass; `npm run check` is clean.
- Pricing is computed by the **real** logic (not doubled); only the boundary is doubled; the spy proves
  the email was sent exactly once with the right args.

## Submit
Edit `src/`, run the tests, then commit and push.
