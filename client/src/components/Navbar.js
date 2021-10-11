import React, { Fragment, useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";
import inMemoryJWT from "../token";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogout = () => {
    inMemoryJWT.deleteToken();
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user ? JSON.parse(user).email : ""}
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/user" color="inherit">
            My Account
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
