import { describe, it, expect } from 'vitest';
import { formatTotal, renderSummary } from '../src/summary';

const items = [{ priceCents: 5000 }, { priceCents: 3000 }];

describe('lab 02 — components that lie (test behaviour)', () => {
  it('formatTotal renders the user-facing dollar string', () => {
    expect(formatTotal(items)).toBe('$80.00');
  });
  it('formatTotal formats whole and fractional dollars with two decimals', () => {
    expect(formatTotal([{ priceCents: 199 }])).toBe('$1.99');
    expect(formatTotal([])).toBe('$0.00');
  });
  it('renderSummary shows the correct total to the user', () => {
    expect(renderSummary(items).totalText).toBe('Total: $80.00');
  });
});
