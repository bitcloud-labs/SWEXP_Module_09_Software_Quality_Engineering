/**
 * Lab 03 — The API Contract Investigation. See README.md.
 * Wire the order route to a real in-process server. No `any`, no `as`.
 */
import http from 'node:http';

export interface OrderItem {
  sku: string;
  qty: number;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: 'placed';
}

/** Create the real Forge app: an in-memory data layer + the wired POST /orders route. */
export function createServer(): http.Server {
  const orders: Order[] = []; // in-memory data layer (real-ish)

  return http.createServer(async (req, res) => {
    const json = (code: number, obj: unknown): void => {
      res.writeHead(code, { 'content-type': 'application/json' });
      res.end(JSON.stringify(obj));
    };

    if (req.method === 'POST' && req.url === '/orders') {
      let body = '';
      for await (const chunk of req) body += chunk;
      let data: { items?: OrderItem[] };
      try {
        data = JSON.parse(body || '{}');
      } catch {
        data = {};
      }

      // TODO: validation seam — if items is missing or empty, reply 400 { error: 'items required' }.

      // TODO: handler seam — build the order { id, items, status: 'placed' }, push it to `orders`,
      //       and reply 201 with the created order. (id starts at 1 and increments.)

      return json(500, { error: 'not implemented' }); // replace this with the wired 400/201 above
    }

    // TODO: any other route/method → 404.
    json(500, { error: 'not implemented' });
  });
}
