import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { UserContext } from "./UserContext";
import jsonwebtoken from "jsonwebtoken";

import ListTodos from "./components/ListTodos";
import Register from "./components/Register";
import Login from "./components/Login";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make call to BE to get current user based on token which contains sub
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      // Decode token and set user to sub
      const decodedToken = jsonwebtoken.decode(existingToken.split(" ")[1]);
      setUser(decodedToken.sub);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Switch>
              <PublicRoute
                exact
                path="/register"
                component={Register}
              ></PublicRoute>
              <PublicRoute exact path="/login" component={Login}></PublicRoute>
              <PrivateRoute exact path="/" component={ListTodos}></PrivateRoute>
            </Switch>
          </Grid>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
