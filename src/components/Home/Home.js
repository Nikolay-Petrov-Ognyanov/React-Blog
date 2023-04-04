import { useContext, useEffect } from "react"

import style from "./Home.module.css"

import { PostContext } from "../../contexts/PostContext"
import { Card } from "../Card/Card"
import { ViewContext } from "../../contexts/ViewContext"

export const Home = () => {
	const { posts } = useContext(PostContext)
	const { selectView, selectUserId } = useContext(ViewContext)

	useEffect(() => {
		selectView("home")
		selectUserId(null)

		localStorage.setItem("view", "home")
		localStorage.setItem("userId", null)
	}, [])

	return (
		<section className={style["home"]}>
			{typeof posts[0] !== "number" && posts.length > 0 &&
				posts.map(p => <Card key={p._id} post={p} />)
			}

			{typeof posts[0] === "number" && <h1>No posts yet</h1> ||
				posts.length === 0 && <h1>No posts yet</h1>
			}
		</section>
	)
}