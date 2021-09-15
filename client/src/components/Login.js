import React, { Fragment, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import env from "react-dotenv";

const baseUrl = `${env.API_URL}/users/login`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const api = axios.create({ baseUrl });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("In submit form");
      const body = { email, password };

      await api.post(baseUrl, {
        email: body.email,
        password: body.password,
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
      setErrors(errors.push("Something went wrong. Please try again."));
    }
  };

  return (
    <Fragment>
      {errors.length > 0 &&
        errors.forEach(
          (error) =>
            function () {
              <div>{error}</div>;
            }
        )}
      <Grid container spacing={2}>
        <Grid item xs={12} justifyContent="center">
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
