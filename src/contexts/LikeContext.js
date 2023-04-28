import { useEffect, useState, createContext, useContext } from "react";
import * as likeService from "../services/likeService"

export const LikeContext = createContext()

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        likeService.getAllLikes().then(result => {
            result && !result.code && setLikes(Object.values(result))
        }).catch(error => console.error(error))
    }, [])

    const createReactionHandler = (entry) => {
        setLikes(state => [...state, entry])
    }

    const updateReactionHandler = (entryId, updatedEntry) => {
        setLikes(state => state.map(entry => entry._id === entryId ? updatedEntry : entry))
    }

    return (
        <LikeContext.Provider
            value={{
                likes,
                createReactionHandler,
                updateReactionHandler
            }}
        >
            {children}
        </LikeContext.Provider>
    )
}