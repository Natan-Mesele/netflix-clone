import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

function MovieDetail() {
  const location = useLocation();
  const movie = location.state?.movie;
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    if (movie) {
      // Automatically search for the movie trailer when the component loads
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log("Trailer not found", error));
    }
  }, [movie]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  if (!movie) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl text-gray-300">Movie details not available.</p>
      </div>
    );
  }

  return (
    <div className="movie-detail max-w-screen-xl mx-auto py-8 px-4 text-white">
      {/* Display Trailer if available at the top */}
      {trailerUrl && (
        <div className="youtube-container my-8 max-w-4xl mx-auto">
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}

      {/* Movie Title */}
      <h1 className="text-4xl font-bold mb-8 text-center">{movie.title || movie.name}</h1>
      
      {/* Flex container for Movie Details and Poster */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Movie Poster */}
        {movie.poster_path && (
          <div className="flex-shrink-0">
            <img
              className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105 w-48 h-72 md:w-64 md:h-96"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </div>
        )}

        {/* Movie Details */}
        <div className="flex-grow">
          <p className="text-lg text-gray-300 mb-6 leading-relaxed">
            {movie.overview}
          </p>

          {/* Additional Info */}
          <div className="text-gray-400">
            <p>
              <span className="font-semibold text-white">Release Date:</span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="font-semibold text-white">Language:</span>{" "}
              {movie.original_language}
            </p>
            <p>
              <span className="font-semibold text-white">Rating:</span>{" "}
              {movie.vote_average} / 10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
