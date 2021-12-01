import React, { Fragment } from "react";
import { Grid, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Fragment>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        spacing={1}
      >
        <Grid item xs={12}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Loading;
