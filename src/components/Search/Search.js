import { useContext, useState } from "react"

import style from "./Search.module.css"

import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"

import { Card } from "../Card/Card"

export const Search = () => {
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)

    const [input, setInput] = useState({ search: "" })
    const [result, setResult] = useState([])

    const handleInputChange = (event) => {
        const { name, value } = event.target

        setInput({ [name]: value })

        const data = value.split(" ")
        const match = []

        data.map(s =>
                posts.filter(p =>
                    p.title.includes(!!s && s) === true &&
                    match.includes(p.title) === false &&
                    match.push(p)) &&
                users.filter(u =>
                    u.email.includes(!!s && s)).map(s =>
                        s.userId).map(uid =>
                            posts.filter(p =>
                                p._ownerId === uid)).flat().map(p =>
                                    match.includes(p) === false &&
                                    match.push(p)))

        setResult(match)
    }

    return (
        <section className={style["search"]}>
            <h1>Find posts</h1>

            <input
                className={style["search-input"]}
                type="text"
                name="search"
                id="search"
                value={input.search}
                onChange={handleInputChange}
            />

            <div className={style["search-result"]}>
                {result.map(p => <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}