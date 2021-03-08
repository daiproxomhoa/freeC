import { Container, Paper } from "@material-ui/core";
import React from "react";
import GoogleMapReact from "google-map-react";
import { KEY_GOOGLE_MAP } from "../../constants";
import LocationOnIcon from "@material-ui/icons/LocationOn";

const Contact = (props) => {
  return (
    <Container>
      <Paper className="m-12 p-4" style={{ height: "500px", width: "700px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY_GOOGLE_MAP }}
          defaultCenter={{ lat: 21.028539843508536, lng: 105.77827942562524 }}
          defaultZoom={17}
          options={(maps) => {
            return {
              mapTypeControl: true,
              mapTypeControlOptions: {
                position: maps.ControlPosition.TOP_RIGHT,
              },
              fullscreenControl: false,
            };
          }}
        >
          <div lat={21.028539843508536} lng={105.77827942562524}>
            <LocationOnIcon />
          </div>
        </GoogleMapReact>
      </Paper>
    </Container>
  );
};

export default Contact;
