import { useState, useEffect, createContext } from "react";

export const ViewContext = createContext()

export const ViewProvider = ({ children }) => {
    const [selectedView, setSelectedView] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [postsSearchInput, setPostsSearchInput] = useState({ posts: "" })
    const [postsSearchResult, setPostsSearchResult] = useState([])

    useEffect(() => {
        setSelectedView(localStorage.getItem("view") || "")
        setSelectedUserId(localStorage.getItem("userId") || null)
    }, [])

    const selectView = (currentView) => {
        setSelectedView(currentView)
    }

    const selectUserId = (userId) => {
        setSelectedUserId(userId)
    }

    const selectPostsSearchInput = (input) => {
        setPostsSearchInput(input)
    }

    const selectPostsSearchResult = (result) => {
        setPostsSearchResult(result)
    }

    return (
        <ViewContext.Provider
            value={{
                selectView,
                selectedView,
                selectUserId,
                selectedUserId,
                selectPostsSearchInput,
                postsSearchInput,
                selectPostsSearchResult,
                postsSearchResult,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}