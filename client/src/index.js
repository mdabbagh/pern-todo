import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/roboto";
import axios from "axios";
import jsonwebtoken from "jsonwebtoken";

axios.interceptors.request.use(
  function (config) {
    console.log("Running interceptor");
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      error.response.status === 500 ||
      error.response.status === 403 ||
      error.response.status === 401
    ) {
      const originalRequest = error.config;
      let token = localStorage.getItem("token");
      if (token) {
        console.log("IN response interceptor");
        // If refresh token is expired, don't retry request and go to login
        let exp = jsonwebtoken.decode(token.split(" ")[1]).exp;
        if (Date.now() >= exp * 1000) {
          localStorage.clear();
          originalRequest._retry = false;
          window.location.href = "/login";
        }
        // Try to get a new access token with the existing non-expired refresh token
        //originalRequest._retry = true;
      }
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
