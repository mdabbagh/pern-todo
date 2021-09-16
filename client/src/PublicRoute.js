import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

function PublicRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? <Component {...props} /> : <Redirect exact to="/" />
      }
    />
  );
}

PublicRoute.propTypes = {
  component: PropTypes.any,
};

export default PublicRoute;
