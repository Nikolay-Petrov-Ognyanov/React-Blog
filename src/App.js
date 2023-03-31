import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


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
import { PostProvider } from "./contexts/PostContext"

function App() {
	return (
		<UserProvider >
			<PostProvider>
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
			</PostProvider>
		</UserProvider>
	);
}

export default App;