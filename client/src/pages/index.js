import { lazy } from "react";

const Home = lazy(() => import("./Home/Home"));
const Login = lazy(() => import("./Auth/Login"));
const Register = lazy(() => import("./Auth/Register"));
const Pagenotfound = lazy(() => import("./Pagenotfound"));
const Cart = lazy(() => import("./Cart/Cart"));
const Checkout = lazy(() => import("./Cart/Checkout"));
const SingleBook = lazy(() => import("./Book/SingleBook"));
const Order = lazy(() => import("./Order/OrderPage"));
const UserDashboard = lazy(() => import("./Home/UserDashboard"));

export {
  Home,
  Login,
  Register,
  Pagenotfound,
  Cart,
  Checkout,
  SingleBook,
  Order,
  UserDashboard,
};
