import React, { useState } from "react";
import { Link } from "react-router-dom";
import ConsoleFilters from "./ConsoleFilters";
import "./styles/navbar.css";

function NavBar() {
  const [mobileDisplay, setMobileDispay] = useState("none");

  return (
    <div className="navbar_container">
      <div className="mobile_nav">
        <div className="burger_button">
          <img
            className="burger_icon"
            src="/icons/icon_burger.svg"
            alt="burger"
            onClick={() => setMobileDispay("block")}
          />
        </div>
        <div className="brand">
          <Link to="/">
            <img
              className="icon_brand"
              src="/icons/icon_brand.svg"
              alt="brand"
            />
          </Link>
        </div>
        <div className="desktop_filters">
          <ConsoleFilters />
        </div>
        <div className="nav_icons">
          <Link to="/user">
            <img className="icon" src="/icons/icon_user.png" alt="icon" />
          </Link>
          <Link to="/cartValidate">
            <img className="icon" src="/icons/icon_shopping.svg" alt="icon" />
          </Link>
        </div>
      </div>
      <div className="mobile_filters" style={{ display: mobileDisplay }}>
        <div className="action_mobile_close">
          <p onClick={() => setMobileDispay("none")}>X</p>
        </div>
        <div className="filter_option" onClick={() => setMobileDispay("none")}>
          <ConsoleFilters />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
