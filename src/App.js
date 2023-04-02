import { Routes, Route} from "react-router-dom"

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
import { LikeProvider } from "./contexts/LikeContext"
import { Profile } from "./components/Profile/Profile";

function App() {
	return (
		<UserProvider >
			<PostProvider>
				<LikeProvider>
					<div className="App">
						<Header />

						<main>
							<Routes>
								<Route path="/" element={<Home />} />
								<Route path="/register" element={<Register />} />
								<Route path="/login" element={<Login />} />
								<Route path="/logout" element={<Logout />} />
								<Route path="/create" element={<Create />} />
								<Route path="profile/:userId" element={<Profile />} />
								<Route path="/:postId" element={<Details />} />
								<Route path="/:postId/edit" element={<Edit />} />
							</Routes>
						</main>
					</div>
				</LikeProvider>
			</PostProvider>
		</UserProvider>
	);
}

export default App;