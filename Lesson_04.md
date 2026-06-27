# Lesson 04 — A Customer Found the Bug

> **Role:** Software Quality Engineer · **Competency:** End-to-End Testing · **Track:** E2E · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      E2E-3001
TITLE:       A customer couldn't complete checkout — every unit and integration test passed
PRIORITY:    P0 — customer-reported
TYPE:        Bug / Test
DESCRIPTION: A customer reported they couldn't finish the Forge signup → add-to-cart →
             checkout flow, even though units and integration tests are green. The
             break is in the full journey across multiple endpoints/screens. Write an
             end-to-end test that drives the real user flow through the running system
             and asserts the user can actually complete it — so the next break in the
             critical journey is caught before a customer is.

ACCEPTANCE CRITERIA:
  - An e2e test drives the full critical flow against the running system
  - It asserts the user-visible outcome of the whole journey (not one step)
  - The reported break is reproduced as a failing e2e test, then fixed
  - E2E tests are reserved for critical flows (few, high-value) — the pyramid's top
```

## 🏢 Business Context

A customer finding a bug is the most expensive way to find one — it costs trust, support time, and sometimes revenue, and it means everything *before* production missed it. End-to-end tests are the last line: they drive the real user journey across the whole system the way a customer would, catching breaks that live *between* features — a flow where each step works but the hand-off between them doesn't. They're the slowest and most brittle tests, so you keep them few and focused on the journeys that *must* work (signup, checkout). One reliable e2e test on the critical path is worth more than fifty on edge cases.

## 🎯 Learning Objectives

- Drive a full critical user flow against the running system
- Assert the user-visible outcome of the whole journey, not a single step
- Reproduce a cross-feature break as a failing e2e test, then fix it
- Reserve e2e tests for the few critical, high-value flows (the pyramid's top)

## 📚 Technical Deep Dive

**E2E tests exercise the whole journey.** They string the real steps together and assert the user reaches the goal:

```js
test('a new customer can sign up, add an item, and check out', async () => {
  // 1. sign up
  let res = await fetch(`${base}/signup`, { method:'POST', headers:H, body: JSON.stringify({ email:'a@x.com', password:'pw' }) });
  assert.strictEqual(res.status, 201);
  const { token } = await res.json();

  // 2. add to cart (authenticated)
  res = await fetch(`${base}/cart/items`, { method:'POST', headers:{...H, authorization:`Bearer ${token}`}, body: JSON.stringify({ sku:'A', qty:1 }) });
  assert.strictEqual(res.status, 200);

  // 3. check out — the OUTCOME of the whole flow
  res = await fetch(`${base}/checkout`, { method:'POST', headers:{...H, authorization:`Bearer ${token}`} });
  assert.strictEqual(res.status, 201);
  const order = await res.json();
  assert.strictEqual(order.status, 'placed');     // the customer succeeded
});
```

**Assert the journey's outcome.** The point isn't each step's status — it's that the *whole flow* ends with the customer's goal achieved. The break the ticket describes (units and integration green) lives in the hand-off: the token from signup isn't accepted by checkout, or the cart isn't associated with the new user. Only driving the steps *in sequence, carrying real state* reveals it.

**Test like a real user, against the running system.** A true browser e2e test (Playwright/Cypress) drives the actual UI — clicking, typing, navigating — against the deployed app. An API-level flow test drives the same journey through real HTTP calls. Both assert the user-visible outcome; both run against the system actually running, not isolated functions. *(In this environment the flow runs against a real in-process server with `fetch`; a browser tool like Playwright runs the UI flow in your project — the journey and the assertions are the same.)*

**The pyramid's top: few and critical.** E2E tests are slow (whole system, real I/O) and the most prone to flakiness (timing, environment). So you write the *fewest* of them, only for journeys that must never break. The shape across the module:
```
        /\        e2e        ← few, slow, critical flows
       /  \       integration ← some, seams & contracts
      /____\      unit        ← many, fast, all the logic
```
Match the cost of the test to the confidence it buys.

**Flakiness is a bug.** A flaky e2e test (passes sometimes) is worse than none — it trains the team to ignore red. Make them deterministic: wait for real conditions (not fixed sleeps), reset state between runs, control test data.

### Common gotchas
- Asserting each step but never the journey's final outcome.
- Writing e2e tests for edge cases that belong in unit tests (slow, brittle, redundant).
- Flaky tests from fixed `sleep`s, shared state, or uncontrolled data.
- No e2e on the *actual* critical path (so the expensive bug still reaches customers).

## 🧪 Hands-on Labs

Work through **`labs/lab-04-e2e-testing.md`**. You'll drive the full Forge **signup → add-to-cart → checkout** flow against a **real in-process server**, carrying the auth token between steps, and assert the journey's outcome (an order is placed). You'll reproduce the **cross-feature break** (each step's unit/integration tests pass, but the flow fails at the hand-off) as a failing e2e test, fix it, and confirm the customer can complete checkout — runnable here.

## 🔍 Engineering Investigation

Run the unit/integration tests (green) and then the e2e flow test (red — the hand-off break a customer hit). Identify where in the journey it fails (the token not carried, the cart not linked). Fix it; record the green journey. Then argue which flows deserve an e2e test and which of your e2e ideas actually belong lower in the pyramid.

## 🤖 AI Engineering Exercise

Ask an AI to "write an end-to-end test for checkout." **Verify** it drives the full flow carrying real state between steps and asserts the final outcome (not just step statuses), and that it's deterministic (no fixed sleeps/shared state). Break a hand-off and run it — does it catch it? **Log** where it tested steps in isolation (not a journey) or introduced flakiness, and fix it.

## 📝 Assignment

Submit: the e2e flow test driving the full journey, the cross-feature break reproduced as a failing test then fixed (red → green), the outcome assertion, and a justification of which flows you chose for e2e (and which ideas you pushed down the pyramid).

## 🚀 Stretch Goal

Add a negative-path e2e (a user with an empty cart cannot check out and sees the right message) and explain why it's still worth an e2e slot, or argue why it belongs at the integration level instead.

## ✅ Definition of Done

- [ ] E2E test drives the full critical flow against the running system
- [ ] Asserts the journey's user-visible outcome, carrying real state between steps
- [ ] Cross-feature break reproduced (units/integration green) then fixed
- [ ] E2E reserved for few, critical flows; flakiness avoided
- [ ] Pyramid rationale articulated

## 🪞 Reflection

Why did every lower-level test pass while the customer still couldn't check out? What makes a flow worth an e2e test versus a cheaper test lower in the pyramid?
