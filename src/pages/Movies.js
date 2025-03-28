// Movies Page (src/pages/Movies.js)
import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdbApi";

import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../api/tmdbApi";

function Movies() {
	const [movies, setMovies] = useState([]);
	const [searchParams] = useSearchParams();
	const query = searchParams.get("search");

	useEffect(() => {
		const getMovies = async () => {
			const data = await fetchTrendingMovies();
			setMovies(data);
		};
		getMovies();
		if (query) {
			const fetchResults = async () => {
				const results = await searchMovies(query);
				setMovies(results);
			};
			fetchResults();
		}
	}, [query]);

	return (
		<div className="p-4 text-white bg-gray-900 min-h-screen">
			<h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{movies.map((movie) => (
					<div key={movie.id} className="bg-gray-800 p-2 rounded-lg">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="w-full rounded-lg"
						/>
						<h2 className="text-lg mt-2">{movie.title}</h2>
						<p className="text-sm">Rating: {movie.vote_average}</p>
					</div>
				))}
			</div>
			<h1 className="text-2xl font-bold mb-4">Trending Movies</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{movies.map((movie) => (
					<div key={movie.id} className="bg-gray-800 p-2 rounded-lg">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="w-full rounded-lg"
						/>
						<h2 className="text-lg mt-2">{movie.title}</h2>
						<p className="text-sm">Rating: {movie.vote_average}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Movies;
