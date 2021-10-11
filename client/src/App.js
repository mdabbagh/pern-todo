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
import inMemoryJWT from "./token";

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
    // This will run on page refresh and initial page load only
    async function checkToken() {
      // See if we have an existing access token in memory
      const accessToken = await inMemoryJWT.getToken();
      if (accessToken) {
        setUser(localStorage.getItem("user"));
      } else {
        // Try refresh_token to get a new access token
        try {
          const refreshToken = await inMemoryJWT.refreshToken();
          if (!refreshToken) {
            setUser(null);
          } else {
            setUser(localStorage.getItem("user"));
          }
        } catch (err) {
          setUser(null);
        }
      }
    }
    checkToken();
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        {user && <Navbar />}
        <div className={classes.root}>
          <Grid container>
            <Switch>
              {user && (
                <PrivateRoute
                  exact
                  path="/user"
                  component={EditUser}
                ></PrivateRoute>
              )}
              {user && (
                <PrivateRoute
                  exact
                  path="/"
                  component={ListTodos}
                ></PrivateRoute>
              )}
              <PublicRoute
                exact
                path="/register"
                component={Register}
              ></PublicRoute>
              <PublicRoute exact path="/login" component={Login}></PublicRoute>
            </Switch>
          </Grid>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
