import React, { Fragment, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";

import { createTodo } from "../services/todoService";
import Error from "./Error";

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const response = await createTodo(description);
      if (response.status == 200) {
        window.location.reload();
      } else {
        setError(response.data);
      }
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Fragment>
      <Grid container justifyContent="center" spacing={0}>
        <Grid item xs={12}>
          <h1>Add Todo</h1>
        </Grid>
        <Grid item xs={12}>
          {error && <Error error={error} />}
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={onSubmitForm}>
            <Grid container spacing={2}>
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
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ height: "100%" }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default InputTodo;
