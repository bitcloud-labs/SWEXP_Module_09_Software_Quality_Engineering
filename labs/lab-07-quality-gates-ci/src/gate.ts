/**
 * Lab 07 — Can We Trust This Release? See README.md.
 * Parse coverage, gate on a threshold, check the pyramid. No `any`, no `as`.
 */

export interface CoverageMetric {
  covered: number;
  total: number;
}

export interface RawCoverage {
  lines: CoverageMetric;
  branches: CoverageMetric;
}

export interface CoveragePercent {
  lines: number;
  branches: number;
}

export interface GateSummary {
  lines: number;
  branches: number;
  testsFailed: number;
}

export interface GateResult {
  pass: boolean;
  reason: string;
}

export interface PyramidCounts {
  unit: number;
  integration: number;
  e2e: number;
}

/** Parse a coverage report into integer percentages (a total of 0 is 100% — nothing to cover). */
export function parseCoverage(raw: RawCoverage): CoveragePercent {
  // TODO: round(covered / total * 100) for lines and branches; total === 0 → 100.
  return { lines: 0, branches: 0 };
}

/** The quality gate: block on a failing test or sub-threshold coverage. */
export function passesGate(summary: GateSummary, min = 80): GateResult {
  // TODO: testsFailed > 0 → blocked (reason mentions 'tests');
  //       lines < min || branches < min → blocked (reason mentions 'coverage');
  //       else { pass: true, reason: 'all gates green' }.
  return { pass: false, reason: '' };
}

/** A healthy pyramid is bottom-heavy: more unit than integration, at least as many integration as e2e. */
export function pyramidOk(counts: PyramidCounts): boolean {
  // TODO: counts.unit > counts.integration && counts.integration >= counts.e2e.
  return false;
}
