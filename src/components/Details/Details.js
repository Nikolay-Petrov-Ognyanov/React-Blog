import { useContext } from "react"
import { useParams } from "react-router-dom"

import style from "./Details.module.css"
import { PostContext } from "../../contexts/PostContext"

export const Details = () => {
	const { posts } = useContext(PostContext)
	const { postId } = useParams()
	const post = posts.find(p => p._id === postId)

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
					<button className="button">
						Like
					</button>

					<button className="button">
						Dislike
					</button>
				</div>
			</div>
		</section>
	)
}