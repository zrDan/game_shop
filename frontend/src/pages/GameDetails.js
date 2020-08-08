import React, { useEffect, useState } from "react";
import { getVideogameDetails } from "../api/apiCore";
import GoBack from "../components/GoBack";
import CardDescription from "../components/CardDescription";
import "./styles/gamedetails.css";

function GameDetails({
  match: {
    params: { videogameId },
  },
}) {
  const [videogames, setVideogames] = useState([]);
  const [err, setError] = useState([]);

  function getVideogame(id) {
    getVideogameDetails(id).then((game) => {
      if (game.error) {
        setError(game.error);
      } else {
        setVideogames([game.data]);
      }
    });
  }

  useEffect(() => {
    getVideogame(videogameId);
  }, []);

  return (
    <div className="details_container">
      <GoBack />
      {videogames.map((videogame, i) => (
        <CardDescription videogame={videogame} key={i} />
      ))}
    </div>
  );
}

export default GameDetails;
