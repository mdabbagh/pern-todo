import React, { Fragment, useState } from "react";
import { FormControl, TextField, Container, Button } from "@material-ui/core";
import axios from 'axios';

const EditTodo = ({...props}) => {
  const [description, setDescription] = useState(props.todo.description);
  const baseUrl = "http://localhost:5000/todos";
  const api = axios.create({ baseUrl, proxy: false });

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      await api.put(`${baseUrl}/${props.todo.todo_id}`, {
        description: body.description
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <Container>
        <h2>Edit Todo</h2>
        <FormControl>
          <TextField required id="description" style={{ marginBottom: 8 }} label="Enter description" variant="outlined" autoComplete="off" value={description} onChange={e => setDescription(e.target.value)} />
          <Button variant="contained" color="primary" onClick={(e) => updateDescription(e)}>Save</Button>
          <Button variant="contained" color="secondary" onClick={props.handleClose}>Close</Button>
        </FormControl>
      </Container>
    </Fragment>
  )
}

export default EditTodo;