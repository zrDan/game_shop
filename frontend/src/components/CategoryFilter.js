import React, { useState, useEffect } from "react";
import { getVideogamesByCategory } from "../api/apiCore";
import Cards from "./Cards";

function CategoryFilter({ consoleName }) {
  const [categoryData, setCategoryData] = useState([]);
  const [videogames, setVideogames] = useState([]);
  const [status, setStatus] = useState({
    error: "",
    loading: false,
  });

  const { error, loading } = status;

  function loadVideogames(category) {
    setStatus({ ...status, loading: true });
    getVideogamesByCategory(category).then((game) => {
      if (game.error) {
        setStatus({ error: game.error, loading: false });
      } else {
        setVideogames(game.data);
        setStatus({ ...status, loading: false });
      }
    });
  }

  if (categoryData !== consoleName) {
    loadVideogames(consoleName);
    setCategoryData(consoleName);
  }

  useEffect(() => {
    setCategoryData(consoleName);
  }, []);

  const showError = () => <h1>{error}</h1>;

  const showLoading = () => loading && <h2>Loading...</h2>;

  const cardView = () => (
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
      {cardView()}
    </>
  );
}

export default CategoryFilter;
