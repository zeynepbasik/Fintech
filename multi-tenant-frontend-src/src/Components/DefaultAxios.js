import axios from "axios";
let token = "";
localStorage.getItem("user")
  ? (token = JSON.parse(localStorage.getItem("user")).access_token)
  : (token = "");

export const authorization = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { Authorization: "Bearer " + token },
});
