// import {useState, useEffect} from "react"
import uniqid from "uniqid"

// import * as postService from "../../services/postService"

import style from "./Save.module.css"

export const Create = ({
    createHandler
}) => {
    // const [createPostData, setCreatePostData] = useState({
    //     title: "",
    //     imageUrl: "",
    //     description: ""
    // })

    // const handleCreateChange = (event) => {
    //     setCreatePostData(state => ({
    //         [event.target.name]: event.target.value
    //     }))
    // }

    const handleCreateUncontrolled = (event) => {
        event.preventDefault()

        const postData = Object.fromEntries(new FormData(event.target))

        if (Object.values(postData).find(entry => !!entry === false) === undefined) {
            postData._id = uniqid()

            console.log(postData)

            createHandler(postData)
        }
    }

    return (
        <section className={style["save"]}>
            <h1>Create</h1>

            <form className={style["save-form"]} onSubmit={handleCreateUncontrolled}>
                <div className={style["input-container"]}>
                    <input
                        className="input"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                    />

                    <input
                        className="input"
                        type="text"
                        name="imageUrl"
                        id="imageUrl"
                        placeholder="Image"
                    />

                    <div className="buttons-container">
                        <button className="icon-button">
                            <i className="fa-solid fa-circle-check" />
                        </button>

                        <button className="icon-button">
                            <i className="fa-solid fa-circle-xmark" />
                        </button>
                    </div>
                </div>

                <textarea
                    className={style["textarea"]}
                    name="description"
                    id="description"
                    placeholder="Description"
                    cols={30}
                    rows={5}
                    defaultValue={""}
                />
            </form>
        </section>
    )
}