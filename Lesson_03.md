# Lesson 03 — The API Contract Investigation

> **Role:** Software Quality Engineer · **Competency:** Integration Testing · **Track:** INT · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      INT-2010
TITLE:       Each unit is tested and green, but the API still returns the wrong shape
PRIORITY:    P1
TYPE:        Bug / Test
DESCRIPTION: Forge's API handler, validation, and data layer each have passing unit
             tests, yet a request through the real route returns a response that
             violates the API contract (wrong status, missing field). The bug lives
             in the seams between the units. Write integration tests that exercise
             the route end-to-end through the real stack (minus external systems) and
             assert the actual HTTP contract: status, shape, and error behavior.

ACCEPTANCE CRITERIA:
  - Tests drive a real request through the wired stack (route → validation → data)
  - Assertions check the HTTP contract: status code, body shape, error responses
  - The seam bug (units pass, integration fails) is reproduced then fixed
  - Tests use a real (in-process) server and a real/in-memory data layer, not mocks of your own logic
```

## 🏢 Business Context

Units passing in isolation doesn't mean the system works — bugs love the *seams*: a handler that returns the wrong status, a validation layer wired in the wrong order, a field the data layer names differently than the API promises. Integration tests catch exactly these by exercising several units *together* through a real request, asserting the contract the caller actually depends on. They're slower than unit tests and you write fewer of them (the pyramid, Lesson 7), but they're where you prove the pieces fit — and they're the difference between "every part works" and "the product works."

## 🎯 Learning Objectives

- Drive a real request through the wired stack (route → validation → data layer)
- Assert the HTTP contract: status codes, body shape, error responses
- Reproduce a seam bug that unit tests miss, then fix it
- Use a real in-process server and real/in-memory data, doubling only external systems

## 📚 Technical Deep Dive

**Integration tests exercise the seams.** Instead of calling one function, you send a real request through the assembled stack and assert what comes back:

```js
import { test, before, after } from 'node:test';
import assert from 'node:assert';
import { createServer } from '../src/server.js';   // the REAL app, wired together

let server, base;
before(async () => { server = createServer(); await new Promise(r => server.listen(0, r)); base = `http://localhost:${server.address().port}`; });
after(() => server.close());

test('POST /orders returns 201 and the created order', async () => {
  const res = await fetch(`${base}/orders`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ items: [{ sku: 'A', qty: 2 }] }),
  });
  assert.strictEqual(res.status, 201);              // the contract: status
  const body = await res.json();
  assert.ok(body.id, 'response includes an id');    // the contract: shape
  assert.strictEqual(body.status, 'placed');
});
```

**Assert the contract, not the internals.** The caller depends on the *status code*, the *response shape*, and the *error behavior* — so that's what you assert. A unit test verifies the handler computes the right object; the integration test verifies the request actually produces the right HTTP response through validation, serialization, and the data layer.

**Reproduce the seam bug.** The kind integration catches and units miss:
```js
test('rejects an invalid order with 400 and an error message', async () => {
  const res = await fetch(`${base}/orders`, { method: 'POST', headers: {'content-type':'application/json'}, body: '{}' });
  assert.strictEqual(res.status, 400);              // units passed; the route returned 500 → RED
  assert.match((await res.json()).error, /items required/);
});
```
The validation unit returns the right error; the handler unit builds the right object — but wired together, the error path returns the wrong status. Only the integration test sees it.

**Real stack, real-ish data, double only externals.** Use the real router, validation, and a **real or in-memory** data layer (Module 07's repository with a test database or in-memory implementation). Don't mock your *own* logic — that just re-tests the mocks. Do double genuinely external systems (a third-party payment API) — that's Lesson 6. Keep tests isolated by resetting state between them (fresh data per test).

**Fewer, but higher-value.** Integration tests are slower (real server, real data) and you write fewer than unit tests. Spend them on the contracts that matter: the critical routes, the error paths, the seams most likely to break.

### Common gotchas
- Mocking your own handler/validation/data layer — you end up testing mocks, not integration.
- Asserting only the status, not the body shape (or vice versa).
- Shared state leaking between tests (one test's data breaks another) — reset between tests.
- Testing every permutation at the integration level (slow); push detail down to unit tests.

## 🧪 Hands-on Labs

Work through **`labs/lab-03-integration-testing.md`**. You'll wire the Forge order route to a **real in-process HTTP server** (`node:http`) with validation and an in-memory data layer, then write integration tests that drive real `fetch` requests and assert the **HTTP contract** (201 + created shape on success, 400 + error on invalid input). You'll reproduce the **seam bug** (units green, the route returns the wrong status) as a failing integration test, fix the wiring, and confirm green — all runnable here.

## 🔍 Engineering Investigation

Show the units passing in isolation, then run the integration test and record it failing (the wrong status/shape from the real route) — the seam bug units couldn't see. Fix the wiring; record the green run. Then add the error-path contract test (400 + message) and confirm it guards the seam. Note which contract assertion (status vs shape) caught the bug.

## 🤖 AI Engineering Exercise

Ask an AI to "write integration tests for this API." **Verify** it drives the real wired stack (not mocks of your own layers) and asserts the real contract (status + shape + errors). Break the wiring (wrong status) and run them — do they catch it? **Log** where it mocked your own code (re-testing mocks) or asserted too little, and fix it.

## 📝 Assignment

Submit: the integration tests driving the real server, the seam bug reproduced as a failing test then fixed (red → green), the success and error contract assertions (status + shape), and a note on a bug units could never have caught.

## 🚀 Stretch Goal

Add a test that exercises a multi-step contract (create an order, then GET it back and assert it persisted correctly) and explain why that crosses a seam a single-request test wouldn't.

## ✅ Definition of Done

- [ ] Tests drive a real request through the wired stack
- [ ] HTTP contract asserted: status, body shape, error responses
- [ ] Seam bug reproduced (units pass, integration fails) then fixed
- [ ] Real in-process server + real/in-memory data; externals doubled only
- [ ] State reset between tests (no leakage)

## 🪞 Reflection

Which seam bug passed every unit test? Why is mocking your own layers in an integration test self-defeating?
