const jsonstore = "http://localhost:3030/jsonstore/posts"

export const loadInitialPosts = () => {
	return fetch(jsonstore)
		.then(response => response.json())
}