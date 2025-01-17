import React, { memo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useReduxHooks from "../../hooks/useReduxHooks";
const AdminRoute = ({ children }) => {
  const { admin } = useReduxHooks();
  const adminStatus = admin?.status;
  if (!adminStatus) {
    return <Navigate to="/admin/login" />;
  }
  return children ? children : <Outlet />;
};

export default memo(AdminRoute);
