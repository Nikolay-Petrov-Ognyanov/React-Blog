import { useState, useEffect, createContext } from "react";

import * as viewService from "../services/viewService"

export const ViewContext = createContext()

export const ViewProvider = ({ children }) => {
    const [selectedView, setSelectedView] = useState("")
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        viewService.getViewInfo().then(result => {
            setSelectedView(result[result.length - 1].view)
            setSelectedUserId(result[result.length - 1]._id)
        }).catch(error => console.log(error))
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