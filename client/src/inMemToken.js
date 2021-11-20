import axios from "axios";
import env from "react-dotenv";

const baseUrl = `${env.API_URL}/auth/refresh_token`;

const inMemoryJWTManager = () => {
  let inMemoryJWT = null;
  const storageKey = "logout";

  // This listener allows us to disconnect another session of the app in another tab on logout
  window.addEventListener("storage", (event) => {
    if (event.key === storageKey) {
      inMemoryJWT = null;
    }
  });

  // Tries to refresh token, and if the cookie is valid, will return a new access token
  const refreshToken = async () => {
    try {
      const response = await axios.get(baseUrl, { withCredentials: true });
      if (response.status !== 200) {
        deleteToken();

        return { success: false };
      } else {
        setToken(response.data.token);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      deleteToken();
      console.log(err);
    }
  };

  const getToken = () => inMemoryJWT;

  const setToken = async (token) => {
    inMemoryJWT = token;
  };

  const deleteToken = async () => {
    inMemoryJWT = null;
    window.localStorage.setItem(storageKey, Date.now());
  };

  return {
    refreshToken,
    deleteToken,
    getToken,
    setToken,
  };
};

export default inMemoryJWTManager();
