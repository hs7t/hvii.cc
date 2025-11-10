import { fetchPicturePosts } from '$lib/utils';

export const load = async () => {
    return {
        posts: await fetchPicturePosts()
    };
};
