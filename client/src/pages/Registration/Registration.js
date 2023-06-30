import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../helpers/AuthContext";
import "./index.css";

function Registration() {
  const [usernameState, setUsernameState] = useState("");
  const [firstNameState, setFirstNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [addressState, setAddressState] = useState("");
  const [roleState, setRoleState] = useState("");
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [passwordState, setPasswordState] = useState("");

  // const handleUsername = (event) => {
  //   setUsernameState(event.target.value);
  // };
  // const handlePassword = (event) => {
  //   setPasswordState(event.target.value);
  // };

  const register = async (event) => {
    event.preventDefault();
    let data = {
      username: usernameState,
      password: passwordState,
    };
    axios
      .post("http://localhost:3001/api/users/register", data)
      .then((response) => {
        toast.success("Registration successfull");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  return (
    <section className="h-100 bg-dark">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div className="card card-registration d-flex flex-column my-4">
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZW1wbG95ZWV8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                    alt="Sample"
                    className="img-fluid"
                    // style={{border-top-left-radius: .25rem; border-bottom-left-radius: .25rem;}}
                  />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">
                      Employee registration
                    </h3>
                    <div className="row mx-auto justify-content-center ">
                      <div className="row g-0">
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1m"
                              className="form-control form-control-lg"
                              onChange={(e) => {
                                setFirstNameState(e.target.value);
                              }}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m"
                            >
                              First name
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="text"
                              id="form3Example1n"
                              className="form-control form-control-lg"
                              onChange={(e) => {
                                setLastNameState(e.target.value);
                              }}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1n"
                            >
                              Last name
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row g-0">
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="tel"
                              id="form3Example1m1"
                              className="form-control form-control-lg"
                              onChange={(e) => {
                                setPhoneNumberState(e.target.value);
                              }}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m1"
                            >
                              Phone number
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="tel"
                              id="form3Example1m1"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m1"
                            >
                              Username
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="row g-0">
                        <div className="form-outline mb-4 p-2">
                          <input
                            type="text"
                            id="form3Example8"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="form3Example8">
                            Address
                          </label>
                        </div>
                        <div className="form-outline mb-4 p-2">
                          <input
                            type="email"
                            id="form3Example8"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label" htmlFor="form3Example8">
                            Email
                          </label>
                        </div>
                      </div>

                      <div className="d-md-flex justify-content-start align-items-center mb-4 py-2">
                        <h6 className="mb-0 me-4">Role: </h6>

                        <div className="form-check form-check-inline mb-0 me-4">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="inlineRadioOptions"
                            id="femaleGender"
                            value="option1"
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
                            name="inlineRadioOptions"
                            id="maleGender"
                            value="option2"
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
                              id="form3Example1m1"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m1"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4 p-2">
                          <div className="form-outline">
                            <input
                              type="password"
                              id="form3Example1m1"
                              className="form-control form-control-lg"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1m1"
                            >
                              Confirm password
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="align-self-end">
                        <button type="button" className=" btn btn-light btn-lg">
                          Reset all
                        </button>
                        <button
                          type="button"
                          className="btn btn-warning btn-lg ms-2"
                        >
                          Submit form
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;
