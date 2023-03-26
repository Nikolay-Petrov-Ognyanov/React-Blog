import { Link } from "react-router-dom"

import style from "./Card.module.css"

export const Card = ({
	post
}) => {
	return (
		<Link to={`/${post._id}`}>
			<div className={style["card"]}>
				<p className={style["card-view"]}>View Details</p>
				<div className={style["card-overlay"]}>
					<img className={style["card-img"]} src={post.imageUrl} alt={post.title} />
				</div>
			</div>
		</Link>
	)
}