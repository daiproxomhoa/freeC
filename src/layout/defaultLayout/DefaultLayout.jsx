import {Container} from "@material-ui/core";
import * as React from "react";
import {Redirect, Route, Switch, useLocation} from "react-router";
import {Col, PageWrapper} from "../../common/element";
import LoadingIcon from "../../common/LoadingIcon";
import {GREY_100} from "../../configs/colors";
import {ROUTES, ROUTES_TAB} from "../../configs/routes";
import {flatRoutes} from "../utils";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

const DefaultLayout = (props) => {
  const location = useLocation();
  const listRoutes = React.useMemo(() => {
    return flatRoutes(ROUTES_TAB);
  }, []);

  return (
    <>
      <PageWrapper style={{ background: GREY_100, flexDirection: "row" }}>
        <Col
          style={{
            flex: 1,
            minHeight: "100vh",
            overflow: "hidden",
          }}
        >
          <DefaultHeader listRoutes={listRoutes} />
            <React.Suspense
              fallback={<LoadingIcon style={{ marginTop: 240 }} />}
            >
              <Switch location={location}>
                {listRoutes.map(
                  (route, index) =>
                    route.component && (
                      <Route
                        key={index}
                        exact={route.exact}
                        path={route.path}
                        component={route.component}
                      />
                    )
                )}
                <Redirect to={ROUTES.notFound404} />
              </Switch>
            </React.Suspense>
          <DefaultFooter />
        </Col>
      </PageWrapper>
    </>
  );
};

export default DefaultLayout;
