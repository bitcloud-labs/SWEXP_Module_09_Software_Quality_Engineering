import { describe, it, expect } from 'vitest';
import { finalPrice } from '../src/pricing';

describe('lab 01 — the production outage (fix the bug)', () => {
  it('happy path: a 20% discount on 100 is 80', () => {
    expect(finalPrice(100, 0.2)).toBe(80);
  });
  it('boundary: a 0% discount is the full price', () => {
    expect(finalPrice(100, 0)).toBe(100);
  });
  it('boundary: a 100% discount is zero, never negative (the outage)', () => {
    expect(finalPrice(100, 1)).toBe(0);
  });
  it('error path: rejects a discount above 1', () => {
    expect(() => finalPrice(100, 1.5)).toThrow(/discount/);
  });
  it('error path: rejects a negative discount', () => {
    expect(() => finalPrice(100, -0.1)).toThrow(/discount/);
  });
});
