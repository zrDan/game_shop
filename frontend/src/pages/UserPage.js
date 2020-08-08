import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import GoBack from "../components/GoBack";
import { getUser, logout } from "../api/apiCore";
import "./styles/userpage.css";

function UserPage() {
  let history = useHistory();
  const [userValues, setValues] = useState({
    name: "",
    email: "",
    payment: "",
    direction: "",
    error: "",
  });

  const { name, email, payment, direction, error } = userValues;

  const findUser = () => {
    getUser().then((userData) => {
      if (userData.error) {
        setValues({ ...userValues, error: userData.error });
      } else {
        let data = userData.data[0];
        let payment = data.payment.toString();

        setValues({
          ...userValues,
          name: data.name,
          email: data.email,
          payment: payment.slice(payment.length - 4),
          direction: data.direction,
        });
      }
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="container">
      <GoBack />
      <div className="user_container">
        <div className="user_name">
          <div className="user_avatar">
            <img src="/icons/icon_username.png" alt="user" />
          </div>
          <div>
            <p>{name}</p>
          </div>
        </div>
        <div className="user_info">
          <div>
            <h2>Direction</h2>
            <p>{direction}</p>
          </div>
          <div>
            <h2>Email</h2>
            <p>{email}</p>
          </div>
          <div>
            <h2>Payment Method</h2>
            <p>**** - **** - **** - {payment}</p>
          </div>
          <div>
            <button onClick={handleClick}>Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
