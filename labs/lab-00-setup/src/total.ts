/**
 * Lab 00 — The Test Runner & Red/Green. See README.md.
 * Implement to the spec in tests/. No `any`, no `as`.
 */

export interface Priced {
  price: number;
}

/** Sum the `price` of every item. An empty list totals 0. */
export function total(items: readonly Priced[]): number {
  // TODO: accumulate items.reduce(...) over item.price.
  return 0;
}

/**
 * A tiny assertion helper — the heart of every test runner.
 * Return `true` when `actual` strictly equals `expected`; THROW an Error when they differ.
 * (A test that can never throw can never fail; a test that can never fail proves nothing.)
 */
export function expectEqual<T>(actual: T, expected: T): true {
  // TODO: if (actual !== expected) throw new Error(...); else return true.
  return true;
}
