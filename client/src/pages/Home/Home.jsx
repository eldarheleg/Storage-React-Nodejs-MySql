import { Link, Routes, useNavigate, Outlet } from "react-router-dom";
import useAuth from "../../helpers/useAuth";
import axios from "axios";

function Home() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await axios
      .get("http://localhost:3001/api/users/logout", { withCredentials: true })
      .then((response) => {
        console.log(response);
        localStorage.removeItem("accessToken");
        setAuth({});
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap ">
          <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary shadow-lg">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
              <div className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none ">
                {auth.role === "ADMIN" ? (
                  <span className="fs-5 fw-bolder d-none d-sm-inline">
                    Admin Dashboard
                  </span>
                ) : (
                  <span className="fs-5 fw-bolder d-none d-sm-inline">
                    User Dashboard
                  </span>
                )}
              </div>
              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                id="menu"
              >
                <li>
                  <Link
                    to="/home"
                    data-bs-toggle="collapse"
                    className="nav-link text-white px-0 align-middle"
                  >
                    <i className="fs-4 bi bi-speedometer"></i>
                    <span className="ms-3 d-none d-sm-inline">Dashboard</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="employees"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi bi-people-fill"></i>{" "}
                    <span className="ms-3 d-none d-sm-inline">Employees</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="suppliers"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-people"></i>{" "}
                    <span className="ms-3 d-none d-sm-inline">Suppliers</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="processes"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi bi-arrow-down-up"></i>{" "}
                    <span className="ms-3 d-none d-sm-inline">Processes</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="materials"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi bi-layers"></i>{" "}
                    <span className="ms-3 d-none d-sm-inline">Materials</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="products"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi bi-box-seam"></i>
                    <span className="ms-3 d-none d-sm-inline">Products</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="profile"
                    className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi bi-person-circle"></i>
                    <span className="ms-3 d-none d-sm-inline">Profile</span>
                  </Link>
                </li>
                {auth.role === "ADMIN" ? (
                  <li>
                    <Link
                      to="registration"
                      className="nav-link px-0 align-middle text-white"
                    >
                      <i className="fs-4 bi bi-save2"></i>
                      <span className="ms-3 d-none d-sm-inline">
                        Registration
                      </span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                <li onClick={logout}>
                  <a href="#" className="nav-link px-0 align-middle text-white">
                    <i className="fs-4 bi-power"></i>
                    <span className="ms-3 d-none d-sm-inline">Log out</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow bg-dark">
              <h4 className="text-white">Employee Management System</h4>
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
