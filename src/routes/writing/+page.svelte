<script lang="ts">
	import { page } from '$app/state';
	import AnchorGrid from '$lib/components/AnchorGrid.svelte';

	type WritingPost = {
		date: string,
		path: string,
		title: string
	}

	let posts = $derived(
		(page.data.posts || []).map((post: any) => ({
			title: post.meta.title,
			date: post.meta.date,
			path: post.path
		} as WritingPost))
	);
</script>
<section class="primary">
    <h1>Writing</h1>
	<section>
		<h2>Poetry</h2>
		<AnchorGrid items={posts} />
	</section>
</section>

