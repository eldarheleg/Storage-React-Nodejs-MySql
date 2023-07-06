import { useLocation, Navigate, Outlet } from "react-router-dom";

const AuthRoutes = ({ authToken }) => {
  const location = useLocation();

  return authToken ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  );
};

export default AuthRoutes;
