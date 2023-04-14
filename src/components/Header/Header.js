import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../../contexts/UserContext"
import style from "./Header.module.css"

export const Header = () => {
	const { user } = useContext(UserContext)

	return (
		<header className={user && style["header-user"] || style["header-guest"]} >
			<nav>
				<ul role="list" className={user && style["nav-list-user"] || style["nav-list-guest"]}>
					<li><Link to="/" className="button">Posts</Link></li>

					{user === null
						?
						<>
							<li><Link to="/register" className="button">Register</Link></li>
							<li><Link to="/login" className="button">Login</Link></li>
						</>
						:
						<>
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