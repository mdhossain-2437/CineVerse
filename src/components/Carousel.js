// Carousel Component (src/components/Carousel.js)
import React, { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../api/tmdbApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const data = await fetchTrendingMovies();
			setMovies(data);
		};
		getMovies();
	}, []);

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		slidesToScroll: 2,
		autoplay: true,
		autoplaySpeed: 3000,
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
			<Slider {...settings}>
				{movies.map((movie) => (
					<div key={movie.id} className="p-2">
						<img
							src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
							alt={movie.title}
							className="rounded-lg"
						/>
					</div>
				))}
			</Slider>
		</div>
	);
}

export default Carousel;
