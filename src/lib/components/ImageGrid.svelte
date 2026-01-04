<script lang="ts">
	import { onMount } from "svelte"

    let Masonry: any
    let element: undefined | HTMLElement = undefined

	type GridItem = {
		location: string;
		date: string;
        href: string;
        alt: string;
	};

    onMount(async () => {
        if (element) {
            Masonry = (await import('masonry-layout')).default;
            const imagesLoaded = (await import('imagesloaded')).default;

            let masonry = new Masonry(element, {
                itemSelector: '.grid-item',
                gutter: '.gutter-sizer',
                columnWidth: '.grid-sizer',
                percentPosition: true,
            });

            imagesLoaded(element, () => {
                masonry.layout();
            });
        }
    });

	let { items }: { items: Array<GridItem> } = $props();
</script>

<div class="image-grid" bind:this={element}>
    <div class="grid-sizer"></div>
    <div class="gutter-sizer"></div>

	{#each items as item}
		<div class="grid-item">
            <a href={item.href}>
                <img src={item.href} alt={item.alt}> <!-- TODO: ADD ALT TEXT!!! EXTREMELY IMPORTANT-->
                <p>{item.location}<br>{item.date}</p>
            </a>
		</div>
	{/each}
</div>

<style>
    .image-grid {
        width: 100%;
        container-name: word-container;
    }

    .grid-sizer,
	.grid-item {
        width: 30%;
        margin-bottom: 5%;
    }

    .grid-item {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        font-size: var(--w-font-size-B);
    }

    .gutter-sizer {
        width: 5%;
    }

    .grid-item img {
        display: block;
        width: 100%;
    }
</style>