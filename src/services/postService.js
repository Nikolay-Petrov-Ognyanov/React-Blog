import {request} from "./requester"

const jsonstore = "http://localhost:3030/jsonstore/posts"

export const loadInitialPosts = () => request(jsonstore)
