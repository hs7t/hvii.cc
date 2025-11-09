<script lang="ts">
	import '$lib/styles/style.css';

	let { children, data } = $props();

	let favicon =
		'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☀️</text></svg>';
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{data.title}</title>
</svelte:head>

<header id="header">
	<div class="section website-info">
		<a href="#navigation">placeholder</a>
		<p><a href="/">hvii.cc</a></p>
	</div>
	<div class="section site-details">
		<p>{data.title}</p>
	</div>
</header>

<main>
	{@render children()}
</main>

<nav id="navigation">
	<ul>
		<li>About</li>
		<li>Projects</li>
		<li>Writing</li>
	</ul>
</nav>

<style>
	header {
		display: flex;
		flex-direction: column;
	}

	header .section {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: 0.8rem;
		flex-grow: 1;
	}

	header .section.website-info {
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
	}

	nav ul {
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		padding: 0.8rem;
		flex-grow: 1;
	}

	nav ul li {
		list-style: none;
	}

	main, header .section, nav {
		border: var(--w-border-general);
		border-top: unset;
	}
</style>
