import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import style from "./Profile.module.css"

import { PostContext } from "../../contexts/PostContext"
import { LikeContext } from "../../contexts/LikeContext"

import { Card } from "../Card/Card"
import { UserContext } from "../../contexts/UserContext"
import { ViewContext } from "../../contexts/ViewContext"

export const Profile = () => {
    const { userId } = useParams()
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)
    const { likes } = useContext(LikeContext)
    const { selectView, selectUserId } = useContext(ViewContext)

    useEffect(() => {
        selectView("profile")
        selectUserId(userId)

        localStorage.setItem("view", "profile")
        localStorage.setItem("userId", userId)
    }, [])

    const selectedUser = users.find(u => u.userId === userId)
    const userPosts = posts.length > 0 && posts.filter(p => p._ownerId === userId) || []
    const userLikes = likes.length > 0 && likes.filter(l => l._ownerId === userId && l.like === true)
        .map(l => posts.find(p => p._id === l.postId)) || []
    
    return (
        <section className={style["profile"]}>
            <h1>{selectedUser?.email}</h1>

            {userPosts.length === 0 && userLikes.length === 0 &&
                <h2>No activity yet</h2>
            }

            {userPosts.length > 0 && userLikes.length === 0 &&
                <div className={style["profile-wrapper"]}>
                    <div>
                        <h2>Posts</h2>

                        <div className={style["posts-container"]}>
                            {userPosts.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length === 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div>
                        <h2>Likes</h2>

                        <div className={style["likes-container"]}>
                            {userLikes.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length > 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div className={style["posts-wrapper"]}>
                        <h2>Posts</h2>

                        <div className={style["posts-container"]}>
                            {userPosts.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>

                    <div className={style["likes-wrapper"]}>
                        <h2>Likes</h2>

                        <div className={style["likes-container"]}>
                            {userLikes.map(p => p && <Card key={p._id} post={p} />)}
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}