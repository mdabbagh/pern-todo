import React, { Fragment, useContext } from "react";
import { Typography } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";

import { UserContext } from "../UserContext";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useAuth();

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome {user ? user.email : ""}
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
