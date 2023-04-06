import { useContext } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

export const UserGuard = () => {
    const location = useLocation()

    const { isUser } = useContext(UserContext)

    if (!isUser) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    return <Outlet />
}