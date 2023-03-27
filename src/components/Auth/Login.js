import { useState } from "react"

import style from "./Auth.module.css"

export const Login = ({

}) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: ""
	})

	const [errors, setErrors] = useState({
		email: "",
		password: ""
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

			if (name === "email") {
				if (!value) {
					stateObject[name] = "Please enter email."
				} else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
					stateObject[name] = "Please enter a valid email."
				}
			} else if (name === "password") {
				if (!value) {
					stateObject[name] = "Please enter password."
				} else if (value.length < 5) {
					stateObject["password"] = "Password must be at 5 least characters long."
				}
			}

			return stateObject
		})

	}

	return (
		<section className="login">
			<h1>Welcome!</h1>

			<form className={style["auth-form"]}>
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
					disabled={Object.values(errors).some(entry => entry !== "")
						? true
						: Object.values(inputs).some(entry => entry === "")}
					className={style["auth-submit"]}
				>Login
				</button>
			</form>

			{errors.email && <p className={style["errors"]}>{errors.email}</p>}
			{errors.password && <p className={style["errors"]}>{errors.password}</p>}
		</section>
	)
}