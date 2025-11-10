<script lang="ts">
	import Orb from './Orb.svelte';

	let { title } = $props();
</script>

<header id="header">
	<div class="section website-info">
		<Orb />
		<p><a href="/">hvii.cc</a></p>
	</div>
	<div class="section page-info">
		<p>{title}</p>
	</div>
</header>

<style>
	header {
		display: flex;
		flex-direction: column;
	}

	header .section {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		padding: 0.8rem;
		flex-grow: 1;

		border: var(--w-border-general);
		border-top: unset;
	}

	header .section.website-info {
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
	}

	header .section.page-info {
		justify-content: center;
	}
</style>
