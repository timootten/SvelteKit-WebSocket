<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let websocket: WebSocket;

	onMount(() => {
		console.log('Page');
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
		websocket = new WebSocket(`${protocol}//${window.location.host}/websocket`);
		websocket.addEventListener('open', () => {
			console.log('Connected to websocket');
		});

		websocket.addEventListener('message', (event) => {
			console.log('Message from server: ', event.data);
		});

		websocket.addEventListener('close', () => {
			console.log('Disconnected from websocket');
		});

		return () => {
			websocket.close();
		};
	});

	let message = $state('');
	const sendMessage = () => {
		websocket.send(message);
		message = '';
	};
</script>

<h1>Hello from page :)</h1>

<form
	onsubmit={(e) => {
		e.preventDefault();
		sendMessage();
	}}
>
	<input type="text" bind:value={message} placeholder="Hello World!" />
	<button type="submit">Send</button>
</form>
