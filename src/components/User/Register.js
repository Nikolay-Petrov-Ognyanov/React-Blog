import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"

import style from "./User.module.css"
import { register } from "../../services/userService"
import { UserContext } from "../../contexts/UserContext"

export const Register = ({
}) => {
	const navigate = useNavigate()
	const { loginHandler } = useContext(UserContext)

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const [errors, setErrors] = useState({
		email: "",
		password: "",
		confirmPassword: "",
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
					stateObject[name] = "Password must be at 5 least characters long."
				} else if (value >= 5 && inputs.confirmPassword && value !== inputs.confirmPassword) {
					stateObject["confirmPassword"] = "Passwords must match."
				} else {
					stateObject["confirmPassword"] = !inputs.confirmPassword && errors.confirmPassword
				}
			} else if (name === "confirmPassword") {
				if (inputs.password && !value) {
					stateObject[name] = "Please confirm the password."
				} else if (value.length < 5) {
					stateObject["password"] = "Password must be at 5 least characters long."
				} else if (value !== inputs.password) {
					stateObject[name] = "Passwords must match."
				}
			}

			return stateObject
		})
	}

	const handleRegister = (event) => {
		event.preventDefault()

		const { email, password } = Object.fromEntries(new FormData(event.target))

		register(email, password).then(result => {
			if (!result.message) {
				loginHandler(result)
				navigate("/")
			} else {
				setErrors({ server: result.message + "." })
			}
		})
	}

	return (
		<section className="register">
			<h1>Welcome!</h1>

			<form className={style["user-form"]} onSubmit={handleRegister}>
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
					className={style["user-submit"]}
					disabled={Object.values(errors).some(entry => entry !== "")
						? true
						: Object.values(inputs).some(entry => entry === "")}
				>Register
				</button>
			</form>

			{errors.email && <p className="errors">{errors.email}</p>}
			{errors.password && <p className="errors">{errors.password}</p>}
			{errors.server && <p className="errors">{errors.server}</p>}
			{errors.confirmPassword && <p className="errors">{errors.confirmPassword}</p>}
		</section>
	)
}