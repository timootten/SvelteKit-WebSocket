// See https://svelte.dev/docs/kit/types#app.d.ts

import type { ExtendedWebSocketServer } from "$lib/server/websocket";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      wss: ExtendedWebSocketServer;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export { };
