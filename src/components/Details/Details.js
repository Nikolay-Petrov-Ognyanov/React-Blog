import { useState, useEffect, useContext } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import * as likeService from "../../services/likeService"
import * as postService from "../../services/postService"

import style from "./Details.module.css"

import { UserContext } from "../../contexts/UserContext"
import { PostContext } from "../../contexts/PostContext"
import { LikeContext } from "../../contexts/LikeContext"
import { ViewContext } from "../../contexts/ViewContext"

export const Details = () => {
	const navigate = useNavigate()

	const { postId } = useParams()

	const { user, users } = useContext(UserContext)
	const { deletePostHandler, posts } = useContext(PostContext)
	const { likes, createLikeHandler, updateLikeHandler } = useContext(LikeContext)
	const { selectedView, selectedUserId } = useContext(ViewContext)

	const [post, setPost] = useState({})

	useEffect(() => {
		postService.getOnePost(postId).then(postData => {
			setPost(postData)
		}).catch(error => console.log(error))
	}, [])

	const postAuthor = users.find(u => u.userId === post._ownerId)
	const isUser = user && user._id !== post._ownerId
	const isAuthor = user && user._id === post._ownerId

	let postIdList = []

	if (selectedView === "" || selectedView === "home") {
		postIdList = posts.length > 0 && posts.map(p => p._id)
	} else if (selectedView === "search") {
		postIdList = JSON.parse(localStorage.getItem("searchResult")).map(p => p._id)
	} else if (selectedView === "profile") {
		if (!!post._ownerId && post._ownerId === selectedUserId) {
			postIdList = posts.filter(p => p._ownerId === selectedUserId).map(p => p._id)
		} else if (!!post._ownerId && post._ownerId !== selectedUserId) {
			postIdList = likes.length > 0 &&
				likes.filter(l => l._ownerId === selectedUserId &&
					l.like === true).map(l => l.postId)
		}
	}

	const currentIndex = postIdList.length > 0 && postIdList.indexOf(postId)

	const handleLeftButton = () => {
		if (!!postIdList[currentIndex - 1]) {
			const previousPostId = postIdList[currentIndex - 1]
			const newPost = posts.find(p => p._id === previousPostId)

			setPost(newPost)
			navigate(`/${postIdList[currentIndex - 1]}`)
		}
	}

	const handleRightButton = () => {
		if (!!postIdList[currentIndex + 1]) {
			const nextPostId = postIdList[currentIndex + 1]
			const newPost = posts.find(p => p._id === nextPostId)

			setPost(newPost)
			navigate(`/${postIdList[currentIndex + 1]}`)
		}
	}

	let currentReaction = null
	let likesCount = null
	let dislikesCount = null

	if (likes && likes.find(l => l.postId === postId)) {
		likesCount = likes.filter(l => l.postId === postId && l.like === true).length
		dislikesCount = likes.filter(l => l.postId === postId && l.like === false).length
	}

	if (likes && likes.find(l => l.postId === postId && l._ownerId === user._id)) {
		currentReaction = likes.find(l => l.postId === postId && l._ownerId === user._id).like
	}

	const handleLikePost = (postId, user, newReaction) => {
		currentReaction = newReaction

		likeService.getAllLikes().then(result => {
			const entry = result.find(l => l.postId === postId && l._ownerId === user._id)

			if (entry === undefined) {
				likeService.createLikeEntry(postId, currentReaction).then(entry => {
					createLikeHandler(entry)
				}).catch(error => console.log(error))
			} else if (entry.like !== currentReaction) {
				likeService.updateLikeEntry(entry._id, postId, currentReaction)

				updateLikeHandler(entry._id, { ...entry, like: currentReaction })
			}
		}).catch(error => console.log(error))
	}

	const handleDeletePost = (post) => {
		if (window.confirm(`Are you sure you want to delete "${post.title}"?`)) {
			postService.deletePost(post._id)

			deletePostHandler(post._id)

			if (selectedView === "home") {
				navigate("/")
			} else if (selectedView === "search") {
				navigate("/search")
			} else if (selectedView === "profile") {
				navigate(`/profile/${selectedUserId}`)
			}
		}
	}

	let oneLikeNoDislikes = likesCount === 1 && !dislikesCount
	let noLikesOneDislike = !likesCount && dislikesCount === 1
	let oneLikeOneDislike = likesCount === 1 && dislikesCount === 1
	let multipleLikesNoDislikes = likesCount > 1 && !dislikesCount
	let noLikesMultipleDislikes = !likesCount && dislikesCount > 1
	let multipleLikesOneDislike = likesCount > 1 && dislikesCount === 1
	let oneLikeMultipleDislikes = likesCount === 1 && dislikesCount > 1
	let multipleLikesMultipleDislikes = likesCount > 1 && dislikesCount > 1

	return (
		<section className={style["details"]}>
			<button
				onClick={handleLeftButton}
				className="fa-solid fa-chevron-left"
				disabled={
					postIdList.length === 0 ||
					postIdList.length > 0 &&
					!postIdList[currentIndex - 1]
				}
			></button>

			<div className={style["details-wrapper"]}>
				<div className={style["details-img-container"]}>
					<img
						src={post.imageUrl}
						className={style["details-img"]}
						alt={post.title}
					/>
				</div>

				<div className={style["details-text-container"]}>
					<div className={style["title-wrapper"]}>
						<h2 className={style["details-title"]}>{post.title}</h2>

						<Link
							to={post && `/profile/${post._ownerId}`}
							className={style["author"]}
						>
							by {postAuthor && postAuthor.email}
						</Link>
					</div>

					<p className={style["details-description"]} >
						{post.description}
					</p>

					<div className={style["details-likes-wrapper"]}>
						<p className={style["likes-container"]} >
							{
								oneLikeNoDislikes &&
								`${likesCount} like` ||
								noLikesOneDislike &&
								`${dislikesCount} dislike` ||
								oneLikeOneDislike &&
								`${likesCount} like & ${dislikesCount} dislike` ||
								multipleLikesNoDislikes &&
								`${likesCount} likes` ||
								noLikesMultipleDislikes &&
								`${dislikesCount} dislikes` ||
								multipleLikesOneDislike &&
								`${likesCount} likes & ${dislikesCount} dislike` ||
								oneLikeMultipleDislikes &&
								`${likesCount} like & ${dislikesCount} dislikes` ||
								multipleLikesMultipleDislikes &&
								`${likesCount} likes & ${dislikesCount} dislikes`
							}
						</p>

						{isUser &&
							<div className="buttons-container">

								<button
									onClick={() => handleLikePost(postId, user, true)}
									className="button"
									disabled={currentReaction === true}
								>
									Like
								</button>

								<button
									onClick={() => handleLikePost(postId, user, false)}
									className="button"
									disabled={currentReaction === false}
								>
									Dislike
								</button>
							</div>
						}

						{isAuthor &&
							<div className="buttons-container">

								<Link
									to={`/${postId}/edit`}
									className="button"
								>
									Edit
								</Link>

								<button
									onClick={() => handleDeletePost(post, user)}
									className="button"
								>
									Delete
								</button>
							</div>
						}
					</div>
				</div>
			</div>

			<button
				onClick={handleRightButton}
				className="fa-solid fa-chevron-right"
				disabled={
					postIdList.length === 0 ||
					postIdList.length > 0 &&
					!postIdList[currentIndex + 1]
				}
			></button>
		</section>
	)
}