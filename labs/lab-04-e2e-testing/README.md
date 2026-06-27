# Lab 04 — A Customer Found the Bug

**Ticket:** E2E-3001 · **Goal:** an end-to-end test that drives the full **signup → add-to-cart →
checkout** journey, carrying the auth token between steps, and asserts the customer reaches the goal —
catching a cross-feature **hand-off** break that each step's own tests miss.

The tests in [`tests/`](tests/) drive the whole journey against a real in-process server with `fetch`,
carrying the `Bearer` token from signup through to checkout (exactly like the LMS Playwright journey,
distilled to the runnable core). You implement the app.

## What you do
In [`src/app.ts`](src/app.ts), finish `createApp()` so the three routes wire together via a per-user
token:

- `POST /signup` → mint a token, create the user with an empty cart, reply **201** `{ token }`.
- `POST /cart/items` (with `Authorization: Bearer <token>`) → look the user up by token; **401** if
  unknown; otherwise push the item to **that user's** cart and reply **200** `{ items: <count> }`.
- `POST /checkout` (with the token) → **401** if unknown, **400** `{ error: 'empty cart' }` if the cart
  is empty, otherwise **201** `{ status: 'placed', items: <count> }`.

The bug lives in the **hand-off**: if the cart isn't associated with the signed-up user, checkout sees an
empty cart and the journey fails even though each step works in isolation.

Run:
```bash
npx vitest run labs/lab-04-e2e-testing
```

## Definition of done
- All tests pass; `npm run check` is clean.
- The final checkout returns `201` with `status: 'placed'` — the customer succeeded — and state is fresh
  per server (no leaks, no fixed sleeps).

## Submit
Edit `src/`, run the tests, then commit and push.
