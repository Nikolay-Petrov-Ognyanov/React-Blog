import { useContext } from "react"
import { Link } from "react-router-dom"

import style from "./Header.module.css"
import { UserContext } from "../../contexts/UserContext"

export const Header = ({

}) => {
	const { user } = useContext(UserContext)

	return (
		<header>
			<nav>
				<ul role="list" className={style["nav-list"]}>
					<li><Link to="/">Home</Link></li>

					{!user
						?
						<>
							<li><Link to="/register">Register</Link></li>
							<li><Link to="/login">Login</Link></li>
						</>
						:
						<>
							<li><Link to="/create">Create</Link></li>
							<li><Link to="/profile">Profile</Link></li>
							<li><Link to="/logout">Logout</Link></li>
						</>
					}
				</ul>
			</nav>
		</header>
	)
}