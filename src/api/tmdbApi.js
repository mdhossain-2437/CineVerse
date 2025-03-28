// API Integration (src/api/tmdbApi.js)
import axios from "axios";

const API_KEY = "7cb1b8784b19f4c938ee5760e7aa3f27";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
		);
		return response.data.results;
	} catch (error) {
		console.error("Error fetching trending movies:", error);
		return [];
	}
};

export const fetchTrendingSeries = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`
		);
		return response.data.results;
	} catch (error) {
		console.error("Error fetching trending series:", error);
		return [];
	}
};

export const fetchBannerMovie = async () => {
	try {
		const response = await axios.get(
			`${BASE_URL}/movie/popular?api_key=${API_KEY}`
		);
		return response.data.results[0];
	} catch (error) {
		console.error("Error fetching banner movie:", error);
		return null;
	}
};

export const fetchMovieDetails = async (id) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching movie details:", error);
		return null;
	}
};

export const searchMovies = async (query) => {
	try {
		const response = await axios.get(
			`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
		);
		return response.data.results;
	} catch (error) {
		console.error("Error searching movies:", error);
		return [];
	}
};
