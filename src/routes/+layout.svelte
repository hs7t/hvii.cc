<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import { page } from '$app/state';
	import '$lib/styles/style.css';

	let { children, data } = $props();

	let favicon =
		'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☀️</text></svg>';
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
