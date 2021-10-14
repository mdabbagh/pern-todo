import React, { Fragment, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { registerUser, error } = useAuth();

  const onSubmitForm = async (e) => {
    e.preventDefault();
    await registerUser(firstname, lastname, email, password);
  };

  return (
    <Fragment>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item md={4}></Grid>
        <Grid item xs={12} md={4}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item xs={12}>
              <h1>Register</h1>
            </Grid>
            <Grid item xs={12}>
              {error && <Fragment>Error</Fragment>}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Firstname"
                id="firstname"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Lastname"
                id="lastname"
                fullWidth
                variant="outlined"
                autoComplete="off"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Email"
                id="email"
                fullWidth
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
                type="password"
                fullWidth
                required
                variant="outlined"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                required
                autoComplete="off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={(e) => onSubmitForm(e)}
              >
                Register
              </Button>
            </Grid>
            <Grid item xs={12}>
              Already have an account? <Link to="/login">Log in</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Fragment>
  );
};

export default Register;
