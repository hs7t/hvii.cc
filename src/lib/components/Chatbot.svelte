<script lang="ts">
	import { onMount } from 'svelte';

	let { isOpen, onClose } = $props();

	let messages = $state<Array<{ role: 'user' | 'assistant'; content: string }>>([
		{
			role: 'assistant',
			content: "Hi! I'm here to help answer questions about this website. How can I assist you?"
		}
	]);
	let input = $state('');
	let loading = $state(false);
	let messagesContainer: HTMLDivElement;

	function scrollToBottom() {
		if (messagesContainer) {
			setTimeout(() => {
				messagesContainer.scrollTop = messagesContainer.scrollHeight;
			}, 0);
		}
	}

	async function sendMessage() {
		if (!input.trim() || loading) return;

		const userMessage = input.trim();
		input = '';
		loading = true;

		// Add user message
		messages = [...messages, { role: 'user', content: userMessage }];
		scrollToBottom();

		try {
			// Simple mock AI response - in production, this would call an actual AI API
			await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 1000));

			let response = '';
			const lowerMessage = userMessage.toLowerCase();

			if (lowerMessage.includes('poetry') || lowerMessage.includes('writing')) {
				response =
					'This website features poetry and writing! You can check out the writing section from the navigation menu to read various poems.';
			} else if (lowerMessage.includes('picture') || lowerMessage.includes('photo')) {
				response =
					'The pictures section showcases a collection of images. You can browse them through the navigation menu.';
			} else if (lowerMessage.includes('project')) {
				response =
					"The projects section displays various projects. Check it out from the navigation menu to see what's been built!";
			} else if (lowerMessage.includes('secret') || lowerMessage.includes('easter egg')) {
				response = 'There might be a secret page... Try the Konami code! (↑ ↑ ↓ ↓ ← → ← → B A)';
			} else if (lowerMessage.includes('who') || lowerMessage.includes('owner')) {
				response =
					'This is a personal website built with SvelteKit! You can learn more by exploring the different sections.';
			} else if (
				lowerMessage.includes('how') ||
				lowerMessage.includes('built') ||
				lowerMessage.includes('tech')
			) {
				response =
					'This website is built using SvelteKit with TypeScript, MDsveX for markdown content, and uses Masonry for image layouts. Pretty cool, right?';
			} else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
				response = 'Hello! 👋 Feel free to ask me anything about this website!';
			} else if (lowerMessage.includes('help')) {
				response =
					'I can help you learn about the different sections of this website: poetry/writing, pictures, and projects. Just ask me about any of them!';
			} else {
				response =
					"That's an interesting question! This website has sections for poetry, pictures, and projects. Feel free to explore them through the navigation menu, or ask me about any specific section!";
			}

			messages = [...messages, { role: 'assistant', content: response }];
			scrollToBottom();
		} catch (error) {
			messages = [
				...messages,
				{
					role: 'assistant',
					content: 'Sorry, I encountered an error. Please try again!'
				}
			];
		} finally {
			loading = false;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			sendMessage();
		}
	}

	onMount(() => {
		scrollToBottom();
	});

	$effect(() => {
		if (isOpen) {
			scrollToBottom();
		}
	});
</script>

{#if isOpen}
	<div id="chatbot-container">
		<div id="chatbot-header">
			<h2>Chat Assistant</h2>
			<button id="close-button" onclick={onClose} aria-label="Close chat">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>
		<div id="messages-container" bind:this={messagesContainer}>
			{#each messages as message}
				<div class="message {message.role}">
					<div class="message-content">
						{message.content}
					</div>
				</div>
			{/each}
			{#if loading}
				<div class="message assistant">
					<div class="message-content loading">
						<span class="dot"></span>
						<span class="dot"></span>
						<span class="dot"></span>
					</div>
				</div>
			{/if}
		</div>
		<div id="input-container">
			<input
				type="text"
				bind:value={input}
				onkeydown={handleKeydown}
				placeholder="Ask me anything..."
				disabled={loading}
			/>
			<button onclick={sendMessage} disabled={loading || !input.trim()} aria-label="Send message">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<line x1="22" y1="2" x2="11" y2="13"></line>
					<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
				</svg>
			</button>
		</div>
	</div>
{/if}

<style>
	#chatbot-container {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		width: min(400px, calc(100vw - 4rem));
		height: min(600px, calc(100vh - 4rem));
		background-color: var(--w-color-background-A);
		border: var(--w-border-general);
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		box-shadow: 0 8px 24px color-mix(in srgb, var(--w-color-accent-A) 20%, transparent);
		z-index: 1001;
	}

	#chatbot-header {
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
		padding: 1rem;
		border-radius: 8px 8px 0 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#chatbot-header h2 {
		font-size: 1.2rem;
		margin: 0;
		color: var(--w-color-accent-A-contrast);
	}

	#close-button {
		background: none;
		border: none;
		color: var(--w-color-accent-A-contrast);
		cursor: pointer;
		padding: 0.25rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s;
	}

	#close-button:hover {
		opacity: 0.8;
	}

	#messages-container {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		scrollbar-width: thin;
		scrollbar-color: var(--w-color-accent-A) transparent;
	}

	#messages-container::-webkit-scrollbar {
		width: 8px;
	}

	#messages-container::-webkit-scrollbar-track {
		background: transparent;
	}

	#messages-container::-webkit-scrollbar-thumb {
		background-color: var(--w-color-accent-A);
		border-radius: 4px;
	}

	.message {
		display: flex;
		margin-bottom: 0.5rem;
	}

	.message.user {
		justify-content: flex-end;
	}

	.message.assistant {
		justify-content: flex-start;
	}

	.message-content {
		max-width: 80%;
		padding: 0.75rem 1rem;
		border-radius: 12px;
		line-height: 1.5;
		word-wrap: break-word;
	}

	.message.user .message-content {
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
		border-bottom-right-radius: 4px;
	}

	.message.assistant .message-content {
		background-color: var(--w-color-background-B);
		color: var(--w-color-content-A);
		border-bottom-left-radius: 4px;
	}

	.message-content.loading {
		display: flex;
		gap: 0.25rem;
		padding: 1rem;
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--w-color-accent-A);
		animation: bounce 1.4s infinite ease-in-out both;
	}

	.dot:nth-child(1) {
		animation-delay: -0.32s;
	}

	.dot:nth-child(2) {
		animation-delay: -0.16s;
	}

	@keyframes bounce {
		0%,
		80%,
		100% {
			transform: scale(0);
		}
		40% {
			transform: scale(1);
		}
	}

	#input-container {
		padding: 1rem;
		border-top: var(--w-border-general);
		display: flex;
		gap: 0.5rem;
	}

	#input-container input {
		flex: 1;
		padding: 0.75rem;
		border: var(--w-border-general);
		border-radius: 8px;
		font-family: var(--w-font-family-primary);
		font-size: var(--w-font-size-B);
		outline: none;
	}

	#input-container input:focus {
		border-color: var(--w-color-accent-A);
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--w-color-accent-A) 10%, transparent);
	}

	#input-container input:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	#input-container button {
		padding: 0.75rem;
		background-color: var(--w-color-accent-A);
		color: var(--w-color-accent-A-contrast);
		border: none;
		border-radius: 8px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: opacity 0.2s;
	}

	#input-container button:hover:not(:disabled) {
		opacity: 0.9;
	}

	#input-container button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
