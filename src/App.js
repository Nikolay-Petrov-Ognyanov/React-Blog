import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import * as postService from "./services/postService"

import './App.css';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Register } from "./components/User/Register";
import { Login } from "./components/User/Login";
import { Logout } from "./components/User/Logout";
import { Create } from "./components/Post/Create";
import { Edit } from "./components/Post/Edit";
import { Details } from "./components/Details/Details";
import { UserContext } from "./contexts/UserContext";

function App() {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])
	const [user, setUser] = useState(null)

	useEffect(() => {
		postService.loadInitialPosts()
			.then(result => setPosts(Object.values(result)))
			.catch(error => console.log(error.message))
	}, [])

	const loginHandler = (userData) => {
		setUser(userData)
	}

	const logoutHandler = () => {
		setUser(null)
	}

	const createHandler = (postData) => {
		setPosts(state => [
			...state,
			postData
		])

		navigate("/")
	}

	const editHandler = (postData) => {
		setPosts(state => [
			...state,
			postData
		])

		navigate("/")
	}

	return (
		<UserContext.Provider value={{
			user,
			loginHandler,
			logoutHandler
		}}>
			<div className="App">
				<Header />

				<main>
					<Routes>
						<Route path="/" element={<Home posts={posts} />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
						<Route path="/create" element={<Create createHandler={createHandler} />} />
						<Route path="/:postId" element={<Details posts={posts} />} />
						<Route path="/:postId/edit" element={<Edit editHandler={editHandler} />} />
					</Routes>
				</main>
			</div>
		</UserContext.Provider>
	);
}

export default App;
