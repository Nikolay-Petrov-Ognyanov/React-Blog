import * as request from "./requester"

const jsonstore = "http://localhost:3030/jsonstore/posts"

export const loadInitialPosts = () => request.get(jsonstore)