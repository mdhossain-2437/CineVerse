// Navbar Component (src/components/Navbar.js)
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
	return (
		<nav className="bg-gray-900 text-white p-4 flex justify-between">
			<h1 className="text-xl font-bold">OTT Platform</h1>
			<div>
				<Link className="mx-2" to="/">
					Home
				</Link>
				<Link className="mx-2" to="/movies">
					Movies
				</Link>
				<Link className="mx-2" to="/series">
					Series
				</Link>
				<Link className="mx-2" to="/login">
					Login
				</Link>
			</div>
			<SearchBar />
		</nav>
	);
}

export default Navbar;
