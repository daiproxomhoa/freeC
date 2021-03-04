import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { createAction, getType } from "typesafe-actions";
import authReducer from "./auth/authReducer";

export const clearStoreAfterLogout = createAction("clearStoreAfterLogout")();

function reducer(history) {
  const rawRootReducer = combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  });

  return (state, action) => {
    if (state && action.type === getType(clearStoreAfterLogout)) {
      return rawRootReducer(undefined, action);
    }
    return rawRootReducer(state, action);
  };
}

export default reducer;
