import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

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
