import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
    plugins: [sveltekit({
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],
	adapter: adapter(),
    extensions: ['.svelte', '.svx', '.md'],
	alias: { '$lib': 'src/lib' }
    })]
});
