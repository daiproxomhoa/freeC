import { Container, Paper } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import "./stylesheet.scss";

const HomeSkeleton = (props) => {
  return (
    <div className="home">
      <div className="tab-container d-flex-center d-flex-column p-24">
        <Skeleton
          variant="text"
          width={350}
          height={60}
          style={{ margin: 8 }}
        />
        <Skeleton
          variant="text"
          width={400}
          height={30}
          style={{ margin: 8 }}
        />{" "}
        <Skeleton
          variant="text"
          width={400}
          height={30}
          style={{ margin: 8 }}
        />
      </div>
      <Container>
        <div className="body-container d-flex justify-content-center   d-flex-wrap p-24">
          {Array(8)
            .fill(0)
            .map((v, index) => (
              <div key={index} className={"card p-8"}>
                <Paper>
                  <div className="card__content">
                    <div className="card__image" />
                    <div className="p-8">
                      <Skeleton variant="text" width={70} />
                      <Skeleton variant="text" />
                      <Skeleton variant="text" />
                    </div>
                  </div>
                </Paper>{" "}
              </div>
            ))}
        </div>
      </Container>
    </div>
  );
};

export default HomeSkeleton;
