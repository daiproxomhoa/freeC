import { Typography } from "@material-ui/core";
import React from "react";
import { Row } from "../../common/element";

const DefaultFooter = () => {
  return (
    <Row
      style={{
        background: "white",
        padding: "18px 30px",
      }}
    >
      <Row
        style={{
          flex: 1,
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Footer
        </Typography>
      </Row>
    </Row>
  );
};

export default DefaultFooter;
