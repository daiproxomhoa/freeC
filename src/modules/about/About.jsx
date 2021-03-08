import { Container, Paper, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

const About = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  return (
    <Container>
      <Paper className="p-12 m-24">
        <Typography variant="subtitle2" className="p-8">
          Họ và tên:{" "}
          <Typography variant="body2" component="span">
            {userData.name}
          </Typography>
        </Typography>
        <Typography variant="subtitle2" className="p-8">
          Ngày sinh:{" "}
          <Typography variant="body2" component="span">
            {userData.birthday}
          </Typography>
        </Typography>
        <Typography variant="subtitle2" className="p-8">
          Trường:{" "}
          <Typography variant="body2" component="span">
            {userData.school}
          </Typography>
        </Typography>
        <div className="d-flex flex-wrap">
          <div className="d-flex flex-1">
            <Typography variant="subtitle2" className="p-8">
              Sở thích:{" "}
            </Typography>
            <div className="p-8">
              {userData?.habit?.map((v, i) => (
                <Typography key={i} variant="body2">
                  - {v}
                </Typography>
              ))}
            </div>
          </div>
          <div className="d-flex flex-1">
            <Typography variant="subtitle2" className="p-8">
              Tính cách:{" "}
            </Typography>
            <div className="p-8">
              {userData?.character?.map((v, i) => (
                <Typography key={i} variant="body2">
                  - {v}
                </Typography>
              ))}
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Typography variant="subtitle2" className="p-8" style={{whiteSpace:'nowrap'}}>
            Định hướng và mog muốn:{" "}
          </Typography>
          <div className="p-8">
            {userData?.plan?.map((v, i) => (
              <Typography key={i} variant="body2">
                - {v}
              </Typography>
            ))}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default About;
