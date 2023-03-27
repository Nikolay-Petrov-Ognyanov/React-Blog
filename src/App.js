import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import * as postService from "./services/postService"

import './App.css';
import { Home } from './components/Home/Home';
import { Header } from './components/Header/Header';
import { Register } from "./components/Auth/Register";
import { Login } from "./components/Auth/Login";
import { Create } from "./components/Save/Create";
import { Edit } from "./components/Save/Edit";
import { Details } from "./components/Details/Details";

function App() {
	const navigate = useNavigate()

	const [posts, setPosts] = useState([])

	useEffect(() => {
		postService.loadInitialPosts()
			.then(result => setPosts(Object.values(result)))
			.catch(error => console.log(error.message))
	}, [])

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
		<div className="App">
			<Header />

			<main>
				<Routes>
					<Route path="/" element={<Home posts={posts} />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/create" element={<Create createHandler={createHandler} />} />
					<Route path="/:postId" element={<Details posts={posts} />} />
					<Route path="/:postId/edit" element={<Edit editHandler={editHandler} />} />
				</Routes>
			</main>
		</div>
	);
}

export default App;
