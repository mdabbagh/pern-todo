import axios from "axios";
import inMemoryJwt from "./token";

const http = axios.create({
  crossDomain: true,
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use(
  async function (config) {
    if (config.url.includes("users") || config.url.includes("todos")) {
      const token = await inMemoryJwt.getToken();
      if (token) {
        config.headers["Authorization"] = token;
      }
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 500 ||
      error.response.status === 403 ||
      error.response.status === 401
    ) {
      try {
        if (!originalRequest._retry) {
          // Try to get a new access token with the existing refresh token
          originalRequest._retry = true;
          const refreshedToken = await inMemoryJwt.refreshToken();
          if (refreshedToken.success) {
            return http(originalRequest);
          } else {
            originalRequest._retry = false;
            window.location.href = "/login";
            return Promise.reject(error);
          }
        }
      } catch (err) {
        originalRequest._retry = false;
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
