// SearchBar Component (src/components/SearchBar.js)
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
	const [query, setQuery] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		e.preventDefault();
		if (query.trim()) {
			navigate(`/movies?search=${query}`);
		}
	};

	return (
		<form
			onSubmit={handleSearch}
			className="flex items-center bg-gray-800 p-2 rounded-lg"
		>
			<input
				type="text"
				placeholder="Search for movies..."
				className="bg-transparent text-white p-2 flex-grow focus:outline-none"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
			<button type="submit" className="bg-red-600 px-4 py-2 rounded-lg">
				Search
			</button>
		</form>
	);
}

export default SearchBar;
