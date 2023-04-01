import { useState, useContext } from "react"

import style from "./Post.module.css"

import * as postService from "../../services/postService"

import { PostContext } from "../../contexts/PostContext"
import { getRandomImageLink, imageLinks } from "./imageLinks"

export const Create = () => {
    const { createPostHandler } = useContext(PostContext)

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
                if (value &&
                    /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/g
                        .test(value) === false) {
                    stateObject[name] = "Please enter a vaild image link."
                }
            } else if (name === "description") {
                if (!value) {
                    stateObject[name] = "Please enter a description."
                } else if (value.length > 207) {
                    stateObject[name] = "Description could be at most 207 characters long."
                }
            }

            return stateObject
        })
    }

    const handleCreatePost = (event) => {
        event.preventDefault()

        const postData = Object.fromEntries(new FormData(event.target))

        if (postData.imageUrl === "") {
            postData.imageUrl = getRandomImageLink()
        } else if (imageLinks.includes(postData.imageUrl) === false) {
            console.log(postData.imageUrl)
        }

        postService.createPost(postData).then(result => {
            createPostHandler(result)
        }).catch(error => console.log(error))
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
                        placeholder="Enter image link"
                        value={inputs.imageUrl}
                        onChange={handleInputChange}
                        onBlur={validateInput}
                    />

                    <div className="buttons-container">
                        <button className="button"
                            disabled={Object.values(errors).some(entry => entry !== "")
                                ? true
                                // : Object.values(inputs).some(entry => entry === "")}
                                : Object.values(inputs)[0] === ""
                                    ? true
                                    : Object.values(inputs)[2] === ""}
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