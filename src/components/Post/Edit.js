import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { PostContext } from "../../contexts/PostContext"
import { UserContext } from "../../contexts/UserContext"
import * as postService from "../../services/postService"
import style from "./Post.module.css"

export const Edit = () => {
	const { postId } = useParams()

	const { user } = useContext(UserContext)
	const { editPostHandler } = useContext(PostContext)

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

	useEffect(() => {
		postService.getOnePost(postId).then(postData => {
			setPost(postData)
			setInputs(postData)
		}).catch(error => console.log(error))
	}, [])

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
				} else if (value && /^[a-zA-Z0-9\s]*$/.test(value) === false) {
					stateObject[name] = "Please enter a valid title."
				} else if (value && value.length > 12) {
					stateObject[name] = "Title could be at most 12 characters long."
				}
			} else if (name === "imageUrl") {
				if (value &&
					/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/g
						.test(value) === false) {
					stateObject[name] = "Please enter a vaild image link."
				}
			} else if (name === "description") {
				if (!value) {
					stateObject[name] = "Please enter a description."
				} else if (value.length > 120) {
					stateObject[name] = "Description could be at most 120 characters long."
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
						placeholder="Enter image link (optional)"
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