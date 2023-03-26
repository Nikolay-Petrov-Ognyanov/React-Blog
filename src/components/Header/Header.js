import { Link } from "react-router-dom"

import style from "./Header.module.css"

export const Header = ({

}) => {
	return (
		<header>
			<nav>
				<ul role="list" className={style["nav-list"]}>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/register">Register</Link></li>
					<li><Link to="/login">Login</Link></li>
					<li><Link to="/create">Create</Link></li>
					<li><Link to="/profile">Profile</Link></li>
					<li><Link to="/logout">Logout</Link></li>
				</ul>
			</nav>
		</header>
	)
}