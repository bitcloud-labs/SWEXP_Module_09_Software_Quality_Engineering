import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import type { AddressInfo } from 'node:net';
import type { Server } from 'node:http';
import { createApp } from '../src/app';

let server: Server;
let base: string;
const H = { 'content-type': 'application/json' };

beforeEach(async () => {
  server = createApp();
  await new Promise<void>((r) => server.listen(0, r));
  const { port } = server.address() as AddressInfo;
  base = `http://localhost:${port}`;
});

afterEach(async () => {
  await new Promise<void>((r) => server.close(() => r()));
});

describe('lab 04 — a customer found the bug (e2e journey)', () => {
  it('a customer can sign up, add an item, and check out', async () => {
    let res = await fetch(`${base}/signup`, { method: 'POST', headers: H, body: JSON.stringify({ email: 'a@x.com' }) });
    expect(res.status).toBe(201);
    const { token } = (await res.json()) as { token: string };
    expect(token).toBeTruthy();

    res = await fetch(`${base}/cart/items`, {
      method: 'POST',
      headers: { ...H, authorization: `Bearer ${token}` },
      body: JSON.stringify({ sku: 'A', qty: 1 }),
    });
    expect(res.status).toBe(200);
    const added = (await res.json()) as { items: number };
    expect(added.items).toBe(1);

    res = await fetch(`${base}/checkout`, { method: 'POST', headers: { authorization: `Bearer ${token}` } });
    expect(res.status).toBe(201);
    const done = (await res.json()) as { status: string };
    expect(done.status).toBe('placed'); // the journey's outcome
  });

  it('rejects an unauthenticated cart add', async () => {
    const res = await fetch(`${base}/cart/items`, { method: 'POST', headers: H, body: JSON.stringify({ sku: 'A', qty: 1 }) });
    expect(res.status).toBe(401);
  });

  it('checkout with an empty cart is a 400', async () => {
    const signup = await fetch(`${base}/signup`, { method: 'POST', headers: H, body: JSON.stringify({ email: 'b@x.com' }) });
    const { token } = (await signup.json()) as { token: string };
    const res = await fetch(`${base}/checkout`, { method: 'POST', headers: { authorization: `Bearer ${token}` } });
    expect(res.status).toBe(400);
    const body = (await res.json()) as { error: string };
    expect(body.error).toMatch(/empty cart/);
  });
});
