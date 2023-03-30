import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import * as postService from "../../services/postService"
import style from "./Details.module.css"
import { PostContext } from "../../contexts/PostContext"

export const Details = () => {
	const { postId } = useParams()
	const [post, setPost] = useState({})

	useEffect(() => {
		postService.getOnePost(postId).then(postData => setPost(postData))
	}, [])

	return (
		<section className={style["details"]}>
			<div className={style["details-img-container"]}>
				<img
					src={post.imageUrl}
					className={style["details-img"]}
					alt={post.title}
				/>
			</div>

			<div className={style["details-text-container"]}>
				<h2 className={style["details-title"]}>
					{post.title}
				</h2>

				<p className={style["details-description"]} >
					{post.description}
				</p>

				<div className="buttons-container">
					<Link to={`/${postId}/edit`} className="button">
						Edit
					</Link>

					<button className="button">
						Delete
					</button>
				</div>
			</div>
		</section>
	)
}