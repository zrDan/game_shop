import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import GamesByCategory from "../pages/GamesByCategory";
import UserPage from "../pages/UserPage";
import Layout from "./Layout";
import CartValidate from "./CartValidate";
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import GameDetails from "../pages/GameDetails";
import ShoppingCart from "../pages/ShoppingCart";
import "./styles/app.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/user" component={LogIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/user/profile" component={UserPage} />
        <Route exact path="/videogame/:videogameId" component={GameDetails} />
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/console/:consoleName"
              component={GamesByCategory}
            />
            <Route exact path="/cartValidate" component={CartValidate} />
            <Route exact path="/shoppingCart" component={ShoppingCart} />
          </Switch>
        </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
