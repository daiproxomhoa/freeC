/* eslint-disable react/destructuring-assignment */
import React from "react";
import { Redirect, Route } from "react-router";
import { ROUTES } from "../constants";

const ProtectedRoute = (props) => {
  const { auth, ...restProps } = props;
  const from =
    (props.location && `${props.location.pathname}${props.location.search}`) ||
    "/";
  const state = props.location && props.location.state;

  if (!auth) {
    return (
      <Redirect
        to={{
          state,
          pathname: `${ROUTES.login}`,
          search: `?from=${encodeURIComponent(from)}`,
        }}
      />
    );
  }

  return <Route {...restProps} />;
};

export default ProtectedRoute;
