const fetchMarkdownPosts = async (allPostFiles: Record<string, any>) => {
	const iterablePostFiles = Object.entries(allPostFiles);

	const allPosts = await Promise.all(
		iterablePostFiles.map(async ([path, resolver]) => {
			const resolved = (await resolver()) as any;
			const { metadata } = resolved; // im sorry ts youre annoying sometimes
			const postPath = path.replace('.md', '').replace('/src/routes', '');

			return {
				meta: metadata,
				path: postPath
			};
		})
	);

	return allPosts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
};

export const fetchPoetryPosts = async () => {
	return fetchMarkdownPosts(import.meta.glob('/src/routes/writing/poetry/*.md'));
};

/* export const fetchSortedMarkdownPosts = async () => {
	const allPosts = await fetchMarkdownPosts();
	const sortedPosts = allPosts.sort((a, b) => {
		return new Date(b.meta.date) - new Date(a.meta.date);
	});

	return sortedPosts;
};
 */
