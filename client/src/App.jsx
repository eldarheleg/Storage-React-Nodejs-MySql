import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home/Home";
import Registration from "./pages/Registration/Registration";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login/Login";
import Employees from "./pages/Employees/Employees";
import Products from "./pages/Products/Products";
import Welcome from "./pages/Welcome/Welcome";
import Profile from "./pages/Profile/Profile";
import Materials from "./pages/Materials/Materials";
import Processes from "./pages/Processes/Processes";
import Supplires from "./pages/Suppliers/Suppliers";
import AddSupplier from "./pages/Suppliers/AddSupplier";
import EditSupplier from "./pages/Suppliers/EditSupplier";
import ProtectedRoute from "./pages/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import { AuthProvider } from "./helpers/AuthProvider";
import AuthRoutes from "./pages/AuthRoutes";
import Dashboard from "./pages/Dashboard";
import Navigation from "./layout/Navigation";

const ROLES = {
  user: "USER",
  admin: "ADMIN",
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checkUserToken = () => {
    const userToken = localStorage.getItem("accesToken");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(true);
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/registration/admin" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AuthRoutes authToken={isLoggedIn} />}>
              <Route path="/home" element={<Home />}>
                <Route path="" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route path="employees" element={<Employees />} />
                <Route path="products" element={<Products />} />
                <Route path="materials" element={<Materials />} />
                <Route path="processes" element={<Processes />} />
                <Route path="suppliers" element={<Navigation />}>

                  <Route path="" element={<Supplires />} />
                  <Route path="create" element={<AddSupplier />} />
                  <Route path="update/:id" element={<EditSupplier />} />
                </Route>
                <Route element={<ProtectedRoute allowedRole={ROLES.admin} />}>
                  <Route path="registration" element={<Registration />} />
                </Route>
              </Route>
            </Route>
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
