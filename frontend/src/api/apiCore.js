import { API } from "../config";
import axios from "axios";

export function getVideogames() {
  return axios
    .get(`${API}/videogame/videogames`)
    .then((response) => response)
    .catch((err) => console.log(err));
}

export function getVideogamesByCategory(consoleName) {
  return axios
    .get(`${API}/videogame/category/${consoleName}`)
    .then((response) => response)
    .catch((err) => console.log(err));
}

export function getVideogameDetails(videogameId) {
  return axios
    .get(`${API}/videogame/videogameDetails/${videogameId}`)
    .then((response) => response)
    .catch((err) => console.log(`Error ${err}`));
}

export function getUser() {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const userMail = { email: token.user.email };
  return axios
    .post(`${API}/auth/user`, userMail)
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function signup(user) {
  return axios
    .post(`${API}/auth/signup`, user)
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function login(user) {
  return axios
    .post(`${API}/auth/login`, user)
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function autheticate(data, next) {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
}

export function isAuthenticated() {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
}

export function logout() {
  localStorage.clear();
}

export function getShoppingCart() {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const userMail = token.user.email;

  return axios
    .get(`${API}/auth/cart/${userMail}`)
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function addCartItem(name, price, id) {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const userMail = token.user.email;

  return axios
    .patch(`${API}/auth/addItem`, {
      email: userMail,
      id: id,
      game: name,
      price: price,
    })
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function removeCartItem(id) {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const userMail = token.user.email;

  return axios
    .patch(`${API}/auth/removeItem`, { email: userMail, id: id })
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}

export function clearCart() {
  const token = JSON.parse(localStorage.getItem("jwt"));
  const userMail = token.user.email;

  return axios
    .patch(`${API}/auth/clearCart/${userMail}`)
    .then((response) => response)
    .catch((err) => console.log(`Error: ${err}`));
}
