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
import { useLocalStorage } from "./hooks/useLocalStorage";
import { UserContext } from "./contexts/UserContext";
import { PostContext } from "./contexts/PostContext"

function App() {
	const navigate = useNavigate()
	const [posts, setPosts] = useState([])
	const [user, setUser] = useLocalStorage("user", null)

	useEffect(() => {
		postService.getAllPosts()
			.then(result => !result.code && setPosts(Object.values(result)))
			.catch(error => console.log(error.message))
	}, [])
	
	// useEffect(() => {
	// 	postService.getAllPosts().then(result => {
	// 		!result.code && setPosts(Object.values(result))
	// 	}).catch(error => console.log(error.message))
	// }, [])

	const loginHandler = (userData) => {
		setUser(userData)
	}

	const logoutHandler = () => {
		setUser(null)
	}

	const createPostHandler = (postData) => {
		setPosts(state => [
			...state,
			postData
		])

		navigate(`${postData._id}`)
	}

	return (
		<UserContext.Provider value={{
			user,
			loginHandler,
			logoutHandler,
		}}>
			<PostContext.Provider value={{
				posts,
				createPostHandler,
			}}>
				<div className="App">
					<Header />

					<main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/register" element={<Register />} />
							<Route path="/login" element={<Login />} />
							<Route path="/logout" element={<Logout />} />
							<Route path="/create" element={<Create />} />
							<Route path="/:postId" element={<Details />} />
							<Route path="/:postId/edit" element={<Edit />} />
						</Routes>
					</main>
				</div>
			</PostContext.Provider>
		</UserContext.Provider>
	);
}

export default App;
