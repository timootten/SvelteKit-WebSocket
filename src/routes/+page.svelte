<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Page');
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		const websocket = new WebSocket(`${protocol}//${window.location.host}/websocket`);
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
