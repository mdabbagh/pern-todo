import React, { Fragment, useState, useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import env from "react-dotenv";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

import inMemoryJWT from "../token";

const baseUrl = `${env.API_URL}/auth/login`;

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

      await inMemoryJWT.setToken(response.data.token);

      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(localStorage.getItem("user"));
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        direction="row"
      >
        <Grid item md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <h1>Login</h1>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Email"
                fullWidth
                id="email"
                variant="outlined"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="password"
                label="Password"
                fullWidth
                required
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
                fullWidth
                color="primary"
                style={{ height: "100%" }}
                onClick={(e) => onSubmitForm(e)}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12}>
              Need an account? <Link to="/register">Register</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Fragment>
  );
};

export default Login;
