import axios from "axios";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

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
      .post("http://localhost:3001/api/auth/login", data)
      .then((response) => {
        let resData = response.data;
        localStorage.setItem("accessToken", resData.accessToken);
        setAuthState({
          id: resData.id,
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
    <div className="d-flex justify-content-center">
      <ToastContainer />
      <form onSubmit={login}>
        <div className="form-outline mb-4">
          <input
            type="text"
            id="username"
            className="form-control"
            onChange={handleUsername}
          />
          <label className="form-label" htmlFor="username">
            Email address
          </label>
        </div>

        <div className="form-outline mb-4">
          <input
            type="password"
            id="password"
            className="form-control"
            onChange={handlePassword}
          />
          <label className="form-label" htmlFor="password">
            Password
          </label>
        </div>

        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="form2Example31"
                readOnly={true}
              />
              <label className="form-check-label" htmlFor="form2Example31">
                {" "}
                Remember me{" "}
              </label>
            </div>
          </div>

          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
