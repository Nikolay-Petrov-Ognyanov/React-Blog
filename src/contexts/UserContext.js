import { createContext, useContext } from "react";

import { useLocalStorage } from "../hooks/useLocalStorage";

export const UserContext = createContext()

export const UserProvider = ({
    children,
}) => {
    const [user, setUser] = useLocalStorage("user", null)

    const loginHandler = (userData) => {
        setUser(userData)
    }

    const logoutHandler = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                loginHandler,
                logoutHandler
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)

    return context
}