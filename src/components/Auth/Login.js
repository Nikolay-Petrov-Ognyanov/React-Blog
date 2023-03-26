import style from "./Auth.module.css"

export const Login = ({

}) => {
	return (
		<section className="login">
			<h1>Welcome!</h1>

			<form className={style["auth-form"]}>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					className="input"
				/>
				
				<input
					type="password"
					name="password"
					id="password"
					placeholder="Password"
					className="input"
				/>

				<button className={style["auth-submit"]}>Login</button>
			</form>
		</section>
	)
}