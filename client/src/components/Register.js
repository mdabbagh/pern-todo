import React, { Fragment, useState, useContext } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import axios from "axios";
import env from "react-dotenv";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

const baseUrl = `${env.API_URL}/users/register`;

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const { setUser } = useContext(UserContext);

  const api = axios.create({ baseUrl });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, email, password, confirmPassword };

      // Post to register, objects in response: user, token, success, and expiresIn
      const response = await api.post(baseUrl, {
        firstname: body.firstname,
        lastname: body.lastname,
        email: body.email,
        password: body.password,
      });
      // Set localStorage token to use in axios interceptor
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user.user_id);
      // Redirect to home page
      history.push("/");
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
        <Grid item xs={12}>
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
