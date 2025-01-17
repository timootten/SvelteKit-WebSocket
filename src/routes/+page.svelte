<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Page');
		const websocket = new WebSocket('ws://localhost:5173/abc');
		websocket.addEventListener('open', () => {
			console.log('Connected to websocket');
		});

		websocket.addEventListener('message', (event) => {
			console.log('Message from server', event.data);
		});

		websocket.addEventListener('close', () => {
			console.log('Disconnected from websocket');
		});
	});
</script>
