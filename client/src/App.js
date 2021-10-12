import React from "react";
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
import useFindUser from "./hooks/useFindUser";

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
  const { user, setUser, isLoading } = useFindUser();

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser, isLoading }}>
        {user && <Navbar />}
        <div className={classes.root}>
          <Grid container>
            <Switch>
              <PrivateRoute
                exact
                path="/user"
                component={EditUser}
              ></PrivateRoute>

              <PrivateRoute exact path="/" component={ListTodos}></PrivateRoute>

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
