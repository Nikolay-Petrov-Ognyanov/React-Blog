import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { LikeContext } from "../../contexts/LikeContext"
import { ViewContext } from "../../contexts/ViewContext"
import { Card } from "../Card/Card"
import style from "./Profile.module.css"

export const Profile = () => {
    const navigate = useNavigate()

    const { userId } = useParams()

    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)
    const { likes } = useContext(LikeContext)

    const {
        selectView,
        selectUserId,
    } = useContext(ViewContext)

    const [profileView, setProfileView] = useState("Posts")

    const selectedUser = users.find(u => u.userId === userId)
    const userPosts = posts.length > 0 && posts.filter(p => p._ownerId === userId) || []

    const userLikes = likes.length > 0 && likes.filter(
        l => l._ownerId === userId && l.like === true
    ).map(l => posts.find(p => p._id === l.postId)) || []

    useEffect(() => {
        if (users.length > 0) {
            if (!!users.find(u => u.userId === userId) === false) {
                navigate("/")
            } else {
                selectUserId(userId)
                selectView("profile")

                localStorage.setItem("userId", userId)
                localStorage.setItem("view", "profile")

                if (userPosts.length > 0 && userLikes.length === 0) {
                    setProfileView("Posts")
                }

                if (userPosts.length === 0 && userLikes.length > 0) {
                    setProfileView("Likes")
                }
            }
        }
    }, [users])

    const toggleView = (view) => {
        setProfileView(view)
    }

    return (
        <section className={style["profile"]}>
            <h1>{selectedUser?.email}</h1>

            {userPosts.length === 0 && userLikes.length === 0 &&
                <h2 className={style["no-activity-yet"]} >No activity yet</h2>
            }

            {userPosts.length > 0 && userLikes.length === 0 &&
                <div className={style["profile-wrapper"]}>
                    <div className={style["button-title-container"]}>
                        <button onClick={() => toggleView("Posts")}
                            disabled={profileView === "Posts"}

                            className={profileView === "Posts" &&
                                style["button-title-selected"] ||
                                style["button-title"]
                            }
                        >Posts</button>
                    </div>

                    <div className={style["wrapper"]}>
                        <div className={profileView === "Posts" &&
                            style["container-show"] ||
                            style["container-hide"]
                        }>
                            {userPosts.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length === 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div className={style["button-title-container"]}>
                        <button onClick={() => toggleView("Likes")}
                            disabled={profileView === "Likes"}

                            className={profileView === "Likes" &&
                                style["button-title-selected"] ||
                                style["button-title"]
                            }
                        >Likes</button>
                    </div>

                    <div className={style["wrapper"]}>
                        <div className={profileView === "Likes" &&
                            style["container-show"] ||
                            style["container-hide"]
                        }>
                            {userLikes.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length > 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div className={style["button-title-container"]}>
                        <button onClick={() => toggleView("Posts")}
                            disabled={profileView === "Posts"}

                            className={profileView === "Posts" &&
                                style["button-title-selected"] ||
                                style["button-title"]
                            }
                        >Posts</button>

                        <button onClick={() => toggleView("Likes")}
                            disabled={profileView === "Likes"}

                            className={profileView === "Likes" &&
                                style["button-title-selected"] ||
                                style["button-title"]
                            }
                        >Likes</button>
                    </div>

                    <div className={style["wrapper"]}>

                        <div className={profileView === "Posts" &&
                            style["container-show"] ||
                            style["container-hide"]
                        }>
                            {userPosts.map(p => p && <Card key={p._id} post={p} />)}
                        </div>

                        <div className={profileView === "Likes" &&
                            style["container-show"] ||
                            style["container-hide"]
                        }>
                            {userLikes.map(p => p && <Card key={p._id} post={p} />)}
                        </div>

                    </div>
                </div>
            }
        </section>
    )
}