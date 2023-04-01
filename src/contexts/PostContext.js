import { useEffect, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";

import * as postService from "../services/postService"

export const PostContext = createContext()

export const PostProvider = ({ children }) => {
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])

    useEffect(() => {
        postService.getAllPosts()
            .then(result => !result.code && setPosts(Object.values(result)))
            .catch(error => console.log(error))
    }, [])

    const createPostHandler = (postData) => {
        setPosts(state => [...state, postData])

        navigate(`${postData._id}`)
    }

    const editPostHandler = (postId, postData) => {
        setPosts(state => state.map(post => post._id === postId ? postData : post))

        navigate(`${postData._id}`)
    }

    const deletePostHandler = (postId) => {
        setPosts(state => state.filter(post => post._id !== postId))

        navigate("/")
    }

    return (
        <PostContext.Provider
            value={{
                posts,
                createPostHandler,
                editPostHandler,
                deletePostHandler
            }}
        >
            {children}
        </PostContext.Provider>
    )
}