import { useContext, useEffect, useState } from "react"
import { PostContext } from "../../contexts/PostContext"
import { ViewContext } from "../../contexts/ViewContext"
import { Card } from "../Card/Card"
import * as postService from "../../services/postService"
import style from "./Home.module.css"

export const Home = () => {
	const [postsFromServer, setPostsFromServer] = useState([])

	const { selectView, selectUserId } = useContext(ViewContext)

	useEffect(() => {
		selectView("home")
		selectUserId(null)

		localStorage.setItem("view", "home")
		localStorage.setItem("userId", null)

		postService.getAllPosts().then(result => {
			!result.type && setPostsFromServer(Object.values(result))
		}).catch(error => console.log(error))
	}, [])

	return (
		<section className={style["home"]}>
			{typeof postsFromServer[0] !== "number" && postsFromServer.length > 0 &&
				postsFromServer.map(p => <Card key={p._id} post={p} />)
			}

			{typeof postsFromServer[0] === "number" && <h1>No posts yet</h1> ||
				postsFromServer.length === 0 && <h1>No posts yet</h1>
			}
		</section>
	)
}