import { Container, useMediaQuery } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch, useLocation } from "react-router";
import { Col, PageWrapper } from "../../common/element";
import LoadingIcon from "../../common/LoadingIcon";
import { GREY_100 } from "../../configs/colors";
import { ROUTES, ROUTES_TAB } from "../../configs/routes";
import { MUI_THEME } from "../../configs/setupTheme";
import { flatRoutes } from "../utils";
import DefaultBreadcrumbs from "./DefaultBreadcrumbs";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";

const mapStateToProps = (state) => {
  return {
    userData: state.auth.userData,
  };
};

const DefaultLayout = (props) => {
  const { dispatch, userData } = props;
  const location = useLocation();
  const [openAside, setOpenAside] = React.useState(true);
  const matches = useMediaQuery(MUI_THEME.breakpoints.up("md"));

  React.useEffect(() => {
    setOpenAside(matches);
  }, [matches]);

  const listRoutes = React.useMemo(() => {
    return flatRoutes(ROUTES_TAB)
  }, []);

  console.log('listRoutes',listRoutes);
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
          <DefaultHeader openAside={openAside} />
          <DefaultBreadcrumbs />
          <Container
            style={{
              paddingTop: 16,
              maxWidth: "none",
              flex: 1,
              padding: "16px 24px 24px 32px",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
          </Container>
          <DefaultFooter />
        </Col>
      </PageWrapper>
    </>
  );
};

export default connect(mapStateToProps)(DefaultLayout);
