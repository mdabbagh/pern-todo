import React, { Fragment, useState, useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import env from "react-dotenv";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

const baseUrl = `${env.API_URL}/users/login`;

const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserContext);

  const api = axios.create({ baseUrl });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await api.post(baseUrl, {
        email: body.email,
        password: body.password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(localStorage.getItem("user"));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Login</h1>
        </Grid>
        <Grid item xs={2}>
          <TextField
            required
            label="email"
            id="email"
            variant="outlined"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ height: "100%" }}
            onClick={(e) => onSubmitForm(e)}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
