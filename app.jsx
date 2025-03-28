// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./src/pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MovieDetails from "./pages/MovieDetails";
import Watchlist from "./pages/Watchlist";
import SearchBar from "./components/SearchBar";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./src/pages/Profile";
function App() {
	return (
		<Router>
			<Navbar />
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/movies" element={<Movies />} />
					<Route path="/series" element={<Series />} />
					<Route path="/movie/:id" element={<MovieDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/profile" element={user ? <Profile /> : <Login />} />
					<Route path="/watchlist" element={user ? <Watchlist /> : <Login />} />
					<Route path="/search" element={<SearchBar />} />
					<Route
						path="/protected"
						element={
							<ProtectedRoute>
								<Profile />
							</ProtectedRoute>
						}
					/>
				</Routes>
				<Footer />
			</Router>
			<Footer />
		</Router>
	);
}

export default App;
