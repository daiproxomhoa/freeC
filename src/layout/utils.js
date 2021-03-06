import { ROUTES_TAB } from "../configs/routes";

export function flatRoutes(list) {
  let listTerm = [];
  list.forEach((route) => {
    if (route.subMenu) {
      listTerm = listTerm.concat(flatRoutes(route.subMenu));
    }
    if (route.hiddenMenu) {
      listTerm = listTerm.concat(flatRoutes(route.hiddenMenu));
    }
    if (route.path) {
      listTerm = listTerm.concat(route);
    }
  });
  return listTerm;
}

function getMapRelationsRoutes(list, hashMap, parent) {
  list.forEach((route) => {
    if (route.component) {
      hashMap.push({ child: route, parent: route });
    }
    if (parent) {
      hashMap.push({ child: route, parent });
    }
    if (route.subMenu) {
      getMapRelationsRoutes(route.subMenu, hashMap, route);
    }
    if (route.hiddenMenu) {
      getMapRelationsRoutes(route.hiddenMenu, hashMap, route);
    }
  });
}
export function comparePathName(pathName, pathNameCompare) {
  if (pathNameCompare && pathName) {
    const child = pathNameCompare?.split("/");
    const path = pathName?.split("/");
    if (child.length === path.length) {
      let tmp = child;
      child.forEach((element, i) => {
        if (element.includes(":")) {
          tmp = [...tmp.slice(0, i), path[i], ...tmp.slice(i + 1)];
        }
      });
      if (tmp.join("/") === pathName) {
        return true;
      }
      return false;
    }
    return false;
  }
  return false;
}

function getParentHistoryPath(list, hashMap, pathName) {
  hashMap.forEach((obj, index) => {
    const isConstant = list.findIndex((one) => one?.name === obj.parent?.name);
    if (comparePathName(pathName, obj.child.path) && isConstant === -1) {
      list.push(obj.parent);
      if (!obj.parent.isModule) {
        getParentHistoryPath(list, hashMap, obj.parent?.path);
      }
    }
  });
}

function getChildHistoryPath(list, hashMap, pathName) {
  hashMap.forEach((obj, index) => {
    const isConstant = list.findIndex((one) => one?.name === obj.child?.name);
    if (comparePathName(pathName, obj.parent.path) && isConstant === -1) {
      list.push(obj.child);
      getChildHistoryPath(list, hashMap, obj.child?.path);
    }
  });
}

export function getListRoutesContain(list, pathName) {
  let listRouter = [];
  const hashMap = [];
  getMapRelationsRoutes(list, hashMap);
  getParentHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .filter((route) => route.disableInBreadcrumb !== true)
    .map((route, index) => {
      return { ...route, backStep: index };
    })
    .reverse();
  return listRouter;
}

export function getAllRoutesContain(list, pathName) {
  let listRouter = [];
  const hashMap = [];
  getMapRelationsRoutes(list, hashMap);
  getParentHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .filter((route) => route.disableInBreadcrumb !== true)
    .map((route, index) => {
      return { ...route, backStep: index };
    })
    .reverse();
  getChildHistoryPath(listRouter, hashMap, pathName);
  listRouter = listRouter
    .reverse()
    .filter((route) => route.disableInBreadcrumb !== true);
  return listRouter.reverse();
}

export function getCurrentRoute(pathName, listRouter) {
  const listRoutes = flatRoutes(listRouter);
  return listRoutes.find((route) => {
    const path = route.path?.split("/");
    const currentPath = pathName.split("/");

    if (path && path.length === currentPath.length) {
      let tmp = path;
      path.forEach((element, i) => {
        if (element.includes(":")) {
          tmp = [...tmp.slice(0, i), currentPath[i], ...tmp.slice(i + 1)];
        }
      });
      if (tmp.join("/") === pathName) {
        return true;
      }
    }
    return route.path === pathName;
  });
}

/* ---------------Permission--------------*/

export function hasPermission(routePermission, listRole) {
  let check = true;
  if (listRole && routePermission) {
    let count = 0;
    listRole.forEach((role) => {
      if (routePermission.includes(role)) {
        count += 1;
      }
    });
    if (count !== listRole.length) {
      check = false;
    }
  }

  return check;
}

export function getListRoutesActivate(routePermission, listRoutes) {
  const list = [];
  if (!routePermission) {
    return listRoutes;
  }
  listRoutes &&
    routePermission &&
    listRoutes.forEach((route) => {
      if (route.path) {
        if (route.listRole) {
          if (hasPermission(routePermission, route.listRole)) {
            list.push(route);
          }
        } else {
          list.push(route);
        }
      }
    });
  return list;
}

export function getCurrentRole(routePermission, roles) {
  const listRouteActive = flatRoutes(ROUTES_TAB);
  if (roles) {
    if (typeof roles === "string") {
      const currentRoute = listRouteActive.find((v) => v.path === roles);
      return hasPermission(routePermission, currentRoute?.listRole);
    }
    return hasPermission(routePermission, roles);
  }
  return true;
}
