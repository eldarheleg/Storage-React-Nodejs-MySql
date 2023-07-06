import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../helpers/useAuth";

const ProtectedRoute = ({ allowedRole }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth.role === allowedRole ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
