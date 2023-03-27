import { useState } from "react"
import style from "./Auth.module.css"

export const Register = ({
}) => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: ""
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
					stateObject[name] = "Please enter an email."
				} else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) === false) {
					stateObject[name] = "Please enter a valid email."
				}
			} else if (name === "password") {
				if (!value) {
					stateObject[name] = "Please enter a password."
				} else if (value.length < 5) {
					stateObject["password"] = "Password must be at 5 least characters long."
				} else if (value >= 5 && inputs.confirmPassword && value !== inputs.confirmPassword) {
					stateObject["confirmPassword"] = "Passwords must match."
				} else {
					stateObject["confirmPassword"] = !inputs.confirmPassword && errors.confirmPassword
				}
			} else if (name === "confirmPassword") {
				if (inputs.password && !value) {
					stateObject[name] = "Please confirm the password."
				} else if (value !== inputs.password) {
					stateObject[name] = "Passwords must match."
				}
			}

			return stateObject
		})
	}

	return (
		<section className="register">
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

				<input
					type="password"
					name="confirmPassword"
					id="confirmPassword"
					placeholder="Confirm password"
					className="input"
					value={inputs.confirmPassword}
					onChange={handleInputChange}
					onBlur={validateInput}
				/>

				<button
					type="submit"
					className={style["auth-submit"]}
					disabled={Object.values(errors).some(entry => entry !== "")
						? true
						: Object.values(inputs).some(entry => entry === "")}
				>Register
				</button>
			</form>

			{errors.email && <p className="errors">{errors.email}</p>}
			{errors.password && <p className="errors">{errors.password}</p>}
			{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
		</section>
	)
}