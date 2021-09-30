import axios from "axios";
import env from "react-dotenv";

const baseUrl = `${env.API_URL}/auth/refresh_token`;

const inMemoryJWTManager = () => {
  let inMemoryJWT = null;

  // This listener allows to disconnect another session of react-admin started in another tab
  window.addEventListener("storage", (event) => {
    if (event.key === "ra-logout") {
      inMemoryJWT = null;
    }
  });

  // The method makes a call to the refresh-token endpoint
  // If there is a valid cookie, the endpoint will return a fresh jwt.
  const refreshToken = async () => {
    try {
      const response = await axios.get(baseUrl, { withCredentials: true });
      if (response.status !== 200) {
        deleteToken();

        return false;
      } else {
        setToken(response.data.token);
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getToken = async () => inMemoryJWT;

  const setToken = async (token) => {
    inMemoryJWT = token;
  };

  const deleteToken = async () => {
    inMemoryJWT = null;
    window.localStorage.setItem("ra-logout", Date.now());
  };

  return {
    refreshToken,
    deleteToken,
    getToken,
    setToken,
  };
};

export default inMemoryJWTManager();
