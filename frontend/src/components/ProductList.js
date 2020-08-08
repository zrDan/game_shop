import React, { useEffect, useState } from "react";
import { getShoppingCart, removeCartItem } from "../api/apiCore";
import ShowImage from "../components/ShowImage";
import "./styles/productlist.css";

function ProductList() {
  const [status, setStatus] = useState({
    error: "",
    loading: false,
  });

  const [values, setValues] = useState([]);

  var Money = 0;
  var total = 0;
  const { error, loading } = status;

  const getShopItems = () => {
    getShoppingCart().then((data) => {
      if (data.error) {
        setStatus({ error: data.error, loading: false });
      } else {
        setValues(data.data[0].inventory);
      }
    });
  };

  if (values.length > 0) {
    for (let i = 0; i < values.length; i++) {
      Money += values[i].price;
    }
    total = Money.toFixed(2);
  }

  const deleteItem = (id) => (event) => {
    event.preventDefault();
    removeCartItem(id);
    window.location.reload();
  };

  useEffect(() => {
    getShopItems();
  }, []);

  const showError = () => <h1>{error}</h1>;

  const showLoading = () => loading && <h1>Loading...</h1>;

  const isEmpty = () => {
    if (values.length < 1) {
      return <h1>Empty Cart</h1>;
    } else {
      return tableView();
    }
  };

  const tableView = () => (
    <table className="animate__animated animate__zoomIn">
      <thead>
        <tr>
          <td colSpan="4">Shopping Cart</td>
        </tr>
      </thead>
      <tbody>
        {values.map((videogame, i) => (
          <tr key={i}>
            <td>
              <ShowImage item={videogame.id} url="videogame" />
            </td>
            <td>{videogame.game}</td>
            <td>$ {videogame.price}</td>
            <td className="delete">
              <p onClick={deleteItem(videogame.id)}>X</p>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="3">Total</td>
          <td>${total}</td>
        </tr>
      </tfoot>
    </table>
  );

  return (
    <>
      {showError()}
      {showLoading()}
      {isEmpty()}
    </>
  );
}

export default ProductList;
