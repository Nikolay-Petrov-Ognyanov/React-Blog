import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import * as postService from "../../services/postService"
import style from "./Details.module.css"
import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"

export const Details = () => {
	const { user } = useContext(UserContext)
	const { deletePostHandler } = useContext(PostContext)
	const { postId } = useParams()
	const [post, setPost] = useState({})

	const isUser = user && user._id !== post._ownerId
	const isOwner = user && user._id === post._ownerId

	useEffect(() => {
		postService.getOnePost(postId)
			.then(postData => setPost(postData))
			.catch(error => console.log(error))
	}, [])

	const handleDeletePost = (post) => {
		if (window.confirm(`Are you sure you want to delete ${post.title}?`)) {
			postService.deletePost(post._id)

			deletePostHandler(post._id)
		}
	}

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

				{isUser &&
					<div className="buttons-container">
						<Link className="button">
							Like
						</Link>

						<Link className="button">
							Dislike
						</Link>
					</div>
				}

				{isOwner &&
					<div className="buttons-container">
						<Link to={`/${postId}/edit`}
							className="button">
							Edit
						</Link>

						<button
							onClick={() => handleDeletePost(post)}
							className="button">
							Delete
						</button>
					</div>
				}
			</div>
		</section>
	)
}