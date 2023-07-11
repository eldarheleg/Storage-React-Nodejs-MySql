import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./helpers/AuthProvider";

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
import AuthRoutes from "./pages/AuthRoutes";
import Dashboard from "./pages/Dashboard";
import Navigation from "./layout/Navigation";
import AddMaterial from "./pages/Materials/AddMaterial";
import EditMaterial from "./pages/Materials/EditMaterial";
import EditEmployee from "./pages/Employees/EditEmployee";
import AddProcess from "./pages/Processes/AddProcess";
import EditProcess from "./pages/Processes/EditProcess";
import ProcessItems from "./pages/Processes/ProcessItems";
import AddProcessItem from "./pages/Processes/AddProcessItem";

const ROLES = {
  user: "USER",
  admin: "ADMIN",
};

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/registration/admin" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route element={<AuthRoutes />}>
              <Route path="/home" element={<Home />}>
                <Route path="" element={<Dashboard />} />
                <Route path="profile" element={<Profile />} />
                <Route
                  path="employees"
                  element={<Navigation props={"Employee"} />}
                >
                  <Route path="" element={<Employees />} />
                  <Route path="changepass/:id" element={<EditEmployee />} />
                </Route>
                
                <Route path="products" element={<Products />} />
                <Route
                  path="materials"
                  element={<Navigation props={"Material"} />}
                >
                  <Route path="" element={<Materials />} />
                  <Route path="create" element={<AddMaterial />} />
                  <Route path="update/:id" element={<EditMaterial />} />
                </Route>
                <Route
                  path="processes"
                  element={<Navigation props={"Process"} addons={"Process Item"} />}
                >
                  <Route path="" element={<Processes />} />
                  <Route path="create" element={<AddProcess />} />
                  {/* <Route path="update/:id" element={<EditProcess />} /> */}
                  <Route path="processItems" element={<ProcessItems />} />
                  <Route path="processItems/create" element={<AddProcessItem />} />
                </Route>
                <Route path="processes" element={<Processes />} />
                <Route
                  path="suppliers"
                  element={<Navigation props={"Supplier"} />}
                >
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
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
