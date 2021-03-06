import { go, push, replace } from "connected-react-router";
import { ROUTES_TAB } from "../configs/routes";
import {
  comparePathName,
  getCurrentRole,
  getListRoutesContain
} from "../layout/utils";

export function isHasPermission(permission) {
  return (dispatch, getState) => {
    const state = getState();
    return getCurrentRole([], permission);
  };
}

export function goBackAction(step = 1) {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    const listRoutes = getListRoutesContain(
      ROUTES_TAB,
      router.location.pathname
    ).reverse();
    // const backAble =
    //   listRoutes[step] && router?.location?.state
    //     ? (router?.location?.state as some)[`${listRoutes[1].path}`]
    //     : false;
    let backAble = false;
    if (listRoutes[step] && router?.location?.state) {
      Object.entries(router?.location?.state).forEach((v) => {
        if (comparePathName(v[0], listRoutes[1].path)) {
          backAble = (router?.location?.state)[`${v[0]}`];
        }
      });
    }

    if (backAble) {
      dispatch(go(-step));
    } else if (listRoutes.length > 1) {
      dispatch(
        push({ pathname: listRoutes[1]?.path, state: router.location.state })
      );
    } else if (
      router?.location?.state &&
      Object.entries(router?.location?.state).length > 0
    ) {
      dispatch(go(-step));
    } else {
      dispatch(push({ pathname: "/", state: router.location.state }));
    }
  };
}

export function goToReplace(location) {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    dispatch(
      replace({
        ...location,
        state: router.location.pathname
          ? {
              ...router.location.state,
              [`${router.location.pathname}`]: true,
              ...location.state,
            }
          : {
              ...router.location.state,
              ...location.state,
            },
      })
    );
  };
}

export function goToAction(location) {
  return async (dispatch, getState) => {
    const state = getState();
    const { router } = state;
    dispatch(
      push({
        ...location,
        state: router.location.pathname
          ? {
              ...router.location.state,
              [`${router.location.pathname}`]: true,
              ...location.state,
            }
          : { ...router.location.state, ...location.state },
      })
    );
  };
}
