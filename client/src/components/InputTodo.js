import React, { Fragment, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import env from "react-dotenv";
import http from "../http";
//import { useHistory } from "react-router-dom";

const baseUrl = `${env.API_URL}/todos`;

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      await http.post(baseUrl, {
        description: body.description,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <h1>Add Todo</h1>
        </Grid>
        <Grid item xs={12} md={9}>
          <TextField
            required
            id="description"
            label="Enter description"
            variant="outlined"
            fullWidth
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            Add
          </Button>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default InputTodo;
