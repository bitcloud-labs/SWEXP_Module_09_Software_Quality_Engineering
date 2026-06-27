# Lab 03 — The API Contract Investigation

**Lesson:** 03 · **Goal:** integration tests that drive a real request through the wired stack and assert the HTTP contract — catching a seam bug units miss.

## Goal
Wire the Forge order route to a real in-process server with validation and an in-memory data layer, and assert the contract (status + shape + errors). Reproduce a seam bug (units green, route wrong) then fix it.

## Setup
`server.mjs` — the real app, wired together:
```js
import http from 'node:http';
export function createServer() {
  const orders = [];                                  // in-memory data layer (real-ish)
  return http.createServer(async (req, res) => {
    if (req.method === 'POST' && req.url === '/orders') {
      let body = ''; for await (const c of req) body += c;
      let data; try { data = JSON.parse(body || '{}'); } catch { data = {}; }
      // validation (a unit) + handler (a unit) wired together — the SEAM
      if (!data.items || data.items.length === 0) {
        res.writeHead(400, { 'content-type': 'application/json' });
        return res.end(JSON.stringify({ error: 'items required' }));
      }
      const order = { id: orders.length + 1, items: data.items, status: 'placed' };
      orders.push(order);
      res.writeHead(201, { 'content-type': 'application/json' });
      return res.end(JSON.stringify(order));
    }
    res.writeHead(404); res.end();
  });
}
```

## Tasks
1. **Start the real server** in `before`, close in `after`; get its `base` URL.
2. **Success contract:** `POST /orders` with items → assert **201** and a body with `id` and `status: 'placed'`.
3. **Error contract:** `POST /orders` with `{}` → assert **400** and `error: /items required/`.
4. **Reproduce the seam bug:** start from a version where validation returns the error but the route still replies **500/200** (units pass, integration fails); confirm the integration test goes **red**, fix the wiring, confirm **green**.
5. **Reset state** between tests (fresh server or cleared data) so they don't leak.

## Verify (example)
```js
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { createServer } from './server.mjs';
let server, base;
before(async () => { server = createServer(); await new Promise(r => server.listen(0, r)); base = `http://localhost:${server.address().port}`; });
after(() => server.close());
const H = { 'content-type': 'application/json' };
test('POST /orders → 201 + created order', async () => {
  const res = await fetch(`${base}/orders`, { method: 'POST', headers: H, body: JSON.stringify({ items: [{ sku: 'A', qty: 2 }] }) });
  assert.strictEqual(res.status, 201);
  const body = await res.json();
  assert.ok(body.id); assert.strictEqual(body.status, 'placed');
});
test('POST /orders {} → 400 + error', async () => {
  const res = await fetch(`${base}/orders`, { method: 'POST', headers: H, body: '{}' });
  assert.strictEqual(res.status, 400);
  assert.match((await res.json()).error, /items required/);
});
```
```bash
node --test integration.test.mjs
```

## Deliverable
The integration tests driving the real server, the seam bug reproduced as a failing test then fixed (red → green), the success + error contract assertions (status + shape), and a note on a bug units could never catch.

## Cleanup
```bash
rm -f /tmp/forge-quality/server.mjs /tmp/forge-quality/integration.test.mjs
```

## Check
`../solutions/lab-03-solution.md`.
