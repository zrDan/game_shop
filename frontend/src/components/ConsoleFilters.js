import React from "react";
import { Link } from "react-router-dom";

function ConsoleFilters() {
  return (
    <>
      <Link to="/console/Xbox One">
        <img className="filter_icon" src="/icons/icon_xbox.svg" alt="console" />
      </Link>
      <Link to="/console/PS4">
        <img
          className="filter_icon icon_center"
          src="/icons/icon_playstation.svg"
          alt="console"
        />
      </Link>
      <Link to="/console/Nintendo Switch">
        <img
          className="filter_icon"
          src="/icons/icon_nintendo.png"
          alt="console"
        />
      </Link>
    </>
  );
}

export default ConsoleFilters;
