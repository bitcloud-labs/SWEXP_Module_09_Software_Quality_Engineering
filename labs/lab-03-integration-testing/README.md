# Lab 03 — The API Contract Investigation

**Ticket:** INT-2010 · **Goal:** wire the Forge order route to a **real in-process server** and assert
the HTTP contract (status + shape + errors) — catching a seam bug units miss.

The tests in [`tests/`](tests/) start the server on a real port and drive it with `fetch`, exactly like
the LMS lab — no mocking your own code. You implement the wiring.

## What you do
In [`src/server.ts`](src/server.ts), finish `createServer()` so that `POST /orders`:

- with a non-empty `items` array → **201** and a JSON body `{ id, items, status: 'placed' }` (ids start
  at 1 and increment per created order, using the in-memory data layer);
- with missing/empty `items` (e.g. `{}`) → **400** and `{ error: 'items required' }` (the validation
  unit and the handler unit wired together — the **seam**);
- any other route/method → **404**.

This is where a seam bug hides: each unit can be correct while the route still replies wrong. The
contract test is what catches it.

Run:
```bash
npx vitest run labs/lab-03-integration-testing
```

## Definition of done
- All tests pass; `npm run check` is clean.
- The success contract (status + shape) and the error contract are both asserted through the real server.

> The full deliverable (a note on a bug units could never catch, your red→green evidence) goes in your
> LMS engineering notebook.

## Submit
Edit `src/`, run the tests, then commit and push.
