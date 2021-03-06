import { Card, Typography } from "@material-ui/core";
import { go } from "connected-react-router";
import queryString from "query-string";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Row } from "../../common/element";
import Link from "../../common/Link";
import { isHasPermission } from "../../common/reducer";
import { PRIMARY } from "../../configs/colors";
import { ROUTES_TAB } from "../../configs/routes";
import {
  comparePathName,
  getCurrentRoute,
  getListRoutesContain
} from "../utils";

const DefaultBreadcrumbs = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { location } = history;
  const { pathname, search } = location;

  const state = location.state;
  const queryParams = queryString.parse(search);

  const isActive = React.useMemo(() => {
    return dispatch(isHasPermission(pathname));
  }, [dispatch, pathname]);

  const getList = React.useMemo(() => {
    return getListRoutesContain(ROUTES_TAB, pathname);
  }, [pathname]);

  const isBackAble = React.useCallback(
    (value) => {
      let check = false;
      state &&
        Object.entries(state).forEach((v, index) => {
          if (comparePathName(v[0], value.path)) {
            check = state && state[`${v[0]}`];
          }
        });
      return check;
    },
    [state]
  );
  const getCurrent = React.useMemo(() => {
    return getCurrentRoute(pathname, ROUTES_TAB);
  }, [pathname]);

  const getTitle = React.useMemo(() => {
    const currentPath = getList[getList.length - 1];
    if (currentPath && (currentPath.title || currentPath.name)) {
      return currentPath.title || currentPath.name;
    }
    return null;
  }, [getList]);

  if (!isActive || getCurrent?.disableBreadcrumb) {
    return null;
  }

  return (
    <Card
      style={{
        boxShadow:
          "5px 5px 9px rgba(0, 0, 0, 0.05), -5px -5px 9px rgba(0, 0, 0, 0.05)",
        padding: "10px 24px",
        display: "flex",
        alignItems: "center",
        borderRadius: 0,
      }}
    >
      <Typography variant="h5" style={{ marginRight: "24px" }}>
        {queryParams?.breadcrumbName ?? getTitle}
      </Typography>

      {getList.map((v, index) => (
        <Row key={index}>
          {index === getList.length - 1 ? (
            <Typography variant="body2" color="textSecondary">
              {queryParams?.breadcrumbName ?? <>{v.title || v.name}</>}
            </Typography>
          ) : (
            <>
              {v.path || !v.isModule ? (
                <>
                  {isBackAble(v) ? (
                    <>
                      <Typography
                        variant="body2"
                        style={{ color: PRIMARY, cursor: "pointer" }}
                        onClick={() => dispatch(go(-v.backStep))}
                      >
                        {v.title || v.name}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Link
                        to={{
                          pathname: v.path,
                          state: { ...state, [`${v.path}`]: true },
                        }}
                      >
                        <Typography variant="body2" style={{ color: PRIMARY }}>
                          {v.title || v.name}
                        </Typography>
                      </Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Typography variant="body2" style={{ color: PRIMARY }}>
                    {v.title || v.name}
                  </Typography>
                </>
              )}
            </>
          )}
        </Row>
      ))}
    </Card>
  );
};

export default DefaultBreadcrumbs;
