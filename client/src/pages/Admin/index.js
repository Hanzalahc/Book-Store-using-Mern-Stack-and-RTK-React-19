import { lazy } from "react";

const AdminLogin = lazy(() => import("./AdminLogin"));
const DashboardLayout = lazy(() => import("./Dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const ManageBooks = lazy(() => import("./Books/ManageBooks"));
const AddBook = lazy(() => import("./Books/AddBook"));
const UpdateBook = lazy(() => import("./Books/UpdateBook"));

export {
  AdminLogin,
  DashboardLayout,
  Dashboard,
  ManageBooks,
  AddBook,
  UpdateBook,
};
