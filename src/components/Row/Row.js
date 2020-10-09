import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../../axios/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  // States  :
  const [movies, setmovies] = useState([]);
  const [TrailerUrl, setTrailerUrl] = useState("");

  const base_url = "http://image.tmdb.org/t/p/original";

  // react Hooks :
  useEffect(() => {
    // fetch URL :
    const fetchData = async () => {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      return request;
    };
    fetchData();
  }, [fetchUrl]);

  //  Helpers :
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (TrailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch(console.error);
    }
  };

  // Row Component Return :
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`row__poster 
               ${isLargeRow ? "row__poster-Large" : ""}`}
              src={` 
              ${base_url}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
              onClick={() => {
                handleClick(movie);
              }}
            />
          );
        })}
      </div>
      <div className="youtube-box">
        {TrailerUrl && <YouTube videoId={`${TrailerUrl}`} opts={opts} />}
      </div>
    </div>
  );
};

export default Row;
