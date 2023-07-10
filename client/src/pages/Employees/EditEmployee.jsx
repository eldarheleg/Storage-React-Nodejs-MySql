import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditEmployee() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    currentPassword: "",
    newPassword: "",
    confNewPassword: "",
  });
  const [errorState, setErrorState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const { id } = useParams();

  useEffect(() => {
    setErrorState(validate(formState));
  }, [formState]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      currentPass: formState.currentPassword,
      newPass: formState.newPassword,
    };
    console.log(data, id);
    axios
      .patch(`http://localhost:3001/api/users/changepass/${id}`, data, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        toast.success("Employee updated successfull");
        navigate("/home/employees");
      })
      .catch((error) => {
        if (error.response.status === 502) {
          toast.error("Current password doesn't match");
        } else {
          toast.error(error.message);
          console.log(error);
        }
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.currentPassword) {
      errors.currentPassword = "Required!";
    }

    if (!values.newPassword) {
      errors.newPassword = "Required!";
    }

    if (!values.confNewPassword) {
      errors.confNewPassword = "Required!";
    } else if (values.newPassword !== values.confNewPassword) {
      errors.confNewPassword = "Not match";
    }

    if (values.currentPassword === values.newPassword) {
      errors.newPassword = "New must be different!";
    }

    return errors;
  };

  return (
    <div className="d-flex flex-column align-items-center pt-4">
      <ToastContainer />
      <h4>Change password for employee</h4>
      <form className="row g-3 w-50" onSubmit={handleSubmit}>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Current password
            </label>
            <p className="form-label text-danger">
              {errorState.currentPassword}
            </p>
          </div>
          <input
            type="text"
            className="form-control"
            name="currentPassword"
            placeholder="Current password"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              New password
            </label>
            <p className="form-label text-danger">{errorState.newPassword}</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="newPassword"
            placeholder="New password"
            onChange={handleChange}
          />
        </div>
        <div className="col-12">
          <div className="d-flex col justify-content-between">
            <label htmlFor="inputName" className="form-label">
              Confirm new password
            </label>
            <p className="form-label text-danger">
              {errorState.confNewPassword}
            </p>
          </div>
          <input
            type="text"
            className="form-control"
            name="confNewPassword"
            placeholder="Confirm new password"
            onChange={handleChange}
          />
        </div>
        <div className="col-12 text-center">
          <button
            type="submit"
            className="btn btn-success w-50"
            disabled={Object.keys(errorState).length !== 0 ? true : false}
          >
            Update password
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
