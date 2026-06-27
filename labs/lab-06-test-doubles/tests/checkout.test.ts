import { describe, it, expect } from 'vitest';
import { checkout, createSpy, type Cart, type EmailMessage } from '../src/checkout';

describe('lab 06 — test doubles', () => {
  it('createSpy records every call and its arguments', () => {
    const spy = createSpy<[number, string]>();
    expect(spy.callCount()).toBe(0);
    spy(1, 'a');
    spy(2, 'b');
    expect(spy.callCount()).toBe(2);
    expect(spy.calls[0]).toEqual([1, 'a']);
    expect(spy.calls[1]).toEqual([2, 'b']);
  });

  it('checkout keeps pricing real and doubles the boundary', () => {
    const payment = { charge: () => ({ id: 'pay_test' }) }; // stub/fake
    const now = () => new Date('2024-01-01T00:00:00Z'); // injected clock
    const sendEmail = createSpy<[EmailMessage]>(); // spy
    const cart: Cart = { email: 'a@x.com', items: [{ priceCents: 5000, qty: 2 }] };

    const result = checkout(cart, { payment, now, sendEmail });

    expect(result.totalCents).toBe(10000); // REAL pricing verified
    expect(result.at).toBe('2024-01-01T00:00:00.000Z'); // deterministic clock
    expect(result.paymentId).toBe('pay_test');
    expect(result.status).toBe('paid');
    expect(sendEmail.callCount()).toBe(1); // spy: sent exactly once
    const [firstCall] = sendEmail.calls;
    expect(firstCall?.[0]).toEqual({ to: 'a@x.com', template: 'order_confirmed' });
  });

  it('checkout rejects an empty cart', () => {
    const deps = {
      payment: { charge: () => ({ id: 'pay_test' }) },
      now: () => new Date('2024-01-01T00:00:00Z'),
      sendEmail: createSpy<[EmailMessage]>(),
    };
    expect(() => checkout({ email: 'a@x.com', items: [] }, deps)).toThrow(/empty cart/);
  });
});
