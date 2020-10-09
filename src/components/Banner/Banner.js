import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import requests from "../../axios/requests";
import "./Banner.css";

const Banner = () => {
  // states :
  const [randomPreview, setrandomPreview] = useState([]);

  // Hooks :

  useEffect(() => {
    // effect
    const fetchData = async () => {
      const res = await axios.get(requests.fetchNetflixOriginals);
      setrandomPreview(
        res.data.results[
          Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
    };
    fetchData();
  }, []);

  //  helper function  :
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("http://image.tmdb.org/t/p/original${randomPreview.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {randomPreview?.title ||
            randomPreview?.name ||
            randomPreview?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(randomPreview?.overview, 155)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
