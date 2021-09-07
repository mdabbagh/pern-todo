import React, { Fragment, useState } from "react";
import { FormControl, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const baseUrl = "http://localhost:5000/todos";
  const api = axios.create({ baseUrl, proxy: false });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      await api.post(baseUrl, {
        description: body.description
      });
      window.location = "/";
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      <h1>Add Todo</h1>
      <FormControl width={1}>
        <TextField required id="description" style={{ marginBottom: 8 }} label="Enter description" variant="outlined" autoComplete="off" value={description} onChange={e => setDescription(e.target.value)} />
        <Button variant="contained" color="primary" onClick={(e) => onSubmitForm(e)}>Add</Button>
      </FormControl>
    </Fragment>
  )
}

export default InputTodo;