import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ListTodos from "./components/ListTodos";
import Register from "./components/Register";
import Login from "./components/Login";

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
    <Router>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Switch>
            <Route path="/register">
              <Grid item xs={12}>
                <Register />
              </Grid>
            </Route>
            <Route path="/login">
              <Grid item xs={12}>
                <Login />
              </Grid>
            </Route>
            <Route path="/">
              <Grid item xs={12}>
                <ListTodos />
              </Grid>
            </Route>
          </Switch>
        </Grid>
      </div>
    </Router>
  );
}

export default App;
