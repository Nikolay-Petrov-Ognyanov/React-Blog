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
import { UserProvider } from "./contexts/UserContext";
import { PostContext } from "./contexts/PostContext"

function App() {
	const navigate = useNavigate()

	const [posts, setPosts] = useState([])

	useEffect(() => {
		postService.getAllPosts()
			.then(result => !result.code && setPosts(Object.values(result)))
			.catch(error => console.log(error))
	}, [])

	const createPostHandler = (postData) => {
		setPosts(state => [
			...state,
			postData
		])

		navigate(`${postData._id}`)
	}

	const editPostHandler = (postId, postData) => {
		setPosts(state => state.map(post => post._id === postId ? postData : post))

		navigate(`${postData._id}`)
	}

	const deletePostHandler = (postId) => {
		setPosts(state => state.filter(post => post._id !== postId))

		navigate("/")
	}

	return (
		<UserProvider >
			<PostContext.Provider value={{
				posts,
				createPostHandler,
				editPostHandler,
				deletePostHandler
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
		</UserProvider>
	);
}

export default App;