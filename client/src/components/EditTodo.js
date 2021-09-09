import React, { Fragment, useState } from "react";
import { TextField, Button, Grid } from "@material-ui/core";
import axios from "axios";
import PropTypes from "prop-types";

const EditTodo = ({ todo, handleClose }) => {
  const [description, setDescription] = useState(todo.description);
  const baseUrl = "http://localhost:5000/todos";
  const api = axios.create({ baseUrl, proxy: false });

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      await api.put(`${baseUrl}/${todo.todo_id}`, {
        description: body.description,
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <h2>Edit Todo</h2>
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="description"
            style={{ marginBottom: 8 }}
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
            variant="contained"
            color="primary"
            fullWidth
            onClick={(e) => updateDescription(e)}
          >
            Save
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleClose}
          >
            Close
          </Button>
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
