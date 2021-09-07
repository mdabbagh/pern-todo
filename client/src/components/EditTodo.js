import React, { Fragment, useState } from "react";
import { FormControl, TextField, Container, Button } from "@material-ui/core";
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
      <Container>
        <h2>Edit Todo</h2>
        <FormControl>
          <TextField
            required
            id="description"
            style={{ marginBottom: 8 }}
            label="Enter description"
            variant="outlined"
            autoComplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => updateDescription(e)}
          >
            Save
          </Button>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Close
          </Button>
        </FormControl>
      </Container>
    </Fragment>
  );
};

EditTodo.propTypes = {
  todo: PropTypes.any,
  handleClose: PropTypes.any,
};

export default EditTodo;
