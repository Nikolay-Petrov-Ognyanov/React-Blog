import { useContext } from "react"
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

export const LoggedInGuard = () => {
    const location = useLocation()

    const { isUser } = useContext(UserContext)

    if (!isUser) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}