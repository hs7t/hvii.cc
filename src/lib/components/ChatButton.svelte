<script lang="ts">
	let { onclick } = $props();
</script>

<button id="chat-button" {onclick} aria-label="Open chat">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
	</svg>
</button>

<style>
	#chat-button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: 60px;
		height: 60px;
		border-radius: 50%;
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
		border: var(--w-border-general);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px color-mix(in srgb, var(--w-color-accent-A) 30%, transparent);
		transition: transform 0.2s ease;
		z-index: 1000;
	}

	#chat-button:hover {
		transform: scale(1.1);
	}

	#chat-button:active {
		transform: scale(0.95);
	}
</style>
