import { useState, useEffect, createContext } from "react";

export const ViewContext = createContext()

export const ViewProvider = ({ children }) => {
    const [selectedView, setSelectedView] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null)

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

    return (
        <ViewContext.Provider
            value={{
                selectView,
                selectedView,
                selectUserId,
                selectedUserId,
            }}
        >
            {children}
        </ViewContext.Provider>
    )
}