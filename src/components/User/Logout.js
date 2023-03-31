import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import * as userService from "../../services/userService"

import { UserContext } from "../../contexts/UserContext"


export const Logout = () => {
    const navigate = useNavigate()
    const { user, logoutHandler } = useContext(UserContext)

    useEffect(() => {
        userService.logout(user.accessToken)
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