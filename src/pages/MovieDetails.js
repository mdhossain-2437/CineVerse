// Movie Details Page (src/pages/MovieDetails.js)
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdbApi";
import {
	addToWatchlist,
	removeFromWatchlist,
	getWatchlist,
} from "../api/firestore";

function MovieDetails() {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [watchlist, setWatchlist] = useState([]);

	useEffect(() => {
		const getMovie = async () => {
			const data = await fetchMovieDetails(id);
			setMovie(data);
		};
		getMovie();
		fetchMovieDetails(id).then(setMovie);
		getWatchlist().then(setWatchlist);
	}, [id]);

	const isInWatchlist = watchlist.some((item) => item.id === movie?.id);

	const handleWatchlist = async () => {
		if (isInWatchlist) {
			await removeFromWatchlist(movie);
		} else {
			await addToWatchlist(movie);
		}
		setWatchlist(await getWatchlist());
	};

	if (!movie)
		return <div className="text-white text-center p-10">Loading...</div>;

	return (
		<div className="bg-gray-900 text-white min-h-screen p-8">
			{movie && (
				<>
					<h1 className="text-3xl font-bold">{movie.title}</h1>
					<button
						onClick={handleWatchlist}
						className="bg-red-600 px-4 py-2 mt-4"
					>
						{isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
					</button>
				</>
			)}
			<div className="flex flex-col md:flex-row gap-8">
				<img
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
					className="w-80 rounded-lg"
				/>
				<div>
					<h1 className="text-4xl font-bold">{movie.title}</h1>
					<p className="mt-4">{movie.overview}</p>
					<p className="mt-2 text-yellow-400 text-lg">
						⭐ {movie.vote_average}/10
					</p>
					<h3 className="mt-4 text-xl font-semibold">Cast:</h3>
					<div className="flex gap-4 overflow-x-auto">
						{movie.credits?.cast.slice(0, 5).map((actor) => (
							<div key={actor.id} className="text-center">
								<img
									src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
									alt={actor.name}
									className="w-20 h-20 rounded-full"
								/>
								<p>{actor.name}</p>
							</div>
						))}
					</div>
					{movie.videos?.results.length > 0 && (
						<div className="mt-6">
							<h3 className="text-xl font-semibold">Trailer:</h3>
							<iframe
								className="w-full md:w-3/4 h-64 mt-2"
								src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
								title="Movie Trailer"
								frameBorder="0"
								allowFullScreen
							></iframe>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default MovieDetails;
