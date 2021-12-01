import React, { Fragment, useContext, useState } from "react";
import { Typography } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import { UserContext } from "../UserContext";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const { logoutUser } = useAuth();
  const [anchorElSettings, setAnchorElSettings] = useState(null);

  const handleLogout = async () => {
    await logoutUser();
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  return (
    <Fragment>
      <AppBar position="static">
        <Container maxWidth="xl" sx={{ mr: 0, pr: 0 }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Welcome {user ? user.email : ""}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              Welcome {user ? user.email : ""}
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Button component={Link} to="/" color="inherit">
                Home
              </Button>
              <Button component={Link} to="/user" color="inherit">
                My Account
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
            <Box
              sx={{
                flexGrow: 0,
                mr: 0,
                pr: 0,
                display: { xs: "flex", md: "none" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenSettingsMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElSettings}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElSettings)}
                onClose={handleCloseSettingsMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <MenuItem onClick={handleCloseSettingsMenu}>
                  <Button component={Link} to="/" color="inherit">
                    Home
                  </Button>
                  <Button component={Link} to="/user" color="inherit">
                    My Account
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Fragment>
  );
};

export default Navbar;
