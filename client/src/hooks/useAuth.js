import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import env from "react-dotenv";
import { UserContext } from "../UserContext";
import http from "../http";
import inMemoryJWT from "../token";

export default function useAuth() {
  let history = useHistory();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const baseUrl = `${env.API_URL}`;

  const registerUser = async (data) => {
    const { email, password, confirmPassword } = data;
    try {
      const response = await http.post(`${baseUrl}/auth/register`, {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
      if (response.status == 200) {
        await inMemoryJWT.setToken(response.data.token).then(() => {
          setUser(response.data.user);
          history.push("/");
        });
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await http.post(`${baseUrl}/auth/login`, {
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
      const response = await http.get(`${baseUrl}/auth/logout`);
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
