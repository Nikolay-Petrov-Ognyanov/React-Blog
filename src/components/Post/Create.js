import { useState, useContext } from "react"
import { PostContext } from "../../contexts/PostContext"
import { getRandomImageLink, imageLinks } from "./imageLinks"
import * as postService from "../../services/postService"
import style from "./Post.module.css"

export const Create = () => {
    const { createPostHandler, posts } = useContext(PostContext)

    const imageLinksInUse = posts.map(p => p.imageUrl) || []
    const imageLinksFromCollectionUsed = imageLinks.filter(l => imageLinksInUse.includes(l)).length

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
                } else if (value && /^[a-zA-Z0-9\s]*$/.test(value) === false) {
                    stateObject[name] = "Please enter a valid title."
                } else if (value && value.length > 12) {
                    stateObject[name] = "Title could be at most 12 characters long."
                }
            } else if (name === "imageUrl") {
                if (!value && imageLinksFromCollectionUsed >= imageLinks.length) {
                    stateObject[name] = "Please enter image link."
                } else if (posts.find(p => p.imageUrl === value)) {
                    stateObject[name] = "This image is already in the collection."
                } else if (value != Number(value) &&
                    /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/g.test(
                        value
                    ) === false
                ) {
                    stateObject[name] = "Please enter a vaild image link."
                } else if (value == Number(value) && imageLinksFromCollectionUsed >= imageLinks.length) {
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

    const handleCreatePost = (event) => {
        event.preventDefault()

        const postData = Object.fromEntries(new FormData(event.target))

        if (postData.imageUrl === "" || postData.imageUrl == Number(postData.imageUrl)) {
        }

        if (postData.imageUrl === "") {
            postData.imageUrl = "1"
        }

        let postsToCreate = 0

        if (postData.imageUrl == Number(postData.imageUrl)) {
            postsToCreate = Number(postData.imageUrl)
        }

        if (Number(postData.imageUrl) > imageLinks.length - imageLinksFromCollectionUsed) {
            postsToCreate = imageLinks.length - imageLinksFromCollectionUsed
        }

        if (postsToCreate) {
            for (let i = 0; i < postsToCreate; i++) {
                let randomImageLink = getRandomImageLink()

                if (imageLinksInUse.includes(randomImageLink)) {
                    while (imageLinksInUse.includes(randomImageLink)) {
                        if (imageLinksFromCollectionUsed >= imageLinks.length) {
                            break
                        }

                        randomImageLink = getRandomImageLink()
                    }
                }

                if (imageLinksInUse.includes(randomImageLink) === false) {
                    imageLinksInUse.push(randomImageLink)

                    postData.imageUrl = randomImageLink
                }

                if (postData.imageUrl) {
                    postService.createPost(postData).then(result => {
                        createPostHandler(result)
                    }).catch(error => console.log(error))
                }
            }
        } else {
            postService.createPost(postData).then(result => {
                createPostHandler(result)
            }).catch(error => console.log(error))
        }
    }

    return (
        <section className={style["post"]}>
            <h1>Create post</h1>

            <form className={style["post-form"]} onSubmit={handleCreatePost}>
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

                        placeholder={
                            imageLinksFromCollectionUsed < imageLinks.length &&
                            "Enter image link (optional)" ||
                            "Enter image link"
                        }

                        value={inputs.imageUrl}
                        onChange={handleInputChange}
                        onBlur={validateInput}
                    />

                    <div className="buttons-container">
                        <button className="button"
                            disabled={
                                imageLinksFromCollectionUsed >= imageLinks.length
                                    ? Object.values(errors).some(entry => entry !== "")
                                        ? true
                                        : Object.values(inputs).some(entry => entry === "")
                                    : Object.values(errors).some(entry => entry !== "")
                                        ? true
                                        : Object.values(inputs)[0] === ""
                                            ? true
                                            : Object.values(inputs)[2] === ""

                            }
                        >Save</button>

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