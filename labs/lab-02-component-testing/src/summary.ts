/**
 * Lab 02 — Components That Lie. See README.md.
 * Test user-facing behaviour, not internal state. No `any`, no `as`.
 */

export interface CartLine {
  priceCents: number;
}

export interface SummaryView {
  totalText: string;
}

/** The user-facing total string: '$' + dollars with two decimals (cents / 100). */
export function formatTotal(items: readonly CartLine[]): string {
  // TODO: sum priceCents, divide by 100, format with toFixed(2), prefix with '$'.
  return '';
}

/** What the order-summary component renders (the text the user sees). */
export function renderSummary(items: readonly CartLine[]): SummaryView {
  // TODO: return { totalText: 'Total: ' + formatTotal(items) }.
  return { totalText: '' };
}
