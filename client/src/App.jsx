import "./App.css";
import Nav from "./layout/Navigation";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./helpers/AuthContext";
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

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    isLogged: false,
  });

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/registration/admin" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />}>
              <Route path="/home/profile" element={<Profile />} />
              <Route path="/home/employees" element={<Employees />} />
              <Route path="/home/products" element={<Products />} />
              <Route path="/home/materials" element={<Materials />} />
              <Route path="/home/processes" element={<Processes />} />
              <Route path="/home/suppliers" element={<Supplires />}>
                <Route path="/home/suppliers/create" element={<AddSupplier />} />
              </Route>
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
