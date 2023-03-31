import { useEffect} from "react"
import { useNavigate } from "react-router-dom"

import { useUserContext } from "../../contexts/UserContext"
import * as userService from "../../services/userService"


export const Logout = () => {
    const navigate = useNavigate()
    const { user, logoutHandler } = useUserContext()

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