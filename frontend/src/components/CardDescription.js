import React from "react";
import { useHistory, Redirect } from "react-router-dom";
import ShowImage from "../components/ShowImage";
import { addCartItem, isAuthenticated } from "../api/apiCore";
import "./styles/carddescription.css";

function CardDescription({ videogame }) {
  let history = useHistory();

  const handleClick = (event) => {
    event.preventDefault();

    if (isAuthenticated()) {
      addCartItem(videogame.name, videogame.price, videogame._id);
      alert("Game Added Succesfuly");
      history.push("/");
    } else {
      alert("Login First");
    }
  };

  return (
    <div className="gameDetails_container">
      <div className="details">
        <div className="detail_image">
          <ShowImage item={videogame._id} url="videogame" />
        </div>
        <div className="detail_buy">
          <div className="game_title">
            <p>{videogame.name}</p>
          </div>
          <div className="game_price">
            <p>${videogame.price}</p>
          </div>
          <div className="game_add">
            <button onClick={handleClick}>Add to Cart</button>
          </div>
        </div>
        <div className="detail_description">
          <p className="description_title">Description</p>
          {videogame.description}
        </div>
      </div>
    </div>
  );
}

export default CardDescription;
