import axios from "axios";

const api = axios.create({
	baseURL: "https://api.themoviedb.org/3/",
	params: {
		api_key:"d29cac1bca9c0f85b125344cfb88b35d",
		language:"en-US"
	}
})

const imdbApi = axios.create({
	baseURL: "https://imdb-api.com/en/API/"
})

export const moviesApi = {
	nowPlaying: () => api.get("movie/now_playing"),
	popular: () => api.get("movie/popular"),
	upcoming: () => api.get("movie/upcoming"),
	movieDetail: id => api.get(`movie/${id}`, {
		params: {
			append_to_response:"vidoes"
		}
	}),
	search: term => api.get("search/movie", {
		params:{
			query:encodeURIComponent(term)
		}
	}),
	getVideo: id => api.get(`movie/${id}/videos`),
	getCollection : id => api.get(`collection/${id}`)
}

export const tvApi = {
	airingToday: () => api.get("tv/airing_today"),
	topRated: () => api.get("tv/top_rated"),
	popular: () => api.get("tv/popular"),
	showDetail: id => api.get(`tv/${id}`, {
		params: {
			append_to_response:"vidoes"
		}
	}),
	search: term => api.get("search/tv", {
		params:{
			query:encodeURIComponent(term)
		}
	}),
	getVideo: id => api.get(`tv/${id}/videos`),
	getShowImdb: name => imdbApi.get(`SearchSeries/k_t8gyhsm7/${name}`)
}

