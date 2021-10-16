import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import Loading from "./components/Loading";

function PrivateRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  // Need this to avoid flashing the login page before routing to the expected page
  if (isLoading) return <Loading />;

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
