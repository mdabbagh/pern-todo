import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import env from "react-dotenv";

import http from "../services/http";
import inMemoryJWT from "../token";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const baseUrl = `${env.API_URL}/auth`;

  const registerUser = async (firstname, lastname, email, password) => {
    try {
      const response = await http.post(`${baseUrl}/register`, {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      });
      if (response.status == 201) {
        await inMemoryJWT.setToken(response.data.token);
        setUser(response.data.user);
        history.push("/");
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await http.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });
      if (response.status == 200) {
        await inMemoryJWT.setToken(response.data.token);
        setUser(response.data.user);
        history.push("/");
      }
    } catch (err) {
      setError(err);
    }
  };

  const logoutUser = async () => {
    try {
      const response = await http.get(`${baseUrl}/logout`);
      if (response.status == 200) {
        await inMemoryJWT.deleteToken();
        setUser(null);
        history.push("/login");
      }
    } catch (err) {
      setError(err);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    error,
  };
}
