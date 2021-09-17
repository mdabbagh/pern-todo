import React, { useState, useEffect } from "react";
import "./App.css";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";

import { UserContext } from "./UserContext";
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
    const existingUser = localStorage.getItem("user");
    if (existingUser) {
      setUser(existingUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Welcome {user ? JSON.parse(user).email : ""}
            </Typography>
            {user && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
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
