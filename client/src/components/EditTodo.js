import React, { Fragment, useState } from "react";
import { TextField, Button, Grid } from "@mui/material";
import PropTypes from "prop-types";

import { updateTodo } from "../services/todoService";
import Error from "./Error";

const EditTodo = ({ todo, handleClose }) => {
  const [description, setDescription] = useState(todo.description);
  const [error, setError] = useState("");

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const response = await updateTodo(description, todo.todo_id);
      if (response.status != 200) {
        setError(response.data);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h3>Edit Todo</h3>
        </Grid>
        <Grid item xs={12}>
          {error && <Error error={error} />}
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={updateDescription}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="description"
                  label="Enter description"
                  variant="outlined"
                  autoComplete="off"
                  fullWidth
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Save
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Fragment>
  );
};

EditTodo.propTypes = {
  todo: PropTypes.any,
  handleClose: PropTypes.any,
};

export default EditTodo;
