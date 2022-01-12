import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup";
import Login from "./components/login";
import Profile from "./components/profile";
import PostDashboard from "./components/posts/PostDashboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SignUp />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/post/:postId" element={<PostDashboard />} />
				{/* <Route path="/" element={<Issues />} />
		<Route path="/issues/:id" element={<SingleIssue />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
