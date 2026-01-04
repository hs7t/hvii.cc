<script>
	import { page } from '$app/state';
</script>

<article class="primary">
	<p>{page.data.date}</p>
	<h1>{page.data.title}</h1>

	<div class="paragraph-block">
		<svelte:component this={page.data.content} />
	</div>
</article>
