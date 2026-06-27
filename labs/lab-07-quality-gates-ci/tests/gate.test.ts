import { describe, it, expect } from 'vitest';
import { parseCoverage, passesGate, pyramidOk } from '../src/gate';

describe('lab 07 — quality gates & CI', () => {
  it('parseCoverage computes integer percentages', () => {
    expect(parseCoverage({ lines: { covered: 88, total: 100 }, branches: { covered: 17, total: 20 } })).toEqual({
      lines: 88,
      branches: 85,
    });
  });
  it('parseCoverage treats an empty total as 100%', () => {
    expect(parseCoverage({ lines: { covered: 0, total: 0 }, branches: { covered: 0, total: 0 } })).toEqual({
      lines: 100,
      branches: 100,
    });
  });

  it('gate blocks on a failing test regardless of coverage', () => {
    const r = passesGate({ lines: 95, branches: 95, testsFailed: 1 });
    expect(r.pass).toBe(false);
    expect(r.reason).toMatch(/tests/);
  });
  it('gate blocks on low line coverage', () => {
    const r = passesGate({ lines: 70, branches: 90, testsFailed: 0 });
    expect(r.pass).toBe(false);
    expect(r.reason).toMatch(/coverage/);
  });
  it('gate blocks on low branch coverage', () => {
    expect(passesGate({ lines: 90, branches: 60, testsFailed: 0 }).pass).toBe(false);
  });
  it('gate opens when green and above the threshold', () => {
    const r = passesGate({ lines: 88, branches: 85, testsFailed: 0 });
    expect(r.pass).toBe(true);
    expect(r.reason).toBe('all gates green');
  });
  it('a custom threshold is respected', () => {
    expect(passesGate({ lines: 88, branches: 85, testsFailed: 0 }, 90).pass).toBe(false);
  });

  it('pyramidOk accepts a bottom-heavy suite', () => {
    expect(pyramidOk({ unit: 20, integration: 6, e2e: 2 })).toBe(true);
  });
  it('pyramidOk rejects an inverted (top-heavy) suite', () => {
    expect(pyramidOk({ unit: 2, integration: 6, e2e: 20 })).toBe(false);
  });
});
