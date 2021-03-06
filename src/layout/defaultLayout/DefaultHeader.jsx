import { AppBar, Container } from '@material-ui/core';
import * as React from 'react';
import { connect } from 'react-redux';
import { GREY_300 } from '../../configs/colors';
import { HEADER_HEIGHT } from '../constants';

const mapStateToProps = (state) => {
  return { router: state.router };
};

const DefaultHeader = (props) => {
  const { noSticky, isBookingModule } = props;

  return (
    <AppBar
      position={noSticky ? "relative" : "sticky"}
      style={{
        height: HEADER_HEIGHT,
        backgroundColor: "white",
        boxShadow: "none",
        borderRadius: 0,
        borderBottom: `1px solid ${GREY_300}`,
      }}
    >
      <Container
        style={
          isBookingModule
            ? { display: "flex", height: "100%" }
            : {
                display: "flex",
                height: "100%",
                margin: "unset",
                maxWidth: "unset",
              }
        }
      >
      </Container>
    </AppBar>
  );
};

export default connect(mapStateToProps)(DefaultHeader);
