import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../helpers/AuthProvider";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function Login() {
  const { setIsLogged, setTokenFun } = useAuth();
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
    await axios
      .post("http://localhost:3001/api/users/login", data, {
        withCredentials: true,
      })
      .then((response) => {
        let resData = response.data;
        //Cookies.set("accessToken", resData.token)
        Cookies.set("userRole", resData.role);
        Cookies.set("userId", resData.employeeId);
        // localStorage.setItem("accessToken", resData.token);
        // localStorage.setItem("userRole", resData.role);
        // localStorage.setItem("userId", resData.employeeId);

        setTokenFun(resData.token);
        setIsLogged(true);
        console.log("Login successfull");
        navigate("/home");
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.error("Incorrect username or password");
        } else {
          toast.error(error.message);
        }
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
