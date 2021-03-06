import { Typography } from "@material-ui/core";
import * as React from "react";

const NotFoundBox = (props) => {
  return (
    <div style={{ margin: "20px auto", width: "570px" }}>
      <Typography variant="h4">404</Typography>
      <Typography color="textSecondary">NotFound</Typography>
      <br />
    </div>
  );
};

export default NotFoundBox;
