import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./index.css";

function Login() {
  const [usernameState, setUsernameState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const { setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUsername = (event) => {
    setUsernameState(event.target.value);
  };
  const handlePassword = (event) => {
    setPasswordState(event.target.value);
  };

  const login = async (event) => {
    event.preventDefault();
    let data = {
      username: usernameState,
      password: passwordState,
    };
    axios
      .post("http://localhost:3001/api/users/login", data)
      .then((response) => {
        let resData = response.data;
        console.log(resData);
        localStorage.setItem("accessToken", resData.token);
        setAuthState({
          //id: resData.id,
          username: resData.username,
          isLogged: true,
        });
        toast.success("Login successfull");
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Invalid password or username");
        } else {
          toast.error(error.response.data.msg);
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
            <form onSubmit={login}>
              <div className="form-outline mb-4">
                <input
                  type="text"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  onChange={handleUsername}
                />
                <label className="form-label" htmlFor="form3Example3">
                  Email address
                </label>
              </div>

              <div className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  onChange={handlePassword}
                />
                <label className="form-label" htmlFor="form3Example4">
                  Password
                </label>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account?{" "}
                  <Link to={"/registration"} className="link-danger">
                    Register
                  </Link>
                </p>
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
