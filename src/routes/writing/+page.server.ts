import { fetchPoetryPosts } from '$lib/utils';

export const load = async () => {
	return {
		posts: await fetchPoetryPosts()
	};
};
