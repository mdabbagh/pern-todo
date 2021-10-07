import React, { Fragment, useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import inMemoryJWT from "./token";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);
  const token = inMemoryJWT.getToken();

  useEffect(() => {
    const checkToken = async () => {
      //await inMemoryJWT.getToken();

      if (token) {
        setAuthChecked(true);
      }
    };
    checkToken();
  }, []);

  if (!authChecked) return <Fragment>Loading...</Fragment>;

  return (
    <Route
      {...rest}
      render={(props) =>
        user != null ? <Component {...props} /> : <Redirect exact to="/login" />
      }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
