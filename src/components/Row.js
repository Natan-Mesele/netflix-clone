import React, { useState, useEffect } from "react";
import axios from "../components/axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [visibleIndex, setVisibleIndex] = useState(0); // Track which index is currently visible
  const itemsPerPage = 6; // Number of images visible at a time
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  // Handle movie card click for navigating to MovieDetail page
  const handleClick = (movie) => {
    // Open trailer
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }

    // Navigate to the MovieDetail page
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  // Handle navigation between pages of movies
  const handlePageNavigation = (direction) => {
    const movieCount = movies.length;
    const maxVisibleIndex = Math.ceil(movieCount / itemsPerPage) - 1;

    if (direction === "left" && visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    } else if (direction === "right" && visibleIndex < maxVisibleIndex) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  // Calculate the slice of movies to show based on the visibleIndex
  const visibleMovies = movies.slice(
    visibleIndex * itemsPerPage,
    visibleIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="row py-8 mx-auto max-w-screen-xl relative">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-white text-center">{title}</h2>

      {/* Navigation Arrows */}
      {visibleIndex > 0 && (
        <button
          onClick={() => handlePageNavigation("left")}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-2 rounded-full z-10 hover:bg-opacity-80 focus:outline-none"
          aria-label="Scroll Left"
        >
          &#9664;
        </button>
      )}

      {visibleIndex < Math.ceil(movies.length / itemsPerPage) - 1 && (
        <button
          onClick={() => handlePageNavigation("right")}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-2 rounded-full z-10 hover:bg-opacity-80 focus:outline-none"
          aria-label="Scroll Right"
        >
          &#9654;
        </button>
      )}

      {/* Movie Posters Container */}
      <div className="row_posters flex justify-center space-x-6 mx-auto">
        {visibleMovies.map((movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <div
              key={movie.id}
              className={`relative group ${
                isLargeRow ? "w-40 h-60 md:w-48 md:h-72" : "w-40 h-60 md:w-48 md:h-72"
              }`}
            >
              <img
                onClick={() => handleClick(movie)}
                className={`cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 rounded-lg shadow-md ${
                  isLargeRow ? "w-full h-full" : "w-full h-full"
                }`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
                style={{
                  filter: "brightness(85%) contrast(105%)", // Adjust visibility
                }}
              />
            </div>
          )
        )}
      </div>

      {/* Trailer Section */}
      {trailerUrl && (
        <div className="youtube-container my-6">
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
