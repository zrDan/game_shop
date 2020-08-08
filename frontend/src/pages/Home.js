import React, { useState, useEffect } from "react";
import { getVideogames } from "../api/apiCore";
import Cards from "../components/Cards";
import "./styles/home.css";

function Home() {
  const [videogames, setVideogames] = useState([]);
  const [status, setStatus] = useState({
    loading: false,
    error: "",
  });

  const { loading, error } = status;

  const LoadVideogames = () => {
    setStatus({ ...status, loading: true });

    getVideogames().then((game) => {
      if (game.error) {
        setStatus({ error: game.error, loading: false });
      } else {
        setVideogames(game.data);
        setStatus({ ...status, loading: false });
      }
    });
  };

  useEffect(() => {
    LoadVideogames();
  }, []);

  const showError = () => <h1>{error}</h1>;

  const showLoading = () => loading && <h2>Loading...</h2>;

  const homeView = () => (
    <div className="home_container">
      {videogames.map((videogame, i) => (
        <Cards videogame={videogame} key={i} />
      ))}
    </div>
  );

  return (
    <>
      {showError()}
      {showLoading()}
      {homeView()}
    </>
  );
}

export default Home;
