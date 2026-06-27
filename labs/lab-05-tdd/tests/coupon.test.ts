import { describe, it, expect } from 'vitest';
import { applyCoupon } from '../src/coupon';

describe('lab 05 — TDD: applyCoupon', () => {
  it('flat coupon subtracts its amount', () => {
    expect(applyCoupon(100, { type: 'flat', off: 20 })).toBe(80);
  });
  it('percent coupon reduces by the fraction', () => {
    expect(applyCoupon(100, { type: 'percent', pct: 0.1 })).toBe(90);
  });
  it('a flat coupon larger than the total caps at 0 (never negative)', () => {
    expect(applyCoupon(15, { type: 'flat', off: 20 })).toBe(0);
  });
  it('rejects a negative flat amount', () => {
    expect(() => applyCoupon(100, { type: 'flat', off: -5 })).toThrow(/invalid/);
  });
  it('rejects a negative percent', () => {
    expect(() => applyCoupon(100, { type: 'percent', pct: -0.1 })).toThrow(/invalid/);
  });
});
