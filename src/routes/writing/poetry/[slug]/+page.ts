export const entries = async () => {
	return [
		{ slug: 'anecdote' },
		{ slug: 'children' },
		{ slug: 'no' },
		{ slug: 'now' },
		{ slug: 'spark' },
		{ slug: 'wither' }
	];
};

export async function load({ params }) {
	const post = await import(`../${params.slug}.md`);
	const { title, date } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date
	};
}
