<script lang="ts">
	type GridItem = {
		name: string;
		anchor: string;
	};

	let { items }: { items: Array<GridItem> } = $props();
</script>

<div class="anchor-grid">
	{#each items as item}
		<div class="grid-item">
			<a href={item.anchor}>
				<div class="content">
					{item.name}
				</div>
			</a>
		</div>
	{/each}
</div>

<style>
	.anchor-grid {
		display: grid;
		width: 100%;

		gap: 0.5rem;
		grid-template-columns: repeat(auto-fit, minmax(10ch, 1fr));
		overflow: visible;
	}

	.grid-item {
		aspect-ratio: 1 / 1;
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);

		line-height: 1;
		font-size: var(--w-font-size-B);
		overflow: visible;
	}

	.grid-item a,
	.grid-item .content {
		display: block;
		width: 100%;
		height: 100%;
	}

	.grid-item a:focus {
		outline: var(--w-border-attention);
		outline-offset: 3pt;
	}

	.grid-item .content {
		padding: 1ch;
		user-select: none;
	}

	.grid-item a {
		text-decoration: none;
	}
</style>
