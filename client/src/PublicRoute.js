import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";
import Loading from "./components/Loading";

function PublicRoute({ component: Component, ...rest }) {
  const { user, isLoading } = useContext(UserContext);

  if (isLoading) return <Loading />;

  if (!user) {
    return <Route {...rest} render={(props) => <Component {...props} />} />;
  } else {
    return <Redirect to="/" />;
  }
}

PublicRoute.propTypes = {
  component: PropTypes.any,
};

export default PublicRoute;
