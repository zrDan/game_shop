import React from "react";
import ShowImage from "../components/ShowImage";
import { Link } from "react-router-dom";
import "./styles/cards.css";

function Cards({ videogame }) {
  return (
    <div className="card animate__animated animate__fadeInUp">
      <div className="cover">
        <ShowImage item={videogame._id} url="videogame" />
      </div>
      <div className="card_info">
        <div className="title">
          <p>{videogame.name}</p>
        </div>
        <div className="price">
          <p>${videogame.price}</p>
        </div>
      </div>
      <div className="more_button">
        <Link to={`/videogame/${videogame._id}`} className="button">
          MORE
        </Link>
      </div>
    </div>
  );
}

export default Cards;
