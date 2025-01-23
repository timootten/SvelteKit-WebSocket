import { viteWebsocketServer } from './src/lib/server/websocket';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit(), viteWebsocketServer]
});
