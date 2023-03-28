import * as request from "./requester"

const jsonstore = "http://localhost:3030/jsonstore/posts"
const baseUrl = "http://localhost:3030/data/posts"

export const loadInitialPosts = () => request.get(jsonstore)

export const getAllPosts = () => request.get(baseUrl)

export const create = (postData) => request.post(baseUrl, postData)