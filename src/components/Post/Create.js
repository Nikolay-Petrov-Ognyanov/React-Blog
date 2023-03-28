import { useState, useEffect } from "react"
import uniqid from "uniqid"

import style from "./Post.module.css"

export const Create = ({
    createHandler
}) => {
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
                } else if (value.length > 16) {
                    stateObject[name] = "Title could be at most 16 characters long."
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
                } else if (value.length > 225) {
                    stateObject[name] = "Description could be at most 225 characters long."
                }
            }

            return stateObject
        })
    }

    const handleCreate = (event) => {
        event.preventDefault()

        const postData = Object.fromEntries(new FormData(event.target))

        postData._id = postData.title

        createHandler(postData)
    }

    return (
        <section className={style["post"]}>
            <h1>Create post</h1>

            <form className={style["post-form"]} onSubmit={handleCreate}>
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
                        <button className="icon-button"
                            disabled={Object.values(errors).some(entry => entry !== "")
                                ? true
                                : Object.values(inputs).some(entry => entry === "")}
                        >Save
                        </button>

                        <button className="icon-button">Cancel</button>
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