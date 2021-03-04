import React from "react";
import { Route, Redirect } from "react-router";

const RedirectRoute = (props) => {
  const { auth, ...restProps } = props;
  if (auth) {
    let from = "/";
    const state = props.location && props.location.state;

    if (props.location) {
      const params = new URLSearchParams(props.location.search);
      const fromParamValue = params.get("from");
      if (fromParamValue) {
        from = fromParamValue;
      }
    }

    const url = new URL(`${window.location.origin}${from}`);

    return (
      <Redirect to={{ state, pathname: url.pathname, search: url.search }} />
    );
  }
  return <Route {...restProps} />;
};

export default RedirectRoute;
