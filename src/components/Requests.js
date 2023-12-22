const APIKEY = "8b3c8eb7ab57e1f1b000d4886802f6b3";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${APIKEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${APIKEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${APIKEY}&language=en-US`,
  fetchTopActionMovies: `/discover/movie?api_key=${APIKEY}&with_geners=28`,
  fetchTopComedyMovies: `/discover/movie?api_key=${APIKEY}&with_geners=35`,
  fetchTopHorrorMovies: `/discover/movie?api_key=${APIKEY}&with_geners=27`,
  fetchTopRomanceMovies: `/discover/movie?api_key=${APIKEY}&with_geners=10749`,
  fetchTopDocumentaries: `/discover/movie?api_key=${APIKEY}&with_geners=99`,
};

export default requests