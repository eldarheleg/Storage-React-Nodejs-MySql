import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      id: 0,
      username: "",
      isLogged: false,
    });
    navigate("/");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark .text-light">
      <a className="navbar-brand" href="/#">
        Navbar
      </a>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to={"/"}>
              Home <span className="sr-only">(current)</span>
            </Link>
          </li>
          {authState.isLogged ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={"/posts"}>
                  My Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/profile"}>
                  Profile
                </Link>
              </li>
              <li className="nav-item active">
                <button onClick={logout} className="btn btn-primary">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={"/registration"}>
                  Registration
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"*"}>
                  Pricing
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;