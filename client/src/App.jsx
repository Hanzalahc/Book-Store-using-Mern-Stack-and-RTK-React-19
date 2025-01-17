import React, { Suspense } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.js";
import Layout from "./Layout.jsx";
import "./App.css";

// Import pages
import {
  Home,
  Login,
  Register,
  Pagenotfound,
  Cart,
  Checkout,
  SingleBook,
  Order,
  UserDashboard,
} from "./pages";

// Import components
import { Loader } from "./components";

// Import admin  pages
import {
  AdminLogin,
  DashboardLayout,
  Dashboard,
  ManageBooks,
  AddBook,
  UpdateBook,
} from "./pages/Admin";

// Import admin components
import { AdminRoute } from "./components/Admin";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/books/:id",
          element: <SingleBook />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/user-dashboard",
          element: <UserDashboard />,
        },
        { path: "*", element: <Pagenotfound /> },
      ],
    },

    // admin routes
    {
      path: "/admin",
      element: (
        <AdminRoute>
          <DashboardLayout />
        </AdminRoute>
      ),
      children: [
        {
          path: "",
          element: <Dashboard />,
        },
        {
          path: "add-new-book",
          element: (
            <AdminRoute>
              {" "}
              <AddBook />
            </AdminRoute>
          ),
        },
        {
          path: "edit-book/:id",
          element: (
            <AdminRoute>
              {" "}
              <UpdateBook />
            </AdminRoute>
          ),
        },
        {
          path: "manage-books",
          element: (
            <AdminRoute>
              {" "}
              <ManageBooks />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },
  ]);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
        <Toaster />
      </PersistGate>
    </Provider>
  );
}

export default App;
