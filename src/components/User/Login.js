import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import style from "./User.module.css"

import * as userService from "../../services/userService"

import { UserContext } from "../../contexts/UserContext"

export const Login = () => {
	const navigate = useNavigate()
	const { loginHandler } = useContext(UserContext)

	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		server: ""
	})

	const handleInputChange = (event) => {
		const { name, value } = event.target

		setInputs(state => ({
			...state,
			[name]: value
		}))

		setErrors({ server: "" })
		validateInput(event)
	}

	const validateInput = (event) => {
		let { name, value } = event.target

		setErrors(state => {
			const stateObject = { ...state, [name]: "" }

			if (name === "email") {
				if (!value) {
					stateObject[name] = "Please enter an email."
				} else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
					stateObject[name] = "Please enter a valid email."
				}
			} else if (name === "password") {
				if (!value) {
					stateObject[name] = "Please enter a password."
				} else if (value.length < 5) {
					stateObject["password"] = "Password must be at 5 least characters long."
				}
			}

			return stateObject
		})
	}

	const handleLogin = (event) => {
		event.preventDefault()

		const { email, password } = Object.fromEntries(new FormData(event.target))

		userService.login(email, password).then(result => {
			if (!result.message) {
				loginHandler(result)
				navigate("/")
			} else {
				setErrors({ server: result.message + "." })
			}
		}).catch(error => console.log(error.message))
	}

	return (
		<section className="login">
			<h1>Welcome!</h1>

			<form className={style["user-form"]} onSubmit={handleLogin} >
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Enter email"
					className="input"
					value={inputs.email}
					onChange={handleInputChange}
					onBlur={validateInput}
				/>

				<input
					type="password"
					name="password"
					id="password"
					placeholder="Enter password"
					className="input"
					value={inputs.password}
					onChange={handleInputChange}
					onBlur={validateInput}
				/>

				<button
					type="submit"
					className={style["user-submit"]}
					disabled={Object.values(errors).some(entry => entry !== "")
						? true
						: Object.values(inputs).some(entry => entry === "")}
				>Login
				</button>
			</form>

			{errors.email && <p className="errors">{errors.email}</p>}
			{errors.password && <p className="errors">{errors.password}</p>}
			{errors.server && <p className="errors">{errors.server}</p>}
		</section>
	)
}