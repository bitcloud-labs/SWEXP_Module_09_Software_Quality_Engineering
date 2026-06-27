# Integration Testing Guide

## Exercise the seams
Send a real request through the assembled stack (route → validation → data) and assert what comes back — bugs live in the seams between units.
```js
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { createServer } from '../src/server.mjs';   // the REAL app, wired
let server, base;
before(async () => { server = createServer(); await new Promise(r => server.listen(0, r)); base = `http://localhost:${server.address().port}`; });
after(() => server.close());
```

## Assert the contract
The caller depends on the **status code**, the **body shape**, and the **error behavior** — assert those:
```js
test('POST /orders → 201 + created order', async () => {
  const res = await fetch(`${base}/orders`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ items:[{sku:'A',qty:2}] }) });
  assert.strictEqual(res.status, 201);
  const body = await res.json();
  assert.ok(body.id); assert.strictEqual(body.status, 'placed');
});
```

## Real stack, double only externals
Use the real router/validation and a **real or in-memory** data layer. Don't mock your *own* logic (you'd test the mocks). Double genuinely external systems (a third-party API) — Lesson 6.

## Keep tests isolated
Reset state between tests (fresh data/server) so one test's writes don't break another.

## Fewer, higher-value
Integration tests are slower than unit tests; write fewer, on the contracts that matter (critical routes, error paths, risky seams).

## Gotchas
- Mocking your own handler/validation/data layer (testing mocks).
- Asserting only status or only shape; shared state leaking; over-testing permutations here instead of in unit tests.
