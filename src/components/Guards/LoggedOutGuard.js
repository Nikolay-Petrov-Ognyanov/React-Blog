import { useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

export const LoggedOutGuard = () => {
    const navigate = useNavigate()
    const { isUser } = useContext(UserContext)

    if (!isUser) {
        return <Outlet />
    }

    return navigate(-1)
}