import React, { Fragment, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser, error } = useAuth();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
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
            <Grid item xs={12}>
              {error && <Fragment>Error</Fragment>}
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
