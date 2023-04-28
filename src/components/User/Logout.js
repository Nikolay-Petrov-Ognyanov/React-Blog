import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import * as userService from "../../services/userService"


export const Logout = () => {
    const navigate = useNavigate()
    const { user, logoutHandler } = useContext(UserContext)

    useEffect(() => {
        userService.logout(user.accessToken).then(() => {
            logoutHandler()
            navigate("/")
        }).catch((error) => {
            console.error(error)
            navigate("/")
        })
    })

    return null
}