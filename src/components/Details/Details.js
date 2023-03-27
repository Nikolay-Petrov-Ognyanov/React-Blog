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
				<h2>{post.title}</h2>

				<p className={style["details-description"]} >
					{post.description}
				</p>

				<div className="buttons-container">
					<button className="icon-button">
						<i className="fa-solid fa-pen-to-square" />
					</button>

					<button className="icon-button">
						<i className="fa-solid fa-trash-can" />
					</button>
				</div>
			</div>
		</section>
	)
}