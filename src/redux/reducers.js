import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage/session";
import { createAction, getType } from "typesafe-actions";
import authReducer from "./auth/authReducer";

export const clearStoreAfterLogout = createAction("clearStoreAfterLogout")();

const persistConfig = {
  storage,
  key: "root",
  transforms: [],
  blacklist: ["router", "intl"],
  whitelist: ["auth"],
};

function reducer(history) {
  const rawRootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

  return persistReducer(persistConfig, (state, action) => {
    if (state && action.type === getType(clearStoreAfterLogout)) {
      return rawRootReducer(undefined, action);
    }
    return rawRootReducer(state, action);
  });
}

export default reducer;
