import React, { Fragment, useState, useEffect, useContext } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import axios from "axios";
import env from "react-dotenv";
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom";

const baseUrl = `${env.API_URL}/users`;

const EditUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    // Get user from API
    // Set the initial values for firstname, lastname to place in the fields
    const getUser = async () => {
      try {
        const userId = JSON.parse(user).user_id;
        const response = await axios.get(`${baseUrl}/${userId}`);
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, password, confirmPassword };
      const userId = JSON.parse(user).user_id;
      await axios.put(`${baseUrl}/${userId}`, {
        firstname: body.firstname,
        lastname: body.lastname,
        password: body.password,
      });
      setPassword("");
      setConfirmPassword("");
      history.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <h1>Update Account</h1>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="firstname"
            label="Firstname"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="lastname"
            label="Lastname"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="password"
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="confirmPassword"
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            autoComplete="off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ height: "100%" }}
            onClick={(e) => onSubmitForm(e)}
          >
            Update
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditUser;
