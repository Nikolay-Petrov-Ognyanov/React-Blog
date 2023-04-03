import { useContext, useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"

import { PostContext } from "../../contexts/PostContext"
import { LikeContext } from "../../contexts/LikeContext"

import style from "./Profile.module.css"

import { Card } from "../Card/Card"
import { UserContext } from "../../contexts/UserContext"

export const Profile = () => {
    const { userId } = useParams()
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)
    const { likes } = useContext(LikeContext)

    const selectedUser = users.find(u => u.userId === userId)
    const userPosts = posts.filter(p => p._ownerId === userId)
    const userLikes = likes.filter(l => l._ownerId === userId && l.like === true)
        .map(l => posts.find(p => p._id === l.postId))
    
    const location = useLocation()
    
    console.log(location.pathname)

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
                            {userPosts.map(post => post && <Card key={post._id} post={post} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length === 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div>
                        <h2>Likes</h2>

                        <div className={style["likes-container"]}>
                            {userLikes.map(post => post && <Card key={post._id} post={post} />)}
                        </div>
                    </div>
                </div>
            }

            {userPosts.length > 0 && userLikes.length > 0 &&
                <div className={style["profile-wrapper"]}>
                    <div className={style["posts-wrapper"]}>
                        <h2>Posts</h2>

                        <div className={style["posts-container"]}>
                            {userPosts.map(post => post && <Card key={post._id} post={post} />)}
                        </div>
                    </div>

                    <div className={style["likes-wrapper"]}>
                        <h2>Likes</h2>

                        <div className={style["likes-container"]}>
                            {userLikes.map(post => post && <Card key={post._id} post={post} />)}
                        </div>
                    </div>
                </div>
            }
        </section>
    )
}