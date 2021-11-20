import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";
import env from "react-dotenv";

import http from "../services/http";
import inMemoryJWT from "../inMemToken";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState();

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
        // Set in mem access token and user context
        await inMemoryJWT.setToken(response.data.token);
        setUser(response.data.user);
        history.push("/");
      } else {
        return response;
      }
    } catch (err) {
      return err.response;
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await http.post(`${baseUrl}/login`, {
        email: email,
        password: password,
      });
      if (response.status == 200) {
        // Set in mem access token and user context
        await inMemoryJWT.setToken(response.data.token);
        setUser(response.data.user);
        history.push("/");
      } else {
        return response;
      }
    } catch (err) {
      return err.response;
    }
  };

  const logoutUser = async () => {
    try {
      const response = await http.get(`${baseUrl}/logout`);
      if (response.status == 200) {
        // Delete in mem access token and nullify the user context
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
