import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Error = ({ error }) => {
  let errorStyle = {
    color: "red",
  };

  return (
    <Fragment>
      <div style={errorStyle}>{error}</div>
    </Fragment>
  );
};

Error.propTypes = {
  error: PropTypes.any,
};

export default Error;
