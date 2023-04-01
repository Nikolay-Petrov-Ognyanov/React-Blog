import { useState, useEffect, useContext } from "react"

import * as postService from "../../services/postService"

import style from "./Post.module.css"

import { PostContext } from "../../contexts/PostContext"
import { useParams } from "react-router-dom"

export const Edit = () => {
	const { editPostHandler } = useContext(PostContext)
	const { postId } = useParams()

	useEffect(() => {
		postService.getOnePost(postId).then(postData => {
			setPost(postData)
			setInputs(postData)
		}).catch(error => console.log(error))
	}, [])

	const [post, setPost] = useState({})

	const [inputs, setInputs] = useState({
		title: "",
		imageUrl: "",
		description: ""
	})

	const [errors, setErrors] = useState({
		title: "",
		imageUrl: "",
		description: ""
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target

		setInputs(state => ({
			...state,
			[name]: value
		}))

		validateInput(event)
	}

	const validateInput = (event) => {
		let { name, value } = event.target

		setErrors(state => {
			const stateObject = { ...state, [name]: "" }

			if (name === "title") {
				if (!value) {
					stateObject[name] = "Please enter a title."
				} else if (value && value.length > 15) {
					stateObject[name] = "Title could be at most 15 characters long."
				}
			} else if (name === "imageUrl") {
				if (!value) {
					stateObject[name] = "Please enter an image link."
				} else if (/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/g
					.test(value) === false) {
					stateObject[name] = "Please enter a vaild image link."
				}
			} else if (name === "description") {
				if (!value) {
					stateObject[name] = "Please enter a description."
				} else if (value.length > 138) {
					stateObject[name] = "Description could be at most 138 characters long."
				}
			}

			return stateObject
		})
	}

	const handleEditPost = async (event) => {
		event.preventDefault()

		const formData = Object.fromEntries(new FormData(event.target))

		postService.editPost(postId, formData).then(postData => {
			editPostHandler(postId, postData)
		}).catch(error => console.log(error))
	}

	return (
		<section className={style["post"]}>
			<h1>Edit post</h1>

			<form className={style["post-form"]} onSubmit={handleEditPost}>
				<div className={style["input-container"]}>
					<input
						className="input"
						type="text"
						name="title"
						id="title"
						placeholder="Enter title"
						value={inputs.title}
						onChange={handleInputChange}
						onBlur={validateInput}
					/>

					<input
						className="input"
						type="text"
						name="imageUrl"
						id="imageUrl"
						placeholder="Enter image link"
						value={inputs.imageUrl}
						onChange={handleInputChange}
						onBlur={validateInput}
					/>

					<div className="buttons-container">
						<button className="button"
							disabled={Object.values(errors).some(entry => entry !== "")
								? true
								: Object.values(inputs).some(entry => entry === "")}
						>Save
						</button>

						<button className="button">Cancel</button>
					</div>
				</div>

				<textarea
					className={style["textarea"]}
					name="description"
					id="description"
					placeholder="Enter description"
					cols={20}
					rows={5}
					value={inputs.description}
					onChange={handleInputChange}
					onBlur={validateInput}
				/>
			</form>

			{errors.title && <p className="errors">{errors.title}</p>}
			{errors.imageUrl && <p className="errors">{errors.imageUrl}</p>}
			{errors.description && <p className="errors">{errors.description}</p>}
		</section>
	)
}