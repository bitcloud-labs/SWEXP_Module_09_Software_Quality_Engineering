/**
 * Lab 04 — A Customer Found the Bug. See README.md.
 * Drive the full journey; the bug is in the hand-off. No `any`, no `as`.
 */
import http from 'node:http';

interface User {
  email: string;
  cart: Array<{ sku: string; qty: number }>;
}

/** A small Forge app: signup → add-to-cart → checkout, wired by a per-user token. */
export function createApp(): http.Server {
  const users = new Map<string, User>(); // token -> user
  let nextToken = 1;

  return http.createServer(async (req, res) => {
    const send = (code: number, obj: unknown): void => {
      res.writeHead(code, { 'content-type': 'application/json' });
      res.end(JSON.stringify(obj));
    };

    let body = '';
    for await (const chunk of req) body += chunk;
    const data: { email?: string; sku?: string; qty?: number } = body ? JSON.parse(body) : {};
    const token = (req.headers.authorization ?? '').replace('Bearer ', '');

    if (req.url === '/signup' && req.method === 'POST') {
      // TODO: mint a token (e.g. 'tok_' + nextToken++), store { email, cart: [] }, reply 201 { token }.
      return send(500, { error: 'not implemented' });
    }

    if (req.url === '/cart/items' && req.method === 'POST') {
      // TODO: look up the user by `token`; 401 if unknown; else push { sku, qty } to THEIR cart,
      //       reply 200 { items: <cart length> }.
      return send(500, { error: 'not implemented' });
    }

    if (req.url === '/checkout' && req.method === 'POST') {
      // TODO: look up the user by `token`; 401 if unknown; 400 { error: 'empty cart' } if empty;
      //       else reply 201 { status: 'placed', items: <cart length> }.
      return send(500, { error: 'not implemented' });
    }

    send(404, {});
  });
}
