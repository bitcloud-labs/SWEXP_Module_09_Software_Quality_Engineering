/**
 * Lab 01 — The Production Outage. See README.md.
 * This is the BUGGY Forge pricing function that took down checkout.
 * The tests encode the correct behaviour and start RED — fix the cause until green.
 */

/**
 * Apply a fractional discount `pct` (in [0, 1]) to `price`.
 * BUG: subtracts an extra 1 and never clamps, so a 100% discount goes negative
 *      and out-of-range discounts are silently accepted.
 *
 * TODO(fix):
 *   - return price - price * pct
 *   - clamp the result to >= 0 (a 100% discount is 0, never negative)
 *   - throw new Error('...discount...') when pct < 0 or pct > 1
 */
export function finalPrice(price: number, pct: number): number {
  return price - price * pct - 1;
}
