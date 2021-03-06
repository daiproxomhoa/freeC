import { Tooltip } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { getCurrentRole } from "../layout/utils";

export const RawLink = styled(RouterLink)`
  text-decoration: none;
  color: unset;
`;

const Link = React.forwardRef((props, ref) => {
  const {
    children,
    router,
    userData,
    dispatch,
    to,
    permission,
    tooltip,
    placement,
    arrow,
    ...rest
  } = props;

  const getPropsTo = React.useMemo(() => {
    if (typeof to === "object") {
      return {
        ...to,
        state: {
          ...router.location.state,
          [`${router.location.pathname}`]: true,
          ...to.state,
        },
      };
    }
    return {
      pathname: to,
      state: {
        ...router.location.state,
        [`${router.location.pathname}`]: true,
      },
    };
  }, [router.location.pathname, router.location.state, to]);

  const isSufficientRole = React.useMemo(() => {
    const check = getCurrentRole(
      userData?.roleInfo?.permissions,
      permission || getPropsTo.pathname
    );
    return check;
  }, [getPropsTo.pathname, permission, userData]);

  if (!isSufficientRole) {
    return null;
  }
  return (
    <Tooltip title={tooltip || ""} placement={placement || "top"} arrow>
      <RawLink to={getPropsTo } {...rest}>
        {children}
      </RawLink>
    </Tooltip>
  );
});


const mapStateToProps = (state) => {
  return {
    router: state.router,
    userData: state.account.userData,
  };
};


export default connect(mapStateToProps)(Link);
