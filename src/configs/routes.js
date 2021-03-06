import NotFoundBox from '../common/NotFoundBox';
import Home from '../modules/home/Home';

export const ROUTES = {
  login: "/login",
  home: "/",
  notFound404:"/404"
};

export const ROUTES_TAB = [
  {
    name: "notFound404",
    isModule: true,
    path: ROUTES.notFound404,
    component: NotFoundBox,
    disableBreadcrumb: true,
    hidden: true,
  },
  {
    name: "paymentVerify",
    isModule: true,
    path: ROUTES.home,
    component: Home,
    disableBreadcrumb: true,
    hidden: true,
  },
];
