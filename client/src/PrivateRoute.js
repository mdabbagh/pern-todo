import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <div>Loading</div>;

  if (user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/login" />;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
