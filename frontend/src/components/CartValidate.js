import React from "react";
import { Redirect } from "react-router-dom";
import { isAuthenticated } from "../api/apiCore";

function CartValidate() {
  const redirectUser = () => {
    if (isAuthenticated()) {
      return <Redirect to="/shoppingCart" />;
    } else {
      return <Redirect to="/user" />;
    }
  };

  return <>{redirectUser()}</>;
}

export default CartValidate;
