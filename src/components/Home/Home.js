import { useContext, useEffect } from "react"

import style from "./Home.module.css"

import * as viewService from "../../services/viewService"

import { PostContext } from "../../contexts/PostContext"
import { Card } from "../Card/Card"
import { ViewContext } from "../../contexts/ViewContext"

export const Home = () => {
	const { posts } = useContext(PostContext)
	const { selectView } = useContext(ViewContext)

	useEffect(() => {
		const view = "home"

		viewService.createViewEntry(view, null)

		selectView(view)

		viewService.getViewInfo().then(result => {
			console.log(result[result.length - 1])
		}).catch(error => console.log(error))
	}, [])

	return (
		<section className={style["home"]}>
			{posts[0] !== 404 && posts.length > 0 && posts.map(post => <Card key={post._id} post={post} />)}

			{posts[0] === 404 && <h1>No posts yet</h1> || posts.length === 0 && <h1>No posts yet</h1>	}
		</section>
	)
}