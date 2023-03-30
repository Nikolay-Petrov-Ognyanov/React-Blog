import * as request from "./requester"

const jsonstore = "http://localhost:3030/jsonstore/posts"
const dataposts = "http://localhost:3030/data/posts"

export const loadInitialPosts = () => request.get(jsonstore)

export const getAllPosts = () => request.get(dataposts)

export const getOnePost = (postId) => request.get(`${dataposts}/${postId}`)

export const createPost = (postData) => request.post(dataposts, postData)

export const editPost = (postId, postData) => request.put(`${dataposts}/${postId}`, postData)
