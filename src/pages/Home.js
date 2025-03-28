// Home Page (src/pages/Home.js)
import React from "react";
import Banner from "../components/Banner";
import Carousel from "../components/Carousel";

import Movies from "..pages/Movies";
import Series from "..pages/Series";

function Home() {
	return (
		<div className="bg-gray-900 text-white min-h-screen">
      <Banner />
       <Carousel />
			<div className="p-4">
				<h2 className="text-2xl font-bold mb-4">Trending Movies</h2>
				<Movies />
				<h2 className="text-2xl font-bold mt-8 mb-4">Trending TV Series</h2>
				<Series />
			</div>
		</div>
	);
}

export default Home;

