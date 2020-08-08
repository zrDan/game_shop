import React from "react";
import { Link } from "react-router-dom";
import "./styles/goback.css";

function GoBack() {
  return (
    <div className="goBack">
      <Link to="/">
        <img src="/icons/icon_arrow.svg" alt="arrow" />
        <h3>Go Back</h3>
      </Link>
    </div>
  );
}

export default GoBack;
