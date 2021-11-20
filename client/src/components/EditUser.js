import React, { Fragment, useState, useContext } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { UserContext } from "../UserContext";
import { updateUser } from "../services/userService";
import Error from "./Error";

const EditUser = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    setError(""); // Clear errors before we try to submit again
    try {
      let body = null;
      if (password === "" && confirmPassword === "") {
        body = { firstname, lastname };
      } else {
        if (password != confirmPassword) {
          setError("Password and confirm password must match.");
          return;
        } else {
          body = { firstname, lastname, password };
        }
      }

      const userId = user.user_id;
      const updatedUser = await updateUser(body, userId);
      setUser(updatedUser.data);

      // Clear password and confirm password fields
      setPassword("");
      setConfirmPassword("");
      history.push("/user");
    } catch (err) {
      console.log(err);
      setError("Something went wrong updating user.");
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <h1>Update Name</h1>
        </Grid>
        <Grid item xs={12}>
          {error && <Error error={error} />}
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
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
              <Grid item xs={12} md={3}>
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
              <Grid item xs={false} md={6} />
              <Grid item xs={12} md={3}>
                <TextField
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
              <Grid item xs={12} md={3}>
                <TextField
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
              <Grid item xs={false} md={6}>
                {" "}
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ height: "100%" }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default EditUser;
