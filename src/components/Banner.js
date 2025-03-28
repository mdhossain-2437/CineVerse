// Banner Component (src/components/Banner.js)
import React, { useEffect, useState } from "react";
import { fetchBannerMovie } from "../api/tmdbApi";

function Banner() {
	const [banner, setBanner] = useState(null);

	useEffect(() => {
		const getBanner = async () => {
			const movie = await fetchBannerMovie();
			setBanner(movie);
		};
		getBanner();
	}, []);

	return (
		banner && (
			<div
				className="w-full h-[500px] bg-cover bg-center text-white flex flex-col justify-center p-8"
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original${banner.backdrop_path})`,
				}}
			>
				<h1 className="text-4xl font-bold">{banner.title}</h1>
				<p className="mt-2 w-1/2">{banner.overview}</p>
				<button className="mt-4 bg-red-600 px-6 py-2 text-lg rounded-lg">
					Watch Now
				</button>
			</div>
		)
	);
}

export default Banner;
