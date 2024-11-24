import React, { useState, useEffect } from "react";
import axios from "../components/axios";
import requests from "../components/Requests";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(string, n) {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  }

  return (
    <header
      className="relative h-[448px] text-white object-contain"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="flex flex-col justify-center px-8 h-full bg-gradient-to-b from-transparent to-black/75">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="space-x-4 mb-4">
          <button className="px-5 py-2 rounded-md bg-gray-900 hover:bg-gray-800 transition duration-300">
            Play
          </button>
          <button className="px-5 py-2 rounded-md bg-gray-900 hover:bg-gray-800 transition duration-300">
            My List
          </button>
        </div>
        <h1 className="w-full md:max-w-lg lg:max-w-xl text-sm md:text-lg lg:text-xl">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-black to-transparent"></div>
    </header>
  );
}

export default Banner;
