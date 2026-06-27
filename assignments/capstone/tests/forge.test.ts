import { describe, it, expect } from 'vitest';
import {
  finalPrice,
  applyCoupon,
  createSpy,
  checkout,
  parseCoverage,
  passesGate,
  pyramidOk,
  type Cart,
  type EmailMessage,
} from '../src/forge';

describe('capstone — the Forge quality platform', () => {
  it('finalPrice clamps and validates (unit logic)', () => {
    expect(finalPrice(100, 0.2)).toBe(80);
    expect(finalPrice(100, 1)).toBe(0);
    expect(() => finalPrice(100, 1.5)).toThrow(/discount/);
  });

  it('applyCoupon handles both variants and caps at 0 (TDD feature)', () => {
    expect(applyCoupon(100, { type: 'flat', off: 20 })).toBe(80);
    expect(applyCoupon(100, { type: 'percent', pct: 0.1 })).toBe(90);
    expect(applyCoupon(15, { type: 'flat', off: 20 })).toBe(0);
    expect(() => applyCoupon(100, { type: 'flat', off: -5 })).toThrow(/invalid/);
  });

  it('checkout keeps pricing real and doubles the boundary (test doubles)', () => {
    const sendEmail = createSpy<[EmailMessage]>();
    const cart: Cart = { email: 'a@x.com', items: [{ priceCents: 5000, qty: 2 }] };
    const result = checkout(cart, {
      payment: { charge: () => ({ id: 'pay_test' }) },
      now: () => new Date('2024-01-01T00:00:00Z'),
      sendEmail,
    });
    expect(result.totalCents).toBe(10000);
    expect(result.at).toBe('2024-01-01T00:00:00.000Z');
    expect(result.paymentId).toBe('pay_test');
    expect(sendEmail.callCount()).toBe(1);
    const [firstCall] = sendEmail.calls;
    expect(firstCall?.[0]).toEqual({ to: 'a@x.com', template: 'order_confirmed' });
  });

  it('checkout rejects an empty cart', () => {
    expect(() =>
      checkout(
        { email: 'a@x.com', items: [] },
        { payment: { charge: () => ({ id: 'p' }) }, now: () => new Date(), sendEmail: createSpy<[EmailMessage]>() },
      ),
    ).toThrow(/empty cart/);
  });

  it('parseCoverage + passesGate make the release decision (quality gate)', () => {
    const cov = parseCoverage({ lines: { covered: 88, total: 100 }, branches: { covered: 17, total: 20 } });
    expect(cov).toEqual({ lines: 88, branches: 85 });
    expect(passesGate({ ...cov, testsFailed: 0 }).pass).toBe(true);
    expect(passesGate({ ...cov, testsFailed: 1 }).pass).toBe(false);
    expect(passesGate({ lines: 70, branches: 90, testsFailed: 0 }).pass).toBe(false);
  });

  it('pyramidOk confirms a bottom-heavy suite', () => {
    expect(pyramidOk({ unit: 20, integration: 6, e2e: 2 })).toBe(true);
    expect(pyramidOk({ unit: 1, integration: 6, e2e: 9 })).toBe(false);
  });
});
