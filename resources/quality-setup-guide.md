# Quality Setup Guide

## The runner is built in
Node ships a test runner — no framework to install:
```bash
node --version                       # node:test is built in
node --test                          # runs *.test.mjs / test files
node --test --experimental-test-coverage   # with coverage
```
```js
import { test } from 'node:test';
import assert from 'node:assert';
test('it works', () => { assert.strictEqual(1 + 1, 2); });
```

## The verify loop (every lab)
1. **Run** the test — see the real `# pass` / `# fail` counts.
2. **Red first** — run it against broken/missing code and confirm it **fails** (and the runner exits nonzero: `node --test; echo $?`).
3. **Green** — make it pass.
4. **Evidence** — paste the red run and the green run into your notebook.

## What the runner gives you
| Need | Tool |
|------|------|
| run tests | `node --test` |
| assert | `node:assert` (`strictEqual`, `deepStrictEqual`, `throws`, `match`) |
| spies/mocks | `import { mock } from 'node:test'` → `mock.fn()` |
| coverage | `node --test --experimental-test-coverage` |
| integration/e2e | `node:http` in-process server + global `fetch` |

## Exit codes are the gate
`node --test` exits **0** when all pass and **nonzero** when any fail — which is exactly what a CI quality gate keys on (Lesson 7). A failing test blocks the merge.

## Gotchas
- A test that never fails proves nothing — always see red first.
- `assert.ok(x)` is weak; prefer `assert.strictEqual(x, expected)`.
- Hidden I/O / clock / randomness makes a "unit" test slow or flaky — inject them (Lesson 6).
