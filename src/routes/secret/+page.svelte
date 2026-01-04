<script lang="ts">
	import { onMount } from 'svelte';

	let score = $state(0);
	let gameActive = $state(false);
	let fishPosition = $state({ x: 50, y: 50 });
	let fishSize = $state(60);
	let timeLeft = $state(30);
	let highScore = $state(0);
	let gameMessage = $state('Click "Start" to catch some fish! 🐟');
	let gameTimer: ReturnType<typeof setInterval> | null = null;

	onMount(() => {
		const savedHighScore = localStorage.getItem('fishGameHighScore');
		if (savedHighScore) {
			highScore = parseInt(savedHighScore, 10);
		}

		// Cleanup timer on unmount
		return () => {
			if (gameTimer) {
				clearInterval(gameTimer);
			}
		};
	});

	function startGame() {
		// Clear any existing timer
		if (gameTimer) {
			clearInterval(gameTimer);
		}

		score = 0;
		timeLeft = 30;
		fishSize = 60;
		gameActive = true;
		gameMessage = 'Catch the fish! 🐟';
		moveFish();

		gameTimer = setInterval(() => {
			timeLeft--;
			if (timeLeft <= 0) {
				if (gameTimer) clearInterval(gameTimer);
				endGame();
			}
		}, 1000);
	}

	function moveFish() {
		if (!gameActive) return;

		const maxX = 90;
		const maxY = 80;
		fishPosition = {
			x: Math.random() * maxX,
			y: Math.random() * maxY
		};
	}

	function catchFish() {
		if (!gameActive) return;

		score++;
		fishSize = Math.max(20, fishSize - 2);

		// Make fish move faster as score increases
		moveFish();

		// Fun messages based on score
		if (score === 5) gameMessage = 'Nice catch! Keep going! 🎣';
		if (score === 10) gameMessage = "You're on fire! 🔥";
		if (score === 15) gameMessage = 'Amazing reflexes! 🌟';
		if (score === 20) gameMessage = 'Are you a cat?! 🐱';
	}

	function endGame() {
		gameActive = false;
		if (gameTimer) {
			clearInterval(gameTimer);
			gameTimer = null;
		}

		if (score > highScore) {
			highScore = score;
			localStorage.setItem('fishGameHighScore', score.toString());
			gameMessage = `🎉 NEW HIGH SCORE: ${score}! You're the ultimate fish catcher! 🏆`;
		} else {
			gameMessage = `Game Over! You caught ${score} fish! 🐟 High score: ${highScore}`;
		}
	}
</script>

<section class="primary game-container">
	<div class="game-header">
		<h1>🐟 Fish Catcher 3000 🐟</h1>
		<p class="subtitle">A completely necessary addition to hvii.cc</p>
		<div class="secret-image-container">
			<img src="https://i.imgur.com/6YwiHUS.jpeg" alt="Fun surprise" class="secret-image" />
			<p class="image-caption">✨ You found the special image! ✨</p>
		</div>
	</div>

	<div class="game-stats">
		<div class="stat">
			<span class="stat-label">Score:</span>
			<span class="stat-value">{score}</span>
		</div>
		<div class="stat">
			<span class="stat-label">Time:</span>
			<span class="stat-value">{timeLeft}s</span>
		</div>
		<div class="stat">
			<span class="stat-label">High Score:</span>
			<span class="stat-value">{highScore}</span>
		</div>
	</div>

	<div class="game-message">{gameMessage}</div>

	{#if !gameActive}
		<button class="start-button" onclick={startGame}>
			{score === 0 && highScore === 0 ? 'Start Game' : 'Play Again'}
		</button>
	{/if}

	{#if gameActive}
		<div class="game-area">
			<button
				class="fish"
				onclick={catchFish}
				style="left: {fishPosition.x}%; top: {fishPosition.y}%; width: {fishSize}px; height: {fishSize}px;"
				aria-label="Catch the fish"
			>
				🐟
			</button>
		</div>
	{/if}

	<div class="game-info">
		<p>🎮 Psst... You found the secret page! How did you get here?</p>
		<p>💡 Tip: Try the Konami Code (↑↑↓↓←→←→BA) on any page!</p>
	</div>
</section>

<style>
	.game-container {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		min-height: 60vh;
	}

	.game-header {
		text-align: center;
	}

	.game-header h1 {
		font-size: 2rem;
		margin-bottom: 0.5rem;
		animation: bounce 2s ease-in-out infinite;
	}

	@keyframes bounce {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
	}

	.subtitle {
		font-style: italic;
		opacity: 0.8;
		margin-bottom: 1rem;
	}

	.secret-image-container {
		margin-top: 1.5rem;
		padding: 1rem;
		background-color: rgba(0, 49, 211, 0.05);
		border-radius: 12px;
		border: var(--w-border-attention);
	}

	.secret-image {
		max-width: 100%;
		height: auto;
		border-radius: 8px;
		border: var(--w-border-general);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease;
	}

	.secret-image:hover {
		transform: scale(1.02);
	}

	.image-caption {
		margin-top: 0.8rem;
		font-size: 0.95rem;
		font-style: italic;
		color: var(--w-color-accent-A);
		opacity: 0.9;
	}

	.game-stats {
		display: flex;
		justify-content: space-around;
		padding: 1rem;
		background-color: rgba(0, 49, 211, 0.1);
		border-radius: 8px;
		border: var(--w-border-general);
	}

	.stat {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.3rem;
	}

	.stat-label {
		font-size: 0.9rem;
		opacity: 0.7;
	}

	.stat-value {
		font-size: 1.5rem;
		font-weight: bold;
		color: var(--w-color-accent-A);
	}

	.game-message {
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		padding: 1rem;
		background-color: rgba(255, 215, 0, 0.2);
		border-radius: 8px;
		border: var(--w-border-attention);
		min-height: 3rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.start-button {
		padding: 1rem 2rem;
		font-size: 1.3rem;
		font-weight: bold;
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.3s ease;
		align-self: center;
	}

	.start-button:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 12px rgba(0, 49, 211, 0.3);
	}

	.start-button:active {
		transform: scale(0.95);
	}

	.game-area {
		position: relative;
		width: 100%;
		height: 400px;
		background: linear-gradient(180deg, #87ceeb 0%, #1e90ff 100%);
		border-radius: 12px;
		border: var(--w-border-general);
		overflow: hidden;
	}

	.fish {
		position: absolute;
		font-size: 2rem;
		background: transparent;
		border: none;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
		filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.2));
		transform: rotate(0deg);
		animation: swim 2s ease-in-out infinite;
	}

	@keyframes swim {
		0%,
		100% {
			transform: rotate(-5deg);
		}
		50% {
			transform: rotate(5deg);
		}
	}

	.fish:hover {
		transform: scale(1.2) rotate(10deg);
	}

	.fish:active {
		transform: scale(0.8);
	}

	.game-info {
		text-align: center;
		padding: 1rem;
		background-color: rgba(0, 49, 211, 0.05);
		border-radius: 8px;
		font-size: 0.9rem;
		opacity: 0.8;
	}

	.game-info p {
		margin: 0.5rem 0;
	}
</style>
