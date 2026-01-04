<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import ChatButton from '$lib/components/ChatButton.svelte';
	import Chatbot from '$lib/components/Chatbot.svelte';
	import { page } from '$app/state';
	import '$lib/styles/style.css';

	let { children, data } = $props();

	let chatbotOpen = $state(false);

	let favicon =
		'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☀️</text></svg>';

	// Konami code easter egg!
	onMount(() => {
		const konamiCode = [
			'ArrowUp',
			'ArrowUp',
			'ArrowDown',
			'ArrowDown',
			'ArrowLeft',
			'ArrowRight',
			'ArrowLeft',
			'ArrowRight',
			'KeyB',
			'KeyA'
		];
		let konamiIndex = 0;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.code === konamiCode[konamiIndex]) {
				konamiIndex++;
				if (konamiIndex === konamiCode.length) {
					// Easter egg activated!
					konamiIndex = 0;
					goto('/secret');
				}
			} else {
				konamiIndex = 0;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{page.data.title}</title>
</svelte:head>

<div id="main-container">
	<Header title={page.data.title} />
	<main>
		{@render children()}
	</main>
	<Navigation id="navigation" />
</div>

{#if !chatbotOpen}
	<ChatButton
		onclick={() => {
			chatbotOpen = true;
		}}
	/>
{/if}

<Chatbot
	isOpen={chatbotOpen}
	onClose={() => {
		chatbotOpen = false;
	}}
/>

<style>
	#main-container {
		width: clamp(40dvw, 100dvw, 600px);
		margin: auto;
	}

	main {
		border: var(--w-border-general);
		border-top: unset;
	}
</style>
