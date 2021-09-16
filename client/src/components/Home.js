import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Fragment>
      <Link to="/todos">Todos</Link>
    </Fragment>
  );
};

export default Home;
