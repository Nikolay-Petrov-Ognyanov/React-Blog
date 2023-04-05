import { useContext, useEffect, useState } from "react"
import { Card } from "../Card/Card"
import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { ViewContext } from "../../contexts/ViewContext"
import style from "./Search.module.css"

export const Search = () => {
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)
    const { selectView, selectUserId } = useContext(ViewContext)

    const [input, setInput] = useState({ search: "" })
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        selectView("search")
        selectUserId(null)

        localStorage.setItem("view", "search")
        localStorage.setItem("userId", null)

        setInput({ "search": localStorage.getItem("searchValue") })
        setSearchResult(JSON.parse(localStorage.getItem("searchResult")) || []) 
    }, [])

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
                u.email.includes(!!s && s)).map(u =>
                    u.userId).map(uid =>
                        posts.filter(p =>
                            p._ownerId === uid)).flat().map(p =>
                                match.includes(p) === false &&
                                match.push(p)))

        setSearchResult(match)

        localStorage.setItem("searchValue", value)
        localStorage.setItem("searchResult", JSON.stringify(match))
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
                {searchResult.map(p => <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}