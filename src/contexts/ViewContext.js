import { useState, useEffect, createContext } from "react";

export const ViewContext = createContext()

export const ViewProvider = ({ children }) => {
    const [selectedView, setSelectedView] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [searchInput, setSearchInput] = useState({ search: "" })
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        setSelectedView(localStorage.getItem("view") || "")
        setSelectedUserId(localStorage.getItem("userId") || null)
        setSearchInput({ "search": localStorage.getItem("searchValue") || "" })
        setSearchResult(JSON.parse(localStorage.getItem("searchResult")) || [])
    }, [])

    const selectView = (currentView) => {
        setSelectedView(currentView)
    }

    const selectUserId = (userId) => {
        setSelectedUserId(userId)
    }

    const selectSearchInput = (input) => {
        setSearchInput(input)
    }

    const selectSearchResult = (result) => {
        setSearchResult(result)
    }

    return (
        <ViewContext.Provider
            value={{
                selectView,
                selectedView,
                selectUserId,
                selectedUserId,
                selectSearchInput,
                searchInput,
                selectSearchResult,
                searchResult,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}