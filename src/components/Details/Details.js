import { useState, useEffect, useContext } from "react"
import { Link, useParams } from "react-router-dom"

import * as likeService from "../../services/likeService"
import * as postService from "../../services/postService"

import style from "./Details.module.css"

import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { LikeContext } from "../../contexts/LikeContext"

export const Details = () => {
	const { user } = useContext(UserContext)
	const { deletePostHandler } = useContext(PostContext)
	const { likes, createLikeHandler, updateLikeHandler } = useContext(LikeContext)
	const { postId } = useParams()
	const [post, setPost] = useState({})

	const isUser = user && user._id !== post._ownerId
	const isOwner = user && user._id === post._ownerId

	let like = null

	if (likes && likes.find(entry => entry.postId === postId)) {
		like = likes.find(entry => entry.postId === postId).like
	}

	useEffect(() => {
		postService.getOnePost(postId)
			.then(postData => setPost(postData))
			.catch(error => console.log(error))
	}, [])

	const handleLikePost = (postId, user) => {
		like = true

		likeService.getAllLikes().then(result => {
			const entry = result.find(e => e.postId === postId && e._ownerId === user._id)

			if (entry === undefined) {
				likeService.createLikeEntry(postId, like)
					.then(entry => createLikeHandler(entry))
					.catch(error => console.log(error))
			} else if (entry.like === false) {
				likeService.updateLikeEntry(entry._id, postId, like)

				updateLikeHandler(entry._id, { ...entry, like: true })
			}
		}).catch(error => console.log(error))
	}

	const handleDisikePost = (postId, user) => {
		like = false

		likeService.getAllLikes().then(result => {
			const entry = result.find(e => e.postId === postId && e._ownerId === user._id)

			if (entry === undefined) {
				likeService.createLikeEntry(postId, like)
					.then(entry => createLikeHandler(entry))
					.catch(error => console.log(error))
			} else if (entry.like === true) {
				likeService.updateLikeEntry(entry._id, postId, like)

				updateLikeHandler(entry._id, { ...entry, like: false })
			}
		})
	}

	const handleDeletePost = (post) => {
		if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
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
						<button
							onClick={() => handleLikePost(postId, user)}
							className="button"
							disabled={like === true}
						>
							Like
						</button>

						<button
							onClick={() => handleDisikePost(postId, user)}
							className="button"
							disabled={like === false}
						>
							Dislike
						</button>
					</div>
				}

				{isOwner &&
					<div className="buttons-container">
						<Link to={`/${postId}/edit`}
							className="button"
						>
							Edit
						</Link>

						<button onClick={() => handleDeletePost(post, user)}
							className="button"
						>
							Delete
						</button>
					</div>
				}
			</div>
		</section>
	)
}