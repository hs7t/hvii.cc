<script lang="ts">
	let { isOpen, onClose } = $props();

	const GEMINI_API_KEY = 'AIzaSyCKtABCvdtkU10JYPrEv-79VCWLwlu4lvs';
	const GEMINI_API_URL =
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
			// Call the Gemini API directly
			const systemPrompt = `You are a helpful assistant for a personal website (hvii.cc). The website has the following sections:
- Poetry/Writing: Features various poems and writing pieces
- Pictures: A gallery of images
- Projects: Showcases various projects
- A secret page accessible via the Konami code (↑ ↑ ↓ ↓ ← → ← → B A)

The site is built with SvelteKit, TypeScript, MDsveX for markdown content, and Masonry for image layouts.

Keep responses concise, friendly, and helpful. Guide visitors to explore the different sections of the website.`;

			const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					contents: [
						{
							parts: [
								{
									text: systemPrompt
								}
							]
						},
						{
							parts: [
								{
									text: userMessage
								}
							]
						}
					],
					generationConfig: {
						temperature: 0.7,
						maxOutputTokens: 256
					}
				})
			});

			if (!response.ok) {
				throw new Error('Failed to get response from AI');
			}

			const data = await response.json();
			const aiResponse =
				data.candidates?.[0]?.content?.parts?.[0]?.text ||
				'Sorry, I could not generate a response.';

			messages = [...messages, { role: 'assistant', content: aiResponse }];
			scrollToBottom();
		} catch (error) {
			console.error('Chat error:', error);
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
