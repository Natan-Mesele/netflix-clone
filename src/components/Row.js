import React, { useState, useEffect } from "react";
import axios from "../components/axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import { useNavigate } from "react-router-dom";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false, onSearch }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      setFilteredMovies(request.data.results); // Initialize filteredMovies with all movies
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    // Filter movies when the search term changes
    if (onSearch) {
      const filtered = movies.filter((movie) => {
        const movieTitle = movie.title || movie.name || "";
        return movieTitle.toLowerCase().includes(onSearch.toLowerCase());
      });
      setFilteredMovies(filtered);
    }
  }, [onSearch, movies]); // Re-run the filter effect when search term or movies change

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
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

    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  const handlePageNavigation = (direction) => {
    const movieCount = filteredMovies.length;
    const maxVisibleIndex = Math.ceil(movieCount / itemsPerPage) - 1;

    if (direction === "left" && visibleIndex > 0) {
      setVisibleIndex(visibleIndex - 1);
    } else if (direction === "right" && visibleIndex < maxVisibleIndex) {
      setVisibleIndex(visibleIndex + 1);
    }
  };

  const visibleMovies = filteredMovies.slice(
    visibleIndex * itemsPerPage,
    visibleIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="row py-8 mx-auto max-w-screen-xl relative">
      <h2 className="text-2xl font-bold mb-4 text-white text-center">{title}</h2>

      {visibleIndex > 0 && (
        <button
          onClick={() => handlePageNavigation("left")}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-2 rounded-full z-10 hover:bg-opacity-80 focus:outline-none"
          aria-label="Scroll Left"
        >
          &#9664;
        </button>
      )}

      {visibleIndex < Math.ceil(filteredMovies.length / itemsPerPage) - 1 && (
        <button
          onClick={() => handlePageNavigation("right")}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white px-2 py-2 rounded-full z-10 hover:bg-opacity-80 focus:outline-none"
          aria-label="Scroll Right"
        >
          &#9654;
        </button>
      )}

      <div className="row_posters flex justify-center space-x-6 mx-auto">
        {visibleMovies.map((movie) =>
          ((isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path)) && (
            <div
              key={movie.id}
              className={`relative group ${isLargeRow ? "w-40 h-60 md:w-48 md:h-72" : "w-40 h-60 md:w-48 md:h-72"}`}
            >
              <img
                onClick={() => handleClick(movie)}
                className={`cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 rounded-lg shadow-md`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name}
                style={{
                  filter: "brightness(85%) contrast(105%)",
                }}
              />
            </div>
          )
        )}
      </div>

      {trailerUrl && (
        <div className="youtube-container my-6">
          <Youtube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
