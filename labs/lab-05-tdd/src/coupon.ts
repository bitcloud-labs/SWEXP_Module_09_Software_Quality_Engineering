/**
 * Lab 05 — Never Write Untested Code Again. See README.md.
 * Build applyCoupon test-first over a discriminated union. No `any`, no `as`.
 */

export type Coupon =
  | { type: 'flat'; off: number }
  | { type: 'percent'; pct: number };

/**
 * Apply a coupon to `total`.
 *   flat    → total - off, capped at 0 (never negative)
 *   percent → total - total * pct
 * Throws an Error whose message contains 'invalid' for a negative off/pct.
 */
export function applyCoupon(total: number, coupon: Coupon): number {
  // TODO: narrow on coupon.type; cap flat at 0; reject negative values with an 'invalid' error.
  return total;
}
