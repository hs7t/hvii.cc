<script lang="ts">
	import AnchorGrid from "$lib/components/AnchorGrid.svelte";
	import { page } from '$app/state';

	$: posts = (page.data.posts || []).map((post) => ({
		name: post.meta.title,
		anchor: post.path
	}));
</script>
<section class="primary">
    <h1>Writing</h1>
    <section>
        <h2>Poetry</h2>
    </section>

    <AnchorGrid items={posts}></AnchorGrid>
</section>

