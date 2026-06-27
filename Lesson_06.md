# Lesson 06 — What Should Be Real?

> **Role:** Software Quality Engineer · **Competency:** Test Doubles · **Track:** DBL · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      DBL-4001
TITLE:       Tests are slow and flaky because they call the real payment API
PRIORITY:    P1
TYPE:        Test / Design
DESCRIPTION: Forge's checkout tests hit a real third-party payment API and a real
             clock, so they're slow, flaky, and occasionally charge a test card.
             Meanwhile, other tests mock the team's own pricing logic, so they pass
             without actually testing it. Decide what should be real and what should
             be a test double: double external, slow, and non-deterministic
             dependencies; keep your own core logic real. Use the right kind of
             double (stub/fake/mock/spy) for each case.

ACCEPTANCE CRITERIA:
  - External / slow / non-deterministic dependencies are doubled (payment API, clock, randomness)
  - The team's own core logic is exercised for real, not mocked
  - The right double is chosen per case (stub vs fake vs mock vs spy) with justification
  - Tests become fast, deterministic, and still meaningful
```

## 🏢 Business Context

The hardest judgment in testing is deciding *what should be real*. Double too much — including your own logic — and your tests pass while testing nothing but the mocks. Double too little — calling a real payment API, a real clock — and your tests are slow, flaky, and have side effects (charging cards, depending on the date). The principle that resolves it: **double at the boundary, not the core.** Replace the things you don't own or can't control (external services, time, randomness, the network) with controllable doubles; run your own logic for real. Getting this line right is what makes a suite both fast and trustworthy.

## 🎯 Learning Objectives

- Decide what to double (boundary) vs keep real (your core logic)
- Choose the right double: stub, fake, mock, or spy
- Replace external/slow/non-deterministic dependencies with controllable doubles
- Keep tests meaningful — never mock the thing under test

## 📚 Technical Deep Dive

**The four doubles (they're not interchangeable):**
| Double | What it does | Use when |
|--------|--------------|----------|
| **Stub** | returns canned values | you need the dependency to return something specific |
| **Fake** | a working lightweight implementation | you need real-ish behavior (in-memory DB, fake payment that "succeeds") |
| **Mock** | a stub that also *asserts how it was called* | the interaction itself is the thing to verify |
| **Spy** | records calls to a real or fake function | you want to assert it was called (without changing behavior) |

**Double the boundary.** Replace dependencies you don't own or can't control:
```js
// stub the external payment API: no network, no real charge, deterministic
const payment = { charge: async () => ({ ok: true, id: 'pay_test' }) };
const order = await checkout(cart, { payment });
assert.strictEqual(order.status, 'paid');
```
The *checkout logic* runs for real; only the third-party call is doubled.

**Control non-determinism (time, randomness).** Inject the clock and the RNG so tests are deterministic:
```js
const order = createOrder(cart, { now: () => new Date('2024-01-01T00:00:00Z') });
assert.strictEqual(order.createdAt, '2024-01-01T00:00:00.000Z');   // stable, not "whenever the test ran"
```
A test that depends on the real clock or `Math.random()` is flaky by design.

**Mock when the interaction *is* the behavior.** Sometimes the thing to verify is that a call happened (an email was sent, the payment was charged exactly once):
```js
const sendEmail = mock.fn();
await placeOrder(cart, { sendEmail });
assert.strictEqual(sendEmail.mock.callCount(), 1);          // verify the interaction
assert.deepStrictEqual(sendEmail.mock.calls[0].arguments[0], { to: 'a@x.com', template: 'order_confirmed' });
```
(`node:test` provides `mock.fn()` for spies/mocks.)

**Never mock the thing under test.** If you're testing the pricing logic, the pricing logic must be *real* — mocking it means your test asserts the mock, not the code. The classic anti-pattern (and the bug in the ticket) is mocking your own core logic so the test passes vacuously. Mock *its dependencies*, not *it*.

**Fakes keep integration honest.** For integration tests (Lesson 3) prefer a **fake** over a mock for things like the data layer — an in-memory implementation that behaves like the real one — so you test real behavior without the real database's slowness. A fake payment gateway that records "charges" lets you test the whole flow without touching a real card.

**The decision, in one question:** *Do I own this and can I control it cheaply and deterministically?* If yes, use the real thing. If no (external, slow, non-deterministic, has side effects), double it — with the lightest double that does the job.

### Common gotchas
- Mocking your own logic (vacuous tests that assert the mock).
- Using a mock (interaction assertion) where a stub (canned value) was all you needed — brittle.
- Real clock / `Math.random()` / network in tests (flaky, slow, side effects).
- Over-mocking until the test no longer resembles how the code really runs.

## 🧪 Hands-on Labs

Work through **`labs/lab-06-test-doubles.md`**. You'll take the slow/flaky checkout tests and replace the **boundary** dependencies — a **stub/fake** payment gateway, an injected **clock**, a **spy** (`mock.fn()`) for the confirmation email — while keeping the **pricing/checkout logic real**. You'll prove the suite becomes fast and deterministic, that a `mock.fn()` spy verifies the email was sent exactly once, and you'll fix a test that mocked its own core logic (vacuously green) so it tests the real thing. Runnable with `node:test`.

## 🔍 Engineering Investigation

Identify each dependency in the checkout test and classify it: real (your logic) or doubled (boundary), and which double. Show the vacuous test (mocking the pricing logic) passing against broken pricing, then fix it to use real pricing and watch it catch the bug. Demonstrate the clock injection making a timestamp assertion deterministic, and the spy verifying the email interaction. Record the speed/determinism before vs after.

## 🤖 AI Engineering Exercise

Ask an AI to "add mocks to these tests." **Verify** it doubles only the boundary (external/slow/non-deterministic) and keeps your core logic real, and that it picks the right double (stub vs mock vs spy). **Log** any case where it mocked the code under test (vacuous) or reached for a real clock/network, and correct it.

## 📝 Assignment

Submit: the checkout suite with boundary dependencies doubled and core logic real, a per-dependency real-vs-double classification with justification, the vacuous-mock test fixed (now catches a real bug), and evidence the suite is fast and deterministic (spy verifies the email; injected clock stabilizes the timestamp).

## 🚀 Stretch Goal

Build a reusable in-memory **fake** for the Module 07 data repository and use it in an integration test, explaining why a fake (real-ish behavior) beats a stub (canned values) for that case.

## ✅ Definition of Done

- [ ] Boundary dependencies (payment, clock, randomness, email) doubled
- [ ] Core logic kept real; nothing under test is mocked
- [ ] Right double chosen per case (stub/fake/mock/spy) with justification
- [ ] Tests fast and deterministic; interaction verified with a spy/mock
- [ ] Vacuous self-mock identified and fixed

## 🪞 Reflection

Which dependency were you tempted to mock that you should have kept real (or vice versa)? How does "double at the boundary, not the core" keep a fast suite from becoming a vacuous one?
