# End-to-End Testing Guide

## Drive the whole journey
String the real steps together and assert the user reaches the goal, carrying real state between steps:
```js
test('customer can sign up, add an item, and check out', async () => {
  let res = await fetch(`${base}/signup`, { method:'POST', headers:H, body: JSON.stringify({ email:'a@x.com' }) });
  const { token } = await res.json();
  res = await fetch(`${base}/cart/items`, { method:'POST', headers:{...H, authorization:`Bearer ${token}`}, body: JSON.stringify({ sku:'A', qty:1 }) });
  assert.strictEqual(res.status, 200);
  res = await fetch(`${base}/checkout`, { method:'POST', headers:{ authorization:`Bearer ${token}` } });
  assert.strictEqual((await res.json()).status, 'placed');   // the journey's OUTCOME
});
```

## Assert the outcome, not each step
The point is that the *whole flow* ends with the customer's goal achieved. Breaks live in the hand-off (the token not carried, the cart not linked) — visible only by driving the steps in sequence.

## Few and critical
E2E tests are slow and brittle, so write the **fewest** of them, only for journeys that must never break (signup, checkout). One reliable e2e on the critical path beats fifty on edge cases.

## Flakiness is a bug
A test that passes sometimes trains the team to ignore red. Make e2e deterministic: wait for real conditions (not fixed sleeps), reset state, control test data.

## Real system
A browser tool (Playwright/Cypress) drives the actual UI; an API-level flow drives the same journey over HTTP. Both run against the running system and assert the user-visible outcome. *(Here the flow runs against a real in-process server with `fetch`.)*

## Gotchas
- Asserting steps but never the journey outcome.
- E2E for edge cases that belong in unit tests; flakiness from sleeps/shared state.
