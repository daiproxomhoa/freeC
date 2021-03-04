import { createAction, getType } from "typesafe-actions";
import { ACCESS_TOKEN } from "../../constants";
import { get, remove, set } from "js-cookie";
import { clearStoreAfterLogout } from "../reducers";

export const setAuth = createAction("auth/setAuth", (val) => ({
  val,
}))();

export const setAuthenticating = createAction(
  "auth/setAuthenticating",
  (val) => ({
    val,
  })
)();

export function loginAction(data) {
  return (dispatch, getState) => {
    console.log('data',data);
    dispatch(setAuthenticating(true));
    if (data.user_name === "freeC" && data.pass_word === "123456") {
      set(ACCESS_TOKEN, "OK");
      new Promise((resolve) => setTimeout(resolve, 350));
      dispatch(validateToken());
    }
    dispatch(setAuthenticating(false));
  };
}

export function validateToken() {
  return (dispatch, getState) => {
    const accessToken = get(ACCESS_TOKEN);
    if (accessToken === "OK") {
      dispatch(setAuth(true));
    } else {
      dispatch(clearStoreAfterLogout());
      remove(ACCESS_TOKEN);
    }
  };
}
export default function authReducer(
  state = {
    authenticating: false,
    auth: false,
  },
  action
) {
  switch (action.type) {
    case getType(setAuth):
      return { ...state, auth: action.payload.val };
    case getType(setAuthenticating):
      return { ...state, authenticating: action.payload.val };
    default:
      return state;
  }
}
