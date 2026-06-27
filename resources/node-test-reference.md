# node:test Reference

The built-in Node test runner — no framework to install.

## Run
```bash
node --test                                  # run test files (*.test.mjs, test/, etc.)
node --test --experimental-test-coverage     # with a coverage summary
node --test path/to/file.test.mjs            # a single file
node --test ; echo $?                         # exit 0 = all pass, nonzero = failure
```

## Write
```js
import { test, before, after, beforeEach, afterEach, mock } from 'node:test';
import assert from 'node:assert';

test('a thing', () => { assert.strictEqual(1 + 1, 2); });
test('async thing', async () => { const r = await work(); assert.ok(r.ok); });
```

## Assertions (node:assert)
| Assertion | Checks |
|-----------|--------|
| `assert.strictEqual(a, b)` | `a === b` (primitives) |
| `assert.deepStrictEqual(a, b)` | deep equality (objects/arrays) |
| `assert.ok(x)` | truthy (use sparingly — weak) |
| `assert.throws(fn, /regex/)` | `fn` throws a matching error |
| `assert.match(str, /regex/)` | string matches |
| `assert.rejects(promise, /regex/)` | promise rejects |

## Setup / teardown
`before` / `after` (once per file), `beforeEach` / `afterEach` (per test). Use them to start/stop an in-process server or reset state.

## Spies & mocks
```js
const fn = mock.fn();                 // a spy
fn('a'); 
fn.mock.callCount();                  // 1
fn.mock.calls[0].arguments;           // ['a']
const stub = mock.fn(() => 42);       // returns a canned value
```

## Integration / e2e (no extra deps)
```js
import http from 'node:http';
const server = http.createServer(handler);
await new Promise(r => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;
const res = await fetch(`${base}/health`);   // global fetch
```

## Gotchas
- Test files need the right name/location (`*.test.mjs` or under `test/`) to be picked up by `node --test`.
- Coverage is `--experimental-test-coverage`; read the `# all files` line.
- Always confirm a test can fail before trusting it.
