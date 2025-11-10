<script lang="ts">
	import orbImage from '../assets/orb.svg';
</script>

<button
	onclick={() => {
        location.hash = '';
		location.hash = '#navigation';
	}}
	aria-label="Scroll to navigation"
	title="Scroll to navigation"
>
	<img src={orbImage} alt="" />
</button>

<style>
	button {
		all: unset;

		display: flex;
		align-items: center;
		justify-content: center;
		width: var(--w-font-size-A);
		height: var(--w-font-size-A);

		background-color: var(--w-color-accent-A);
		cursor: pointer;
	}

	button img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
	}
</style>
