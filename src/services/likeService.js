import * as request from "./requester"

const datalikes = "http://localhost:3030/data/likes"

export const getAllLikes = () => request.get(datalikes)

export const createLikeEntry = (postId, like) => request.post(`${datalikes}`, { postId, like })

export const updateLikeEntry = (entryId, postId, like) => request.put(`${datalikes}/${entryId}`, { postId, like })