import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { createServer } from '../src/server';

let server: Server;
let base: string;
const H = { 'content-type': 'application/json' };

beforeEach(async () => {
  server = createServer();
  await new Promise<void>((r) => server.listen(0, r));
  const { port } = server.address() as AddressInfo;
  base = `http://localhost:${port}`;
});

afterEach(async () => {
  await new Promise<void>((r) => server.close(() => r()));
});

describe('lab 03 — the API contract investigation', () => {
  it('POST /orders with items → 201 + created order', async () => {
    const res = await fetch(`${base}/orders`, {
      method: 'POST',
      headers: H,
      body: JSON.stringify({ items: [{ sku: 'A', qty: 2 }] }),
    });
    expect(res.status).toBe(201);
    const body = (await res.json()) as { id: number; status: string; items: unknown };
    expect(body.id).toBe(1);
    expect(body.status).toBe('placed');
    expect(body.items).toEqual([{ sku: 'A', qty: 2 }]);
  });

  it('order ids increment per created order', async () => {
    await fetch(`${base}/orders`, { method: 'POST', headers: H, body: JSON.stringify({ items: [{ sku: 'A', qty: 1 }] }) });
    const res = await fetch(`${base}/orders`, { method: 'POST', headers: H, body: JSON.stringify({ items: [{ sku: 'B', qty: 1 }] }) });
    const body = (await res.json()) as { id: number };
    expect(body.id).toBe(2);
  });

  it('POST /orders {} → 400 + error (the seam)', async () => {
    const res = await fetch(`${base}/orders`, { method: 'POST', headers: H, body: '{}' });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/items required/);
  });

  it('unknown route → 404', async () => {
    const res = await fetch(`${base}/nope`);
    expect(res.status).toBe(404);
  });
});
