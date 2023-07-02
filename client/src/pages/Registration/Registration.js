import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";
import "./index.css";

function Registration() {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
    role: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });
  const [errorState, setErrorState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  useEffect(() => {
    setErrorState(validate(formState));
    //console.log("rendering");
  }, [formState]);

  const resetAll = () => {
    setFormState({
      username: "",
      password: "",
      passwordConfirm: "",
      role: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      email: "",
    });
  };

  const submitRegister = async (event) => {
    event.preventDefault();
    let data = {
      username: formState.username,
      password: formState.password,
      role: formState.role,
      firstName: formState.firstName,
      lastName: formState.lastName,
      phoneNumber: formState.phoneNumber,
      address: formState.address,
      email: formState.email,
    };
    console.log(data);
    setErrorState(validate(formState));
    console.log(errorState);
    if (Object.keys(errorState).length === 0) {
      console.log("fetching apiii.....");
      await axios
        .post("http://localhost:3001/api/users/register/admin", data)
        .then((response) => {
          toast.success("Registration successfull");
        })
        .catch((error) => {
          if (error.response.data.error === 1062) {
            toast.error("User with that email already exists!");
          } else {
            console.log(error.response.data.error);

            toast.error(error.response.data.error);
          }
        });
    } else {
      console.log("Error while creating user");
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Required!";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "More than 4 characters";
    }
    if (values.password !== values.passwordConfirm) {
      errors.passwordNotMatch = "Not match";
    }
    if (!values.firstName) {
      errors.firstName = "Required!";
    }
    if (!values.lastName) {
      errors.lastName = "Required!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Required!";
    }
    if (!values.address) {
      errors.address = "Required!";
    }
    if (!values.email) {
      errors.email = "Required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Not a valid email format!";
    }

    return errors;
  };

  return (
    <section className="h-100 bg-dark">
      <ToastContainer />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration d-flex flex-column my-4">
              <div className="row g-0">
                <div className="col-xl-6 my-auto p-2 d-none d-xl-block">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    alt="Sample"
                    className="img-fluid "
                    //style={border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;}
                  />
                </div>
                <form onSubmit={submitRegister} className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase p-2">
                      Employee registration
                    </h3>
                    <div className="row mx-auto justify-content-center ">
                      <div className="row g-0">
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="firstName"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                First name
                              </label>
                              <p className="form-label text-danger">
                                {errorState.firstName}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              name="lastName"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Last name
                              </label>
                              <p className="form-label text-danger">
                                {errorState.lastName}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row g-0">
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="tel"
                              name="phoneNumber"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Phone number
                              </label>
                              <p className="form-label text-danger">
                                {errorState.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="tel"
                              name="username"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Username
                              </label>
                              <p className="form-label text-danger">
                                {errorState.username}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row g-0">
                        <div className="form-outline mb-4 p-2">
                          <input
                            type="text"
                            name="address"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <div className="d-flex col justify-content-between">
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Addres
                            </label>
                            <p className="form-label text-danger">
                              {errorState.address}
                            </p>
                          </div>
                        </div>
                        <div className="form-outline mb-4 p-2">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-lg"
                            onChange={handleChange}
                          />
                          <div className="d-flex col justify-content-between">
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              Email
                            </label>
                            <p className="form-label text-danger">
                              {errorState.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className="d-md-flex justify-content-start align-items-center mb-4 py-2"
                        name="role"
                      >
                        <h6 className="mb-0 me-4">Role: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="ADMIN"
                            name="role"
                            //checked={setRoleState === "ADMIN"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="femaleGender"
                          >
                            Admin
                          </label>
                        </div>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="USER"
                            name="role"
                            checked={formState.role === "USER"}
                            onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="maleGender"
                          >
                            User
                          </label>
                        </div>
                      </div>
                      <div className="row g-0">
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              name="password"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Password
                              </label>
                              <p className="form-label text-danger">
                                {errorState.password}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              name="passwordConfirm"
                              className="form-control form-control-lg"
                              onChange={handleChange}
                            />
                            <div className="d-flex col justify-content-between">
                              <label
                                className="form-label"
                                htmlFor="form3Example1m"
                              >
                                Confirm password
                              </label>
                              <p className="form-label text-danger">
                                {errorState.passwordNotMatch}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col d-grid gap-2 mt-2 ">
                        <button
                          type="reset"
                          className=" btn btn-light btn-lg"
                          onClick={resetAll}
                        >
                          Clear all
                        </button>
                        <button
                          id="subButton"
                          type="submit"
                          className="btn btn-dark btn-lg"
                          disabled={
                            Object.keys(errorState).length !== 0 ? true : false
                          }
                        >
                          Register
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
