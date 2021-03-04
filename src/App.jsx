import React from "react";
import { connect, useDispatch } from "react-redux";
import { Switch } from "react-router";
import "./App.css";
import LoadingIcon from "./common/LoadingIcon";
import ProtectedRoute from "./common/ProtectedRoute";
import RedirectRoute from "./common/RedirectRoute";
import { ROUTES } from "./constants";
import Home from "./modules/home/Home";
import Login from "./modules/login/pages/Login";
import { validateToken } from "./redux/auth/authReducer";

const App = ({ auth }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);
  
  return (
    <React.Suspense fallback={<LoadingIcon style={{ marginTop: 240 }} />}>
      <Switch>
        <RedirectRoute auth={auth.auth} path={ROUTES.login} component={Login} />
        <ProtectedRoute auth={auth.auth} path={ROUTES.home} component={Home} />
      </Switch>
    </React.Suspense>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
