import { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { ViewContext } from "../../contexts/ViewContext"
import { Card } from "../Card/Card"
import * as postService from "../../services/postService"
import style from "./Posts.module.css"

export const Posts = () => {
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)

    const {
        selectView,
        selectUserId,
        postsSearchInput,
        postsSearchResult,
        selectPostsSearchInput,
        selectPostsSearchResult
    } = useContext(ViewContext)

    useEffect(() => {
        postService.getAllPosts().then(
            result => selectPostsSearchResult(result)
        ).catch(error => console.log(error))

        localStorage.setItem("view", "posts")
        localStorage.setItem("userId", null)

        selectView("posts")
        selectUserId(null)
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target

        selectPostsSearchInput({ [name]: value })

        const data = value.trim().split(" ")
        const match = []

        if (data[0] !== "") {
            data.map(s =>
                posts && posts.filter(p =>
                    p.title.includes(s && s) === true &&
                    match.includes(p) === false &&
                    match.push(p)) &&
                users && users.filter(u =>
                    u.email.includes(s && s)).map(u =>
                        u.userId).map(uid =>
                            posts.filter(p =>
                                p._ownerId === uid)).flat().map(p =>
                                    match.includes(p) === false &&
                                    match.push(p)))

            selectPostsSearchResult(match)
        } else {
            selectPostsSearchResult(posts)
        }
    }

    return (
        <section className={style["posts"]}>
            <h1>Find posts</h1>

            <input
                className={style["posts-search-input"]}
                type="text"
                name="posts"
                id="posts"
                value={postsSearchInput.posts}
                onChange={handleInputChange}
            />

            <div className={style["posts-result"]}>
                {postsSearchResult.map(p => <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}