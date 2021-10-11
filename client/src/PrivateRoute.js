import React, { useContext, useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "./UserContext";
import PropTypes from "prop-types";

function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useContext(UserContext);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const userItem = localStorage.getItem("user");
    if (userItem) {
      setAuthChecked(true);
    }
  }, []);

  if (!authChecked) return <div>Loading</div>;

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
