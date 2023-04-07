import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { ViewContext } from "../../contexts/ViewContext"
import { Card } from "../Card/Card"
import style from "./Search.module.css"

export const Search = () => {
    const { users } = useContext(UserContext)
    const { posts } = useContext(PostContext)

    const {
        selectView,
        selectUserId,
        searchInput,
        searchResult,
        selectSearchInput,
        selectSearchResult
    } = useContext(ViewContext)

    // const [searchInput, setSearchInput] = useState({ search: "" })
    // const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
        selectView("search")
        selectUserId(null)

        localStorage.setItem("view", "search")
        localStorage.setItem("userId", null)

        // setSearchInput({ "search": localStorage.getItem("searchValue") })
        // setSearchResult(JSON.parse(localStorage.getItem("searchResult")) || []) 
    }, [])

    const handleInputChange = (event) => {
        const { name, value } = event.target

        selectSearchInput({ [name]: value })

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

        selectSearchResult(match)

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
                value={searchInput.search}
                onChange={handleInputChange}
            />

            <div className={style["search-result"]}>
                {searchResult.map(p => <Card key={p._id} post={p} />)}
            </div>
        </section>
    )
}