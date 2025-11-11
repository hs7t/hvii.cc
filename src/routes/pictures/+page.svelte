<script lang="ts">
	import { page } from '$app/state';
	import ImageGrid from '$lib/components/ImageGrid.svelte';

	type PicturePost = {
		date: string,
		href: string,
		location: string,
		alt: string,
	}

	let posts = $derived(
		(page.data.posts || []).map((post: any) => ({
			date: post.meta.date,
			href: post.meta.href,
            location: post.meta.location,
			alt: post.meta.alt,
		} as PicturePost))
	);
</script>
<section class="primary">
    <h1>Pictures</h1>
    <p>
        I'm not one to shoot great pictures, but I enjoy trying to 
        do so. This page contains some of my favorite pictures I've
        taken.
    </p>
    <section>
        <ImageGrid items={posts} />
    </section>
</section>

