import React from "react";
import NavBar from "./NavBar";

function Layout(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}

export default Layout;
