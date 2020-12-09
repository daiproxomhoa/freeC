import React from "react";
import { Button, fade, Typography } from "@material-ui/core";
import { Col, Row } from "../common/element";
import { dataFake } from "../constants";
import Content from "./Content";

const Main = () => {
  const [data, setData] = React.useState(dataFake);
  const [current, setCurrent] = React.useState(dataFake[0]);
  const [required, setRequired] = React.useState(
    dataFake.findIndex((v) => v.required)
  );
  return (
    <div style={{ display: "flex", flex: 1, background: "#f7f7f7" }}>
      <Col
        style={{
          backgroundColor: "#0093E9",
          backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
          width: 180,
          minWidth: 220,
          height: "100vh",
          boxShadow: "2px 0px 4px 1px #616161",
          position: "sticky",
          top: 0,
          color: "white",
        }}
      >
        {data.map((v, index) => (
          <Button
            key={index}
            variant="text"
            style={{
              padding: "8px 16px",
              background: current.id === v.id ? "#e2edf399" : undefined,
              borderRadius: 0,
              color: "white",
            }}
            disabled={required !== -1 ? index > required : false}
            onClick={() => {
              setCurrent(v);
            }}
          >
            {v.label || v.title}
          </Button>
        ))}
      </Col>
      <Row style={{ justifyContent: "center", flex: 1, padding: 24 }}>
        <Content
          data={current}
          next={() => {
            setRequired(data.findIndex((v) => v.id === current.id + 1));
            setCurrent(data.find((v) => v.id === current.id + 1));
          }}
        />
      </Row>
    </div>
  );
};

export default Main;
