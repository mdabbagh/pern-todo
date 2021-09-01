import React, { Fragment, useState } from "react";
import { FormControl, Input, InputLabel, FormHelperText, Button } from '@material-ui/core';
import axios from 'axios';

const InputTodo = () => {
  const [description, setDescription] = useState("");
  const baseUrl = "http://localhost:5000/todos";
  const api = axios.create({ baseUrl, proxy: false });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description }; // TODO: Look into why not working
      const response = await api.post(baseUrl, {
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
      <FormControl>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Input id="description" aria-describedby="my-helper-text" value={description} onChange={e => setDescription(e.target.value)} />
        <FormHelperText id="description-helper-text">Enter a description.</FormHelperText>
        <Button variant="contained" color="primary" onClick={onSubmitForm}>
          Add
        </Button>
      </FormControl>
    </Fragment>
  )
}

export default InputTodo;