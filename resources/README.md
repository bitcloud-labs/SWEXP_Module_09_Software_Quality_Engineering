# Resources — Software Quality Engineering

Working references to keep open while you build the Forge test suite. Quick-reference cheatsheets and playbooks, not reading assignments.

| Resource | Use it for |
|----------|-----------|
| `quality-setup-guide.md` | the `node:test` runner + the run/red-green verify loop |
| `unit-testing-guide.md` | isolated fast tests; boundaries, error paths, specific assertions |
| `component-testing-guide.md` | behavior not internals; query/interact like a user |
| `integration-testing-guide.md` | real stack, assert the contract, double only externals |
| `e2e-testing-guide.md` | the full journey, the pyramid, flakiness |
| `tdd-guide.md` | red → green → refactor; simplest thing that works |
| `test-doubles-guide.md` | stub / fake / mock / spy; boundary not core |
| `quality-gates-ci-guide.md` | coverage threshold, the gate that blocks |
| `test-pyramid-reference.md` | what to test at which level, and how much |
| `node-test-reference.md` | the `node:test` API: test/assert/mock.fn()/coverage |
| `testing-strategy-guide.md` | choosing the level; confidence not coverage |
| `ai-workflow-guide.md` | draft → verify (make it fail first) → log |
| `engineering-notebook-template.md` | the notebook structure you submit |

**Threads through all of them:** a test must fail before you trust it; test behavior, not implementation; a bug is a missing test; double at the boundary, not the core; confidence, not coverage; quality is a gate, not a phase; match the test to the question (the pyramid).
