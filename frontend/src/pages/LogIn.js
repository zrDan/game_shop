import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, isAuthenticated, autheticate } from "../api/apiCore";
import GoBack from "../components/GoBack";
import "./styles/form.css";

function LogIn() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    redirectToReferrer: false,
  });

  const { email, password, error, loading, redirectToReferrer } = values;
  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    login({ email, password }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        autheticate(data.data, () => {
          setValues({ ...values, redirectToReferrer: true });
        });
      }
    });
  };

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin" />;
      } else {
        return <Redirect to="/" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/user/profile" />;
    }
  };

  const loginForm = () => (
    <div className="form_container">
      <div className="header">
        <img src="/icons/icon_brand.svg" alt="brand" />
        <p>Log In</p>
      </div>
      <div className="form_content">
        <form className="form">
          <div className="form_group">
            <input
              onChange={handleChange("email")}
              type="text"
              name="email"
              placeholder="Email"
            />
          </div>
          <div className="form_group">
            <input
              onChange={handleChange("password")}
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>
          <button onClick={clickSubmit}>Accept</button>
        </form>
      </div>
      <div className="signup_option">
        <Link to="/signup">Create an Accout</Link>
      </div>
    </div>
  );

  const showError = () => <h1>{error}</h1>;

  const showLoading = () => loading && <h2>Loading...</h2>;

  return (
    <div className="container">
      <GoBack />
      {showError()}
      {showLoading()}
      {loginForm()}
      {redirectUser()}
    </div>
  );
}

export default LogIn;
