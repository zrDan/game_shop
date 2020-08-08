import React from "react";
import ProductList from "../components/ProductList";
import { clearCart } from "../api/apiCore";
import "./styles/shopping.css";

function ShoppingCart() {
  const handleClick = (event) => {
    event.preventDefault();
    clearCart();
    window.location.reload();
  };

  return (
    <div className="cart_container">
      <div className="cart_content">
        <ProductList />
        <button onClick={handleClick}>Buy</button>
      </div>
    </div>
  );
}

export default ShoppingCart;
