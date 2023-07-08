import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../helpers/AuthProvider";

function AuthRoutes() {
  const location = useLocation();
  const { isLogged } = useAuth();

  return isLogged === true ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
}

export default AuthRoutes;
