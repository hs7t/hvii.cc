<script lang="ts">
	import orbImage from '../assets/orb.svg';

	let spinning = $state(false);

	function handleClick() {
		spinning = true;
		setTimeout(() => {
			spinning = false;
		}, 600);
		location.hash = '';
		location.hash = '#navigation';
	}
</script>

<button
	onclick={handleClick}
	class:spinning
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
		transition: transform 0.3s ease;
	}

	button:hover {
		transform: scale(1.1);
	}

	button.spinning {
		animation: spin 0.6s ease-in-out;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg) scale(1);
		}
		50% {
			transform: rotate(180deg) scale(1.2);
		}
		100% {
			transform: rotate(360deg) scale(1);
		}
	}

	button img {
		width: 100%;
		height: 100%;
		aspect-ratio: 1 / 1;
	}
</style>
