import React, { Fragment, useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import env from "react-dotenv";

const baseUrl = `${env.API_URL}/users/register`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const api = axios.create({ baseUrl });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      console.log("In submit form");
      const body = { firstname, lastname, email, password, confirmPassword };
      if (password != confirmPassword) {
        console.log("In if");
        setErrors(errors.push("Password and confirm password should match."));
        console.log(errors[0]);
        window.location = "/register";
      } else {
        await api.post(baseUrl, {
          firstname: body.firstname,
          lastname: body.lastname,
          email: body.email,
          password: body.password,
        });
        window.location = "/";
      }
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
          <h1>Add Todo</h1>
        </Grid>
        <Grid item xs={2}>
          <TextField
            required
            label="Firstname"
            id="firstname"
            variant="outlined"
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            required
            label="Lastname"
            id="lastname"
            variant="outlined"
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
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
        <Grid item xs={2}>
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ height: "100%" }}
            onClick={(e) => onSubmitForm(e)}
          >
            Register
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Register;
