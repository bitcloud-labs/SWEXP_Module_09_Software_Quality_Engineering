import { test, expectTypeOf } from 'vitest';
import type { Coupon } from '../src/coupon';

test('Coupon is the exact discriminated union', () => {
  expectTypeOf<Coupon>().toEqualTypeOf<
    { type: 'flat'; off: number } | { type: 'percent'; pct: number }
  >();
});
