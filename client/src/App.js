import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import { UserContext } from "./UserContext";
import ListTodos from "./components/ListTodos";
import Register from "./components/Register";
import Login from "./components/Login";
import EditUser from "./components/EditUser";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Navbar from "./components/Navbar";

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
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        {user && <Navbar />}
        <div className={classes.root}>
          <Grid container>
            <Switch>
              <PrivateRoute
                exact
                path="/user"
                component={EditUser}
              ></PrivateRoute>
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
