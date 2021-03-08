import NotFoundBox from "../common/NotFoundBox";
import About from "../modules/about/About";
import Contact from "../modules/contact/Contact";
import Home from "../modules/home/page/Home";
import Login from "../modules/login/pages/Login";

export const ROUTES = {
    default: '/',
    login: "/login",
    home: "/",
    about: "/about",
    contact: "/contact",
    notFound404: "/404",
};

export const ROUTES_TAB = [
    {
        name: "notFound404",
        path: ROUTES.notFound404,
        component: NotFoundBox,
        hidden: true,
    },
    {
        name: "home",
        path: ROUTES.home,
        component: Home,
        exact: true
    },
    {
        name: "About Page",
        path: ROUTES.about,
        component: About,
    },
    {
        name: "Contact Page",
        path: ROUTES.contact,
        component: Contact,
    },
];
