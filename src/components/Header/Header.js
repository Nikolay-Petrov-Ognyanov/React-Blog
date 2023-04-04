import { useContext } from "react"
import { Link } from "react-router-dom"

import style from "./Header.module.css"

import { UserContext } from "../../contexts/UserContext"

export const Header = () => {
	const { user } = useContext(UserContext)

	return (
		<header>
			<nav>
				<ul role="list" className={style["nav-list"]}>
					<li><Link to="/" className="button">Home</Link></li>

					{user === null
						?
						<>
							<li><Link to="/register" className="button">Register</Link></li>
							<li><Link to="/login" className="button">Login</Link></li>
						</>
						:
						<>
							<li><Link to="/search" className="button">Search</Link></li>
							<li><Link to="/create" className="button">Create</Link></li>
							<li><Link to={`/profile/${user._id}`} className="button">Profile</Link></li>
							<li><Link to="/logout" className="button">Logout</Link></li>
						</>
					}
				</ul>
			</nav>
		</header>
	)
}