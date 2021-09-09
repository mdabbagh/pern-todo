import React, { Fragment } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 10,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <InputTodo />
          </Grid>
          <Grid item xs={12}>
            <ListTodos />
          </Grid>
        </Grid>
      </div>
    </Fragment>
  );
}

export default App;
