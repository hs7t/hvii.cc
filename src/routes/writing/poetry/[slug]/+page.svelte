<script>
	import { page } from '$app/state';
</script>

<article>
	<h1>{page.data.title}</h1>
	<p>Published: {page.data.date}</p>
	<svelte:component this={page.data.content} />
</article>
