import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie"

const ProtectedRoute = ({ allowedRole }) => {
  const [role, setRole] = useState(Cookies.get("userRole"));
  const location = useLocation();

  return role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
