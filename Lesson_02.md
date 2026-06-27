# Lesson 02 — Components That Lie

> **Role:** Software Quality Engineer · **Competency:** React Component Testing · **Track:** COMP · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      COMP-2001
TITLE:       The order summary shows the wrong total but the tests are green
PRIORITY:    P1
TYPE:        Bug / Test
DESCRIPTION: A Forge React component displays an incorrect order total to users,
             yet its tests pass — because they assert on internal state and props,
             not on what the user actually sees. Rewrite the component tests to
             verify user-facing behavior (rendered output and interactions), so a
             test fails exactly when a user would see something wrong, and survives
             refactors that don't change behavior.

ACCEPTANCE CRITERIA:
  - Tests assert on rendered output / behavior the user observes, not internals
  - A test fails when the displayed total is wrong (the lying component is caught)
  - Tests interact like a user (events) and query like a user (visible text/roles)
  - Tests survive an implementation refactor that preserves behavior
```

## 🏢 Business Context

A component test that checks internal state instead of what renders is a test that *lies*: it stays green while the user sees the wrong thing, and it breaks every time you refactor even when nothing user-visible changed. Both failure modes erode trust in the suite. The fix is to test components the way a user experiences them — find elements by what's visible, interact through events, assert on output — so a green test means "the user sees the right thing" and a refactor that preserves behavior keeps the tests green. This is the single most important idea in component testing: **test behavior, not implementation.**

## 🎯 Learning Objectives

- Test a component by its rendered output and behavior, not internal state/props
- Query elements the way a user finds them (visible text, roles, labels)
- Drive interactions with events and assert on the resulting output
- Write tests that survive behavior-preserving refactors

## 📚 Technical Deep Dive

**The lying test — asserting on internals:**
```jsx
// BAD: reaches into implementation; passes even when the UI is wrong
expect(wrapper.state('total')).toBe(80);
expect(wrapper.instance().props.items.length).toBe(2);
```
This passes if `state.total` is 80 even when a formatting bug renders "$8.00" to the user. It also shatters the moment you refactor `total` into a hook or a derived value — a false failure.

**The honest test — asserting on what renders:**
```jsx
// GOOD (React Testing Library shape): query like a user, assert on output
render(<OrderSummary items={[{ price: 50 }, { price: 30 }]} />);
expect(screen.getByText('Total: $80.00')).toBeInTheDocument();   // what the USER sees
```
This fails exactly when the displayed total is wrong, and doesn't care how the component computes it internally.

**Query like a user.** Prefer queries by visible text, accessible role, and label (`getByRole('button', { name: /checkout/i })`, `getByText`, `getByLabelText`) over test-ids or CSS selectors. If a query mirrors how a user (or assistive tech) finds the element, the test asserts real usability too.

**Interact like a user.** Drive behavior through events, then assert on the new output:
```jsx
fireEvent.click(screen.getByRole('button', { name: /add item/i }));
expect(screen.getByText('Total: $90.00')).toBeInTheDocument();
```

**Behavior, not implementation, is the dividing line.** Ask: "would a user notice if this changed?" If yes, test it (the rendered total, the disabled state, the error message). If no (which hook holds the state, the name of an internal variable), don't — coupling tests to internals makes them brittle and dishonest.

**The logic underneath is unit-testable.** The pure function a component uses to compute the total (e.g. `formatTotal(items)`) can be unit-tested directly (Lesson 1); the component test then verifies it's wired to the UI correctly. *(In this environment the behavior logic is verified with the test runner; the full DOM render runs in your project with a testing library + jsdom — the principle and the assertions are identical.)*

### Common gotchas
- Asserting on `state`/`props`/internal method calls (lying + brittle tests).
- Querying by CSS class or test-id when a visible role/text would do (couples to markup).
- Not actually triggering the user interaction before asserting.
- Snapshotting everything (a giant snapshot asserts nothing meaningful and rubber-stamps changes).

## 🧪 Hands-on Labs

Work through **`labs/lab-02-component-testing.md`**. You'll take the "lying" Forge order-summary component — whose internal-state test is green while the displayed total is wrong — and rewrite the test to assert on **rendered output**. You'll prove the new test goes **red** on the display bug and **green** after the fix, and that it **survives** a refactor of how the total is computed. The component's `formatTotal` logic is verified directly with `node:test`; the rendered-output assertions follow the testing-library pattern.

## 🔍 Engineering Investigation

Run the internal-state test against the buggy component and record that it *passes* despite the wrong display (the lie). Rewrite it to assert on the rendered total; run it and record that it now *fails* (catches the bug). Fix the component; confirm green. Then refactor how the total is computed (without changing behavior) and confirm the behavior test stays green while an internals test would have broken.

## 🤖 AI Engineering Exercise

Ask an AI to "test this component." **Verify** it asserts on rendered output and user interactions, not on state/props/internal calls. Break the displayed value and run the tests — do they catch it? **Log** any test that asserted on internals (brittle/lying) and rewrite it to test behavior.

## 📝 Assignment

Submit: the lying test shown passing against the bug, the behavior test shown failing on the bug then passing after the fix, evidence it survives a behavior-preserving refactor, and a note on one internals assertion you removed and why.

## 🚀 Stretch Goal

Test an accessibility-relevant behavior (a button's disabled state, an error announced to screen readers via role/aria) and explain how testing by role/label improves both the test and the UI.

## ✅ Definition of Done

- [ ] Tests assert on rendered output / user-observable behavior
- [ ] The display bug is caught (red) then fixed (green)
- [ ] Queries/interactions mirror how a user finds and uses the UI
- [ ] Tests survive a behavior-preserving refactor
- [ ] At least one internals assertion identified and replaced

## 🪞 Reflection

How did the internal-state test "lie"? What does "would a user notice this change?" rule in and out of your component tests?
