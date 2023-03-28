import style from "./Details.module.css"

import { useParams } from "react-router-dom"

export const Details = ({
	posts
}) => {
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
					<button className="icon-button">
						Like
					</button>

					<button className="icon-button">
						Dislike
					</button>
				</div>
			</div>
		</section>
	)
}