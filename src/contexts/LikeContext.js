import { useEffect, useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as likeService from "../services/likeService"

export const LikeContext = createContext()

export const LikeProvider = ({ children }) => {
    const [likes, setLikes] = useState([])

    useEffect(() => {
        likeService.getAllLikes().then(result => {
            result && !result.code && setLikes(Object.values(result))
        }).catch(error => console.log(error))
    }, [])

    const createLikeHandler = (entry) => {
        setLikes(state => [...state, entry])
    }

    const updateLikeHandler = (entryId, updatedEntry) => {
        setLikes(state => state.map(entry => entry._id === entryId ? updatedEntry : entry))
    }

    return (
        <LikeContext.Provider
            value={{
                likes,
                createLikeHandler,
                updateLikeHandler
            }}
        >
            {children}
        </LikeContext.Provider>
    )
}