import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useState } from "react";

const ProtectedRoute = ({ allowedRole }) => {
  const [role, setRole] = useState(localStorage.getItem("userRole"));
  const location = useLocation();

  return role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
