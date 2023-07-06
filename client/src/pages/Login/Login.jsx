import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../helpers/useAuth";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

function Login() {
  const { setAuth } = useAuth();

  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const submitLogin = async (event) => {
    event.preventDefault();
    let data = {
      username: formState.username,
      password: formState.password,
    };
    //console.log(data)
    await axios
      .post("http://localhost:3001/api/users/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        let resData = response.data;
        //console.log(resData);
        localStorage.setItem("accessToken", resData.token);
        //localStorage.setItem("userRole", resData.role);
        setAuth({ user: resData.user, role: resData.role, isLogged: true });
        toast.success("Login successfull");
        navigate("/home");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <section className="vh-100">
      <ToastContainer />
      <div className="container-fluid h-custom mb-4">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={submitLogin}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  name="username"
                  className="form-control form-control-lg"
                  placeholder="Enter username"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Username
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={handleChange}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
                {/* <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to={"/registration"} className="link-danger">
                    Register
                  </Link>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary fixed-bottom">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2023. All rights reserved.
        </div>
      </div>
    </section>
  );
}

export default Login;
