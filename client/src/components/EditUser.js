import React, { Fragment, useState, useContext } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { UserContext } from "../UserContext";
import { updateUser } from "../services/userService";

const EditUser = () => {
  const history = useHistory();
  const { user, setUser } = useContext(UserContext);

  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { firstname, lastname, password, confirmPassword };
      const userId = user.user_id;
      const updatedUser = await updateUser(body, userId);
      setUser(updatedUser.data);
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
