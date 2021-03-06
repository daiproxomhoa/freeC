import { MuiThemeProvider } from "@material-ui/core";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import App from "./App.jsx";
import LoadingIcon from "./common/LoadingIcon.jsx";
import { MUI_THEME, THEME } from "./configs/setupTheme.js";
import "./configs/stylesheet.scss";
import "./index.css";
import configureStore from "./redux/configureStore.js";
import reportWebVitals from "./reportWebVitals";

export const history = createBrowserHistory();

const store = configureStore({}, history);
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<LoadingIcon />} persistor={persistor}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={THEME}>
          <MuiThemeProvider theme={MUI_THEME}>
            <App />
          </MuiThemeProvider>
        </ThemeProvider>
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
