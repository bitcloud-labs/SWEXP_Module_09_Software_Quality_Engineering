# Lab 04 — A Customer Found the Bug

**Lesson:** 04 · **Goal:** an end-to-end test that drives the full signup → add-to-cart → checkout journey and asserts the customer reaches the goal — catching a cross-feature break.

## Goal
Drive the whole journey against a real in-process server, carrying the auth token between steps, and assert the outcome (an order is placed). Reproduce the hand-off break (units/integration green, journey fails) then fix it.

## Setup
`app.mjs` — a small Forge app with signup, cart, checkout (in-memory), where the bug is in the *hand-off* (the cart isn't associated with the signed-up user unless wiring is correct):
```js
import http from 'node:http';
export function createApp() {
  const users = new Map();        // token -> { email, cart: [] }
  let nextToken = 1;
  return http.createServer(async (req, res) => {
    const send = (code, obj) => { res.writeHead(code, { 'content-type': 'application/json' }); res.end(JSON.stringify(obj)); };
    let body = ''; for await (const c of req) body += c;
    const data = body ? JSON.parse(body) : {};
    const auth = (req.headers.authorization || '').replace('Bearer ', '');
    if (req.url === '/signup' && req.method === 'POST') {
      const token = 'tok_' + (nextToken++); users.set(token, { email: data.email, cart: [] });
      return send(201, { token });
    }
    if (req.url === '/cart/items' && req.method === 'POST') {
      const u = users.get(auth); if (!u) return send(401, { error: 'unauthorized' });
      u.cart.push({ sku: data.sku, qty: data.qty }); return send(200, { items: u.cart.length });
    }
    if (req.url === '/checkout' && req.method === 'POST') {
      const u = users.get(auth); if (!u) return send(401, { error: 'unauthorized' });
      if (u.cart.length === 0) return send(400, { error: 'empty cart' });
      return send(201, { status: 'placed', items: u.cart.length });
    }
    send(404, {});
  });
}
```

## Tasks
1. **Drive the journey** in order, carrying the token: signup → (Bearer token) add item → checkout.
2. **Assert the outcome:** the final checkout returns **201** with `status: 'placed'` — the customer succeeded.
3. **Reproduce the hand-off break:** start from a version where the token isn't carried (or the cart isn't linked) so checkout sees an empty cart / 401 — the journey fails though each step's own tests pass. Confirm **red**, fix the hand-off, confirm **green**.
4. **Determinism:** no fixed sleeps; fresh app per test run so state doesn't leak.

## Verify (example)
```js
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { createApp } from './app.mjs';
let server, base;
before(async () => { server = createApp(); await new Promise(r => server.listen(0, r)); base = `http://localhost:${server.address().port}`; });
after(() => server.close());
const H = { 'content-type': 'application/json' };
test('a customer can sign up, add an item, and check out', async () => {
  let res = await fetch(`${base}/signup`, { method:'POST', headers:H, body: JSON.stringify({ email:'a@x.com' }) });
  const { token } = await res.json();
  res = await fetch(`${base}/cart/items`, { method:'POST', headers:{...H, authorization:`Bearer ${token}`}, body: JSON.stringify({ sku:'A', qty:1 }) });
  assert.strictEqual(res.status, 200);
  res = await fetch(`${base}/checkout`, { method:'POST', headers:{ authorization:`Bearer ${token}` } });
  assert.strictEqual(res.status, 201);
  assert.strictEqual((await res.json()).status, 'placed');   // the journey's outcome
});
```
```bash
node --test e2e.test.mjs
```

## Deliverable
The e2e flow test driving the full journey, the cross-feature break reproduced as a failing test then fixed (red → green), the outcome assertion, and a justification of which flows deserve e2e.

## Cleanup
```bash
rm -f /tmp/forge-quality/app.mjs /tmp/forge-quality/e2e.test.mjs
```

## Check
`../solutions/lab-04-solution.md`.
