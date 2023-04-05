import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"

export const UserGuard = () => {
    const { isUser } = useContext(UserContext)

    if (!isUser) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}