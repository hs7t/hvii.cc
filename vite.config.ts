import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		sveltekit({
			preprocess: [
				vitePreprocess(),
				mdsvex({
					extensions: ['.md']
				})
			],
			adapter: adapter(),
			alias: { $lib: 'src/lib' },
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
