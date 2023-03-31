import { useContext } from "react"

import style from "./Home.module.css"

import { PostContext } from "../../contexts/PostContext"
import { Card } from "../Card/Card"

export const Home = () => {
	const { posts } = useContext(PostContext)

	return (
		<section className={style["home"]}>
			{posts.length > 0 && posts.map(post => <Card key={post._id} post={post} />)}

			{posts.length === 0 && <h1>No posts yet</h1>}
		</section>
	)
}