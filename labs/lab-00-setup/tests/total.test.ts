import { describe, it, expect } from 'vitest';
import { total, expectEqual } from '../src/total';

describe('lab 00 — the test runner & red/green', () => {
  it('total sums item prices', () => {
    expect(total([{ price: 10 }, { price: 5 }])).toBe(15);
  });
  it('total of an empty list is 0', () => {
    expect(total([])).toBe(0);
  });
  it('expectEqual returns true (green) when values are equal', () => {
    expect(expectEqual(15, 15)).toBe(true);
    expect(expectEqual('a', 'a')).toBe(true);
  });
  it('expectEqual throws (red) when values differ', () => {
    expect(() => expectEqual(15, 16)).toThrow();
    expect(() => expectEqual('a', 'b')).toThrow();
  });
});
