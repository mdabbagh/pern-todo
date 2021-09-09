import React, { Fragment, useState } from "react";
import { FormControl, TextField, Button, Grid } from "@material-ui/core";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const baseUrl = "http://localhost:5000/todos";
  const api = axios.create({ baseUrl, proxy: false });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      await api.post(baseUrl, {
        description: body.description,
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12} justifyContent="center">
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
