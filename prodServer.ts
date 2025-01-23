import * as path from 'path';
import * as url from 'url';
import { WebSocketServer } from 'ws';
import { parse } from 'url';

export const GlobalThisWSS = Symbol.for('sveltekit.wss');

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const wss = new WebSocketServer({ noServer: true });
(globalThis)[GlobalThisWSS] = wss;

const { server } = await import(path.resolve(__dirname, './build/index.js'));

server.server.on('upgrade', (req, sock, head) => {
  const pathname = req.url ? parse(req.url).pathname : null;
  if (pathname !== '/websocket') return;

  const wss = (globalThis)[GlobalThisWSS];

  wss.handleUpgrade(req, sock, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});