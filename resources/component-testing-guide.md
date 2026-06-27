# Component Testing Guide

## Test behavior, not implementation
Assert on what the **user sees**, not internal state/props.
```jsx
// BAD — lies and breaks on refactor
expect(wrapper.state('total')).toBe(80);
// GOOD — fails iff the user sees the wrong thing
render(<OrderSummary items={items} />);
expect(screen.getByText('Total: $80.00')).toBeInTheDocument();
```

## Query like a user
Prefer visible text, accessible role, and label over CSS/test-ids:
`getByRole('button', { name: /checkout/i })`, `getByText`, `getByLabelText`. If the query mirrors how a user (or assistive tech) finds the element, the test checks usability too.

## Interact like a user
Drive events, then assert on the new output:
```jsx
fireEvent.click(screen.getByRole('button', { name: /add item/i }));
expect(screen.getByText('Total: $90.00')).toBeInTheDocument();
```

## The dividing line
"Would a user notice if this changed?" Yes → test it (rendered total, disabled state, error message). No → don't (which hook holds state, an internal variable name). Internals-coupled tests are brittle *and* dishonest.

## The logic underneath is unit-testable
The pure function the component uses (`formatTotal(items)`) gets a direct unit test; the component test verifies it's wired to the UI. *(In this module the behavior logic runs under `node:test`; the full DOM render runs in your project via a testing library + jsdom — same assertions.)*

## Gotchas
- Asserting on state/props/internal calls; querying by CSS class/test-id.
- Not triggering the interaction before asserting; giant snapshots that assert nothing.
