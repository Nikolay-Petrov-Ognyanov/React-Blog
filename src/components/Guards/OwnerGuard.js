import { useContext } from "react"
import { useParams, Navigate, Outlet } from "react-router-dom"
import { PostContext } from "../../contexts/PostContext"
import { UserContext } from "../../contexts/UserContext"

export const OwnerGuard = () => {
    const { postId } = useParams()

    const { user } = useContext(UserContext)
    const { selectPost } = useContext(PostContext)

    const post = selectPost(postId)

    if (!user || post && post._ownerId !== user._id) {
        return <Navigate to={`/${postId}`} replace />
    }

    return <Outlet />
}