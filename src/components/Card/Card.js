import { useContext } from "react"
import { LikeContext } from "../../contexts/LikeContext"
import { Link } from "react-router-dom"
import style from "./Card.module.css"

export const Card = ({
	post
}) => {
	const { likes } = useContext(LikeContext)

	const postLikes = likes.filter(l => l.postId === post._id && l.like === true).length
	const postDislikes = likes.filter(l => l.postId === post._id && l.like === false).length

	return (
		<Link to={`/${post._id}`} className={style["card-link-wrapper"]} >
			<div className={style["card"]}>
				<div className={style["card-view"]}>
					<p>{postLikes} <i className="fa-solid fa-thumbs-up"></i></p>
					<p>{postDislikes} <i className="fa-solid fa-thumbs-down"></i></p>
				</div>
				
				<div className={style["card-overlay"]}>
					<img className={style["card-img"]} src={post.imageUrl} alt={post.title} />
				</div>
			</div>
		</Link>
	)
}