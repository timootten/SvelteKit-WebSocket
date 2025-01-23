import { parse } from 'url';
import { WebSocketServer } from 'ws';
import WebSocketBase from 'ws';
import type { IncomingMessage } from 'http';
import type { Duplex } from 'stream';
import type { PluginOption } from 'vite';

export const GlobalThisWSS = Symbol.for('sveltekit.wss');

declare class ExtendedWebSocket extends WebSocketBase {
  socketId: string;
}

export type { ExtendedWebSocket };

export type ExtendedWebSocketServer = WebSocketBase.Server<typeof ExtendedWebSocket>;

export type ExtendedGlobal = typeof globalThis & {
  [GlobalThisWSS]: ExtendedWebSocketServer;
};

export const viteWebsocketServer: PluginOption = {
  name: 'integratedWebsocketServer',
  configureServer(server) {
    createWSSGlobalInstance();
    server.httpServer?.on('upgrade', onHttpServerUpgrade);
  },
  configurePreviewServer(server) {
    createWSSGlobalInstance();
    server.httpServer?.on('upgrade', onHttpServerUpgrade);
  }
};

const onHttpServerUpgrade = (req: IncomingMessage, sock: Duplex, head: Buffer) => {
  const pathname = req.url ? parse(req.url).pathname : null;
  if (pathname !== '/websocket') return;

  const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];

  wss.handleUpgrade(req, sock, head, (ws) => {
    wss.emit('connection', ws, req);
  });
};

const createWSSGlobalInstance = () => {
  const wss = new WebSocketServer({ noServer: true }) as ExtendedWebSocketServer;

  (globalThis as ExtendedGlobal)[GlobalThisWSS] = wss;

  return wss;
};