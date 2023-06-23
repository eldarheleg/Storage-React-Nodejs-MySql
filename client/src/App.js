import "./App.css";
import Nav from "./layout/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import Login from './pages/Login';
import Employees from "./pages/Employees";
import axios from "axios";
import Products from "./pages/Products";

function App() {
  const [authState, setAuthState] = useState({
    id: 0,
    username: "",
    isLogged: false,
  });

  useEffect(() => {
    let accessToken = localStorage.getItem("accessToken");

    axios
      .get("http://localhost:3001/api/user", {
        headers: {
          "access-token": `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        let user = response.data;
        setAuthState({
          id: user.id,
          username: user.username,
          isLoggedIn: true,
        });
      })
      .catch((error) => {
        return <Home />;
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <div className="App">
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Employees />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;