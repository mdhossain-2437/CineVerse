// Series Page (src/pages/Series.js)
import React, { useEffect, useState } from "react";
import { fetchTrendingSeries } from "../api/tmdbApi";

function Series() {
	const [series, setSeries] = useState([]);

	useEffect(() => {
		const getSeries = async () => {
			const data = await fetchTrendingSeries();
			setSeries(data);
		};
		getSeries();
	}, []);

	return (
		<div className="p-4 text-white bg-gray-900 min-h-screen">
			<h1 className="text-2xl font-bold mb-4">Trending TV Series</h1>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
				{series.map((tv) => (
					<div key={tv.id} className="bg-gray-800 p-2 rounded-lg">
						<img
							src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
							alt={tv.name}
							className="w-full rounded-lg"
						/>
						<h2 className="text-lg mt-2">{tv.name}</h2>
						<p className="text-sm">Rating: {tv.vote_average}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Series;
