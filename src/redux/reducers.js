import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { createAction, getType } from "typesafe-actions";

export const clearStoreAfterLogout = createAction("clearStoreAfterLogout")();

function reducer(history) {
  const rawRootReducer = combineReducers({
    router: connectRouter(history),
  });

  return (state, action) => {
    if (state && action.type === getType(clearStoreAfterLogout)) {
      return rawRootReducer(undefined, action);
    }
    return rawRootReducer(state, action);
  };
}

export default reducer;
