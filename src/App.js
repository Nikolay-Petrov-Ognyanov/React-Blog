import { Routes, Route } from "react-router-dom"
import { Header } from './components/Header/Header';
import { Register } from "./components/User/Register";
import { Login } from "./components/User/Login";
import { Logout } from "./components/User/Logout";
import { Create } from "./components/Post/Create";
import { Edit } from "./components/Post/Edit";
import { Details } from "./components/Details/Details";
import { UserProvider } from "./contexts/UserContext";
import { PostProvider } from "./contexts/PostContext"
import { LikeProvider } from "./contexts/LikeContext"
import { Profile } from "./components/Profile/Profile";
import { ViewProvider } from "./contexts/ViewContext";
import { Posts } from "./components/Posts/Posts";
import { UserGuard } from "./components/Guards/UserGuard";
import { OwnerGuard } from "./components/Guards/OwnerGuard";
import './App.css';

function App() {
	return (
		<UserProvider >
			<PostProvider>
				<LikeProvider>
					<ViewProvider>
						<div className="App">
							<Header />

							<main>
								<Routes>
									<Route path="/posts" element={<Posts />} />
									<Route path="/register" element={<Register />} />
									<Route path="/login" element={<Login />} />
									<Route path="/:postId" element={<Details />} />

									<Route element={<UserGuard />}>
										<Route path="/create" element={<Create />} />
										<Route path="profile/:userId" element={<Profile />} />
										<Route path="/logout" element={<Logout />} />

										<Route element={<OwnerGuard />} >
											<Route path="/:postId/edit" element={<Edit />} />
										</Route>
									</Route>

									<Route path="*" element={<Posts />} />
								</Routes>
							</main>
						</div>
					</ViewProvider>
				</LikeProvider>
			</PostProvider>
		</UserProvider>
	);
}

export default App;