import React, { useState } from "react";
import { signup } from "../api/apiCore";
import GoBack from "../components/GoBack";
import "./styles/form.css";
import { useHistory } from "react-router-dom";

function SignUp() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    authpass: "",
    payment: "",
    direction: "",
    error: "",
    success: false,
  });

  let history = useHistory();

  const {
    name,
    email,
    password,
    authpass,
    payment,
    direction,
    error,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if (password !== authpass) {
      alert("The password does not match");
    } else {
      signup({ name, email, password, payment, direction }).then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            authpass: "",
            payment: "",
            direction: "",
            error: "",
            success: true,
          });

          history.push("/");
        }
      });
    }
  };

  return (
    <div className="container">
      <GoBack />
      <div className="form_container">
        <div className="header">
          <img src="/icons/icon_brand.svg" alt="brand" />
          <p>Sign Up</p>
        </div>
        <div className="form_content">
          <form className="form">
            <div className="form_group">
              <input
                onChange={handleChange("name")}
                type="text"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="form_group">
              <input
                onChange={handleChange("email")}
                type="text"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form_group">
              <input
                onChange={handleChange("password")}
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="form_group">
              <input
                onChange={handleChange("authpass")}
                type="password"
                name="authpassword"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="form_group">
              <input
                onChange={handleChange("payment")}
                type="text"
                name="payment"
                placeholder="Card Number"
                minLength="16"
                maxLength="16"
                required
              />
            </div>
            <div className="form_group">
              <input
                onChange={handleChange("direction")}
                type="text"
                name="direction"
                placeholder="Direction"
                required
              />
            </div>
            <button onClick={clickSubmit}>Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
