import { building } from "$app/environment";
import { type ExtendedGlobal, GlobalThisWSS } from "$lib/server/websocket";
import { nanoid } from "nanoid";

export const handle = ({ event, resolve }) => {
  if (!building) {
    const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];
    event.locals.wss = wss;
  }

  return resolve(event);
}

// New hook in SvelteKit
export const init = async () => {
  const wss = (globalThis as ExtendedGlobal)[GlobalThisWSS];

  wss.on('connection', (ws) => {
    ws.socketId = nanoid();
    console.log(`[wss:client] Client ${ws.socketId} connected`);

    // Send test message
    ws.send('Hello, Client!');

    ws.on('message', (message) => {
      console.log(`[wss:client] Client ${ws.socketId} send message: ${message}`);
      if (message.toString() === 'clients') {
        const clients = Array.from(wss.clients).map((client) => {
          return client.socketId;
        });
        ws.send(`Clients: ${clients.join(', ')}`);
      }
    });
    ws.on('close', () => {
      console.log(`[wss:client] Client ${ws.socketId} disconnected`);
    });
  });
}