import { useState, useEffect, createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import * as userService from "../services/userService"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useLocalStorage("user", null)
    const [users, setUsers] = useState([])

    useEffect(() => {
        userService.getAllUsers().then(response => {
            setUsers(Object.values(response))
        }).catch(error => console.log(error))
    }, [])

    const loginHandler = (userData) => {
        setUser(userData)

        if (!users.find(entry => entry.userId === userData._id)) {
            userService.createUser(userData)

            setUsers(state => [...state, userData])
        }
    }

    const logoutHandler = () => {
        setUser(null)
    }

    return (
        <UserContext.Provider
            value={{
                user,
                users,
                loginHandler,
                logoutHandler,
                isUser: user && !!user.accessToken
            }}
        >
            {children}
        </UserContext.Provider>
    )
}