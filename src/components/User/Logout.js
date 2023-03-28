import { useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"

import { UserContext } from "../../contexts/UserContext"
import { logout } from "../../services/userService"


export const Logout = () => {
    const navigate = useNavigate()
    const { user, logoutHandler } = useContext(UserContext)

    useEffect(() => {
        logout(user.accessToken)
            .then(() => {
                logoutHandler()
                navigate("/")
            })
            .catch((error) => {
                console.log(error)
                navigate("/")
            })
    })

    return null
}