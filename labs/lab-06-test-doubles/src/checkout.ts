/**
 * Lab 06 — What Should Be Real? See README.md.
 * Double the boundary, keep the core real, and build the spy you verify with.
 * No `any`, no `as`.
 */

export interface CartItem {
  priceCents: number;
  qty: number;
}

export interface Cart {
  email: string;
  items: CartItem[];
}

export interface EmailMessage {
  to: string;
  template: string;
}

export interface Charge {
  id: string;
}

export interface CheckoutDeps {
  payment: { charge(totalCents: number): Charge }; // boundary: external
  now(): Date; // boundary: clock
  sendEmail(msg: EmailMessage): void; // boundary: side effect
}

export interface Receipt {
  status: 'paid';
  totalCents: number;
  paymentId: string;
  at: string;
}

/** A spy: records every call's arguments and how many times it was called. */
export interface Spy<A extends unknown[]> {
  (...args: A): void;
  calls: A[];
  callCount(): number;
}

/** Build a callable spy that records each call (the stub/mock/spy primitive). */
export function createSpy<A extends unknown[]>(): Spy<A> {
  // TODO: make a function that pushes its args into `calls`; attach `calls` and `callCount()`.
  const fn = (..._args: A): void => {};
  return Object.assign(fn, { calls: [] as A[], callCount: () => 0 });
}

/** Checkout: real pricing, doubled boundary (payment, clock, email). */
export function checkout(cart: Cart, deps: CheckoutDeps): Receipt {
  // TODO:
  //   - totalCents = sum of priceCents * qty over cart.items (REAL core logic)
  //   - if totalCents <= 0 throw new Error('empty cart')
  //   - const charge = deps.payment.charge(totalCents)
  //   - deps.sendEmail({ to: cart.email, template: 'order_confirmed' })
  //   - return { status: 'paid', totalCents, paymentId: charge.id, at: deps.now().toISOString() }
  return { status: 'paid', totalCents: 0, paymentId: '', at: '' };
}
