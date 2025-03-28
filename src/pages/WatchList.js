// Watchlist Page (src/pages/Watchlist.js)
import React, { useEffect, useState } from "react";
import { getWatchlist, removeFromWatchlist } from "../api/firestore";

function Watchlist() {
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		getWatchlist().then(setWatchlist);
	}, []);

	return (
		<div className="bg-gray-900 text-white p-8 min-h-screen">
			<h1 className="text-3xl font-bold">My Watchlist</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{watchlist.map((movie) => (
					<div key={movie.id} className="cursor-pointer">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="rounded-lg"
						/>
						<p className="mt-2">{movie.title}</p>
						<button
							onClick={() => removeFromWatchlist(movie)}
							className="bg-red-600 px-4 py-2 mt-2"
						>
							Remove
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Watchlist;
